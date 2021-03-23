const API_URL = '/goodslist.json';

const vue = new Vue({
  el: "#app",
  data: {
    goods: [],
    filtredGoods: [],
    cartGoods:[],
    cartVisible: false,
    search: ''
  },
  methods: {

    searchHandler() {
              if(this.search === '') {
                this.filtredGoods = this.goods;
              }
              const regexp = new RegExp(this.search, 'gi');
              this.filtredGoods = this.goods.filter((good) => regexp.test(good.title));
    },

    showCart() {
        this.cartVisible = !this.cartVisible
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

    addToCart(e) {
        const index = e.target.dataset.index;
        this.cartGoods.push(this.filtredGoods[index])
    },

    removeFromCart(e) {
        const index = e.target.dataset.index;
        this.cartGoods.splice(index, 1)
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