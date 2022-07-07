import { getProducts, getProduct } from "./firebase.js";

const cart = [];
let total = 0;

const buildCards = (products) => {

    const productsContainer = document.querySelector(".products-container");
  
    products.forEach(product => {
      
      const card = document.createElement('div');
  
      card.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'card', "d-flex");
  
      card.innerHTML = `
    
        <img src=${product.img} class="card-img-top" alt=${product.name}>
        <div class="card-body flex-column">
          <h5 class="card-text card-title">${product.name}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-primary card-btn buyBtn" id=${product.id}>Add to Cart</button>
        </div>
      
      `;
      productsContainer.append(card);
    });
  }
const addEvent = () => {

    const buyButtons = document.querySelectorAll(".buyBtn");

    buyButtons.forEach(buyBtn => {
        buyBtn.addEventListener("click", addToCart);
    })  

}
  
const renderCards = async () => {

    const products = await getProducts();
    
    buildCards(products);

    addEvent();
}

renderCards();

function checkCart(id){ 

    return cart.some(product => product.id == id);

};

const addToCart = async (e) => {
    
    const productId = e.target.id;

    if(checkCart(productId)){
        return false;
    }
    else{
        const productToCart = await getProduct(productId);

        updateTotal(productToCart.data().price);
        cart.push(productToCart);
        renderCart();
    }
}

const renderCart = () => {

    const innerCart = document.querySelector(".inner-cart");

    innerCart.innerHTML = "";

    cart.forEach(product => {
        const card = document.createElement("div");

        card.className = "card mb-3";

        card.innerHTML = `
            <div class="row g-0 ">
            <div class="col-md-4">
                <img src="${product.data().img}" class="img-fluid rounded-start" alt="${product.data().name}">
            </div>
            
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${product.data().name}</h5>
                    <p class="card-text">$${product.data().price}</p>
                </div>
            </div>
            </div>
            `
        innerCart.append(card);
    });
}

const updateTotal = (price) => {

    const visualTotal = document.querySelector(".visual-total");

    total += price;

    visualTotal.textContent = total;

}

const emptyCart = () => {

    total = 0;
    document.querySelector(".visual-total").textContent = total;

    cart.length = 0;
    document.querySelector(".inner-cart").innerHTML = "";

}

const checkout = () => {
    const innerCart = document.querySelector(".inner-cart");

    const alert = document.createElement("div");

    alert.className = "alert alert-success";

    alert.innerHTML = `
            <div class="alert alert-success" role="alert">
        <h4 class="alert-heading">Compra realizada!</h4>
        <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
        <hr>
        <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
    `

    emptyCart();
    innerCart.append(alert);
}

const clearBtn = document.querySelector(".clear-btn");
const buyBtn = document.querySelector(".buy-btn");

clearBtn.addEventListener("click", emptyCart);
buyBtn.addEventListener("click", checkout);


