const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
    { title: 'jeans', price: 300 }
];

const $goodsList = document.querySelector('.goods-list');
  
const renderGoodsItem = ({ title, price }) => {
    return `<div class="goods-item"><ul><li><a href="#"><img src="img/1.jpg" width="180" height="180" alt="foto">
    </a></li><li>${title}</li><li>${price} руб</li><li><button>Добавить</button></li></ul></div>`;
};
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(
            item => renderGoodsItem(item)
        ).join(`\n`);

    $goodsList.insertAdjacentHTML('beforeend', goodsList);
}
  
renderGoodsList();