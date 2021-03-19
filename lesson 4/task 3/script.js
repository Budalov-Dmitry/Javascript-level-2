class Name {
    constructor(regExp, id) {
        this.regExp = regExp;
        this.id= id;
    }

     check() {
        document.getElementById(this.id).addEventListener('input', (e) => {
            let str = e.target.value;
            if (this.regExp.test(str)) {
                e.target.classList.remove('form-input__invalid');
                e.target.classList.add('form-input__valid')
            } else {
                e.target.classList.remove('form-input__valid');
                e.target.classList.add('form-input__invalid')
            }
            
        });
     }
}


const a = new Name(/^[A-zА-яЁё]+$/,"name"),
b = new Name(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,"numder"),
c = new Name(/^.+@.+\..+$/, "email");

a.check();
b.check();
c.check();





