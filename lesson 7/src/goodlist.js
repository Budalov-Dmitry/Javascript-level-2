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