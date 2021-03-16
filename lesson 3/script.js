class ApiMock {
    constructor() {
        this.url = "/goodslist.json"
    }

    fetch(error,success) {
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
                error(`ошибка`);
            }
        }
    }

    promiseFetch() {
        return new Promise((resolve,reject) => {
            this.fetch(reject,resolve)
        })
    }
}

class CartItem {
    constructor() {
        //конструктор должен принимать товары которые пользователь отправляет в корзину
    }
    getHtmlCart() {
        //метод возвращаюший html код для страницы
    }
    
}

class CartList {
    constructor() {
        this.item = new CartItem();
        this.$goodsList = document.querySelector('.header');
        this.goods = [];
    }

    receiptGoods() {
        // метод заполняет массив goods полученными товарами
    }
  
    renderCart() {
        // метод отрисовывает товар на странице
    }

    totalPrice() {
        //метод для расчёта суммы покупки
    }

    deleteGood() {
        //метод для удаления товара из корзины 
    }
    
    deleteGoods() {
        //метод для удаления всех товаров из корзины 
    }

    purchase() {
        //метод для потверждения покупки
    }
}

class GoodsItem {
    constructor(title, price) {
      this.title = title;
      this.price = price;
    }

    getHtml() {
      return `<div class="goods-item"><ul><li><a href="#"><img src="img/1.jpg" width="180" height="180" alt="foto"></a></li><li>${this.title}
      </li><li>${this.price} руб</li><li><button>Добавить</button></li></ul></div>`;
    }
}

class GoodsList {
    constructor() {
        this.api = new ApiMock();
        this.$goodsList = document.querySelector('.goods-list');
        this.goods = [];

        this.api.promiseFetch()
        .then((data) => { this.successFetch(data) })
        .catch((error) => { this.errorFetch(error) });

    }
    
    successFetch(data) {
      this.goods = data.map(({title, price}) => new GoodsItem(title, price));
      this.render();
    }

    errorFetch(error) {
        this.$goodsList.insertAdjacentHTML('beforeend', `<h4>${error}</h4>`)
    }

    render() {
      this.$goodsList.textContent = '';
      this.goods.forEach((good) => {
          this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
      })
    }
    totalPrice() {
        let sum = 0;
        this.goods.forEach((good) => {
            sum  += good.price; 
        })
        return sum;
    }
}

const goodsList = new GoodsList();

let a = goodsList.totalPrice();
console.log(a);