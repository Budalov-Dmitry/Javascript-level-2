
Vue.component('goods-item', { 
  template: `<div class="goods-item" >
                <ul>
                  <li><img src="img/1.jpg" width="180" height="180" alt="foto"></li>
                  <li>{{title}}</li>
                  <li>{{price}} руб</li>
                  <li><button :data-id="id" v-on:click="addGood" ><slot></slot></button></li>
                </ul>
              </div>`,
  props: ['title', 'price', 'id'], 

  methods: {  

    addGood(e) {
      const id = e.target.dataset.id;
      // console.log("id "+id);
      this.$emit('add', id) 
    }

  } 

});

Vue.component('search', { 
  template:`<input id="search" v-on:input="searchGoods"  v-model="search">`,

  data() { 
    return {
      search: ''
    }
  },

  methods: {

      searchGoods() {
        this.$emit('search', this.search) 
    }
  } 
});

Vue.component('cart', { 
  template: `<div>
  <button class="cart-button" type="button" v-on:click="showCart">Корзина</button>
  <div v-if="cartVisible"  class="cart">
    <slot></slot>
  </div>
</div>`,
  data() { 
    return {
      cartVisible: false 
    }
  },
  methods: {

    showCart() {
      this.cartVisible = !this.cartVisible
  },
  }
});

const vue = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtredGoods: [],
    cartGoods:[],
  },
  methods: {

    searchHandler(search) {
      if(search === '') {
        this.filtredGoods = this.goods;
      }
      const regexp = new RegExp(search, 'gi');
      this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    addToCart(id) {
      const good = this.filtredGoods.find((item) => item.id == id);
      // console.log("добавили товар");
      // console.log( good);

      this.cartGoods.push(good);
      // console.log("список товаров в корзине ");
      
      good.add = "был добавлен в корзину";
      good.date = new Date;
      // console.log(good);

      fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.cartGoods)
      })

      fetch('/statistic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good)
      })
    },

    removeFromCart(id) {
      const goodIndex = this.cartGoods.findIndex((item) => item.id == id);
      const good2 = this.cartGoods.splice(goodIndex , 1);
      
      good2.remove = "был удалён из корзины";
      good2.date1 = new Date;
      console.log(good2);

      fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.cartGoods)
      });

      fetch('/statistic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(good2)
      })
    },

    removeAllCart() {
        this.cartGoods = [];

        fetch('/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.cartGoods)
        })
    }

  },

  computed: {
    totalPrice() {
        let sum = 0;
        this.cartGoods.forEach((good) => {
            sum  += good.price; 
        })
        return sum;
    }
  },

  mounted() {
    fetch('/data')
      .then(response => response.json())
      .then(data => {
        this.goods = data;
        this.filtredGoods = data;

      })
      .catch(err => {
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', `<h4>${error}</h4>`)
      }) 

      fetch('/cart')
      .then(response => response.json())
      .then(data => {
        this.cartGoods = data;
      })
      .catch(err => {
        console.log(err);
      }) 
  }
})