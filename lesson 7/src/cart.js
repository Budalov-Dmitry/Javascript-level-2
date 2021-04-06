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