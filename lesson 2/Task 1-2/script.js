class ApiMock {
    constructor() {

    }

    fetch() {
      return [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
            { title: 'jeans', price: 300 }
        ];
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
    }

    fetchGoods() {
      this.goods = this.api.fetch().map(({title, price}) => new GoodsItem(title, price));
    }

    render() {
      this.$goodsList.textContent = '';
      this.goods.forEach((good) => {
          this.$goodsList.insertAdjacentHTML('beforeend', good.getHtml());
      })
    }
    totalPrice() {
        var sum = 0;
        this.goods.forEach((good) => {
            sum  += good.price; 
        })
        return sum;
    }
}

const goodsList = new GoodsList();

goodsList.fetchGoods();
goodsList.render();
let a = goodsList.totalPrice();
console.log(a);