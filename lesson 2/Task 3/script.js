class Burger {
    constructor(builder) {
        this.size = builder.size,
        this.filling  = builder.filling ,
        this.cheeze = builder.cheeze || false,
        this.propertiesCheeze = {price: 10, calories: 20},
        this.salad = builder.salad || false,
        this.propertiesSalad = {price: 20, calories: 5},
        this.seasoning = builder.seasoning || false,
        this.propertiesSeasoning = {price: 15, calories: 0},
        this.praties = builder.praties || false,
        this.propertiesPraties = {price: 15, calories: 0},
        this.mayonnaise = builder.mayonnaise || false,
        this.propertiesMayonnaise = {price: 20, calories: 5}
        this.price = 0,
        this.calories = 0
    }
    count() {
        if (this.cheeze) {
            this.price += this.propertiesCheeze.price;
            this.calories += this.propertiesCheeze.calories;
        }
        if (this.salad) {
            this.price += this.propertiesSalad.price;
            this.calories += this.propertiesSalad.calories;
        }
        if (this.seasoning) {
            this.price += this.propertiesSeasoning.price;
            this.calories += this.propertiesSeasoning.calories;
        }
        if (this.praties) {
            this.price += this.propertiesPraties.price;
            this.calories += this.propertiesPraties.calories;
        }
        if (this.mayonnaise) {
            this.price += this.propertiesMayonnaise.price;
            this.calories += this.propertiesMayonnaise.calories;
        }
        if (this.size == `small`) {
            this.price += 50;
            this.calories += 20;
        }
        if (this.size == `big`) {
            this.price += 100;
            this.calories += 40;
        }
    }
}
class BurgerBuilder {

    constructor(size , filling) {
        this.size = size;
        this.filling = filling
    }
    
    addSalad() {
        this.salad = true;
        // this.price += this.propertiesSalad.price;
        // this.calories += this.propertiesSalad.calories;
        return this
    }
    
    addSeasoning() {
        this.seasoning = true;
        // this.price += this.propertiesSeasoning.price;
        // this.calories += this.propertiesSeasoning.calories;
        return this
    }
    
    addCheeze() {
        this.cheeze = true;
        // this.price += this.propertiesCheeze.price;
        // this.calories += this.propertiesCheeze.calories;
        return this
    }
    
    addPraties() {
        this.praties = true;
        // this.price += this.propertiesPraties.price;
        // this.calories += this.propertiesPraties.calories;
        return this
    }

    addMayonnaise() {
        this.mayonnaise = true;
        // this.price += this.propertiesMayonnaise.price;
        // this.calories += this.propertiesMayonnaise.calories;
        return this
    }
    
    build() {
        return new Burger(this)
    }
}
    const burger = (new BurgerBuilder(`small`, `pork`))
    .addSalad()
    .addSeasoning()
    .addCheeze()
    .addPraties()
    .addMayonnaise()
    .build();
    burger.count();
    console.log(burger);
