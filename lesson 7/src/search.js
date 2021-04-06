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