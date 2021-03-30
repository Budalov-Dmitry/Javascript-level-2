const API_URL = '/goodslist.json';

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
      console.log("id "+id);
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
    goods: [{ id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
    { id: 5, title: 'jeans', price: 300 }],
    filtredGoods: [{ id: 1, title: 'Shirt', price: 150 },
    { id: 2, title: 'Socks', price: 50 },
    { id: 3, title: 'Jacket', price: 350 },
    { id: 4, title: 'Shoes', price: 250 },
    { id: 5, title: 'jeans', price: 300 }],
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

    fetch(error, success) {
        let request;

        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
          } else if (window.ActiveXObject) { 
            request = new ActiveXObject("Microsoft.XMLHTTP");
          }

        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                success(JSON.parse(request.responseText))
            } else if (request.status > 400) {
                error(`Нет данных`);
            }
        }
          
        request.open('GET', API_URL, true);
        request.send();
    },

    promiseFetch() {
        return new Promise((resolve,reject) => {
            this.fetch(reject,resolve)
        })
    },

    addToCart(id) {
      const good = this.filtredGoods.find((item) => item.id == id);
      console.log("добавили товар");
      console.log( good);
      this.cartGoods.push(good);
      console.log("список товаров в корзине ");
      console.log( this.cartGoods);
    },

    removeFromCart(id) {
      const goodIndex = this.cartGoods.findIndex((item) => item.id == id);
      this.cartGoods.splice(goodIndex - 1, 1);
    },

    removeAllCart() {
        this.cartGoods = []
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
    this.promiseFetch()
      .then(data => {
        this.goods = data;
        this.filtredGoods = data;
      })
      .catch(error => {
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', `<h4>${error}</h4>`)
      }) 
  }
})