let productHTML = (product) => `
<div class="card" style="width: 18rem; margin: 0 10px">
    <img src="${product.img}" class="card-img-top" alt="dd">
    <div class="card-body">
        <h5 class="card-title">${product.label}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">${product.brand}</li>
        <li class="list-group-item">${product.price}</li>
    </ul>
    <div class="card-body">
        <button onclick="addToCart('${product.id}')" class="btn btn-sm btn-block btn-outline-primary">Ajouter au panier</button>
    </div>
</div>
`;

let cart = [];
let data = undefined;
let totalPrice = 0.0;

(async () => {
    let final = ""
    try {
        data = await (await fetch('http://localhost:3000/products')).json();
        data.forEach(element => {
            if (element.discount) {
                let tmp = element.discount/100 * element.price
                element.price = Math.round(element.price - tmp).toFixed(2);
            }
            final += productHTML(element)
        });
    } catch (e) {
        console.log(e);
    }
    document.getElementById('products').innerHTML += final
})();

function addToCart(id) {
    cart.push({"id": id, "qt": 1})
    refreshCart()
}

function refreshCart() {
    document.getElementById('cart').innerHTML = ''
    let tmp = 0.0
    for (let i of cart) {
        let prdct = data.find(elem => elem.id === i.id)
        tmp += parseFloat(prdct.price)
        totalPrice = tmp
        document.getElementById('cart').innerHTML += `<li><a class="dropdown-item" href="#">${i.id} - ${i.qt}</a></li>`
    }
    document.getElementById('cart').innerHTML += `<li class="dropdown-item">Prix total : <span id="totalPrice">${totalPrice}</span>€</li>`
}