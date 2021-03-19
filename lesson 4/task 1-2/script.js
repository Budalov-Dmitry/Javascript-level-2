const regExp = /^'|(\s)'|'(\s)|'$/gm;
let text = document.querySelector('p').innerText;
console.log(text);// для сравнения текста до и после

document.querySelector('p').innerText = text.replace(regExp, `$1"$2`);
