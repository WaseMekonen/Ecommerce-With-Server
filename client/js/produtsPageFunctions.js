const { default: axios } = require("axios");

const cart = [];
const cardContainer = document.getElementById("cards-container");
const pagesCategory = document.getElementsByClassName("page-category")[0];

function getProductByID(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      return products[i];
    }
  }
}

function addToCartByID(id) {
  let Product = getProductByID(id);
  cart.push(Product);
}

function showItemByCategory(div, category,products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].category == category) {
      div.innerHTML += `<div class="card">
      <div class="image" style="background-image: url(${products[i].image[0]})" onmouseover="this.style.backgroundImage='url(${products[i].image[1]})'" onmouseout="this.style.backgroundImage='url(${products[i].image[0]})'"></div>
      <div class="details">
        <h4>${products[i].name}</h4>
        <p>${products[i].description}</p>
        <div class="card-bottom">
          <button class="addtocart-button" id="${products[i].id}">add to cart</button>
          <span><h5>${products[i].price}$</h5></span>
        </div>
      </div>
      </div>`;
    }
  }
}

axios
.get('/products')
.then(response => {
  showItemByCategory(cardContainer,pagesCategory.id,response.data)
.catch(err=>{
  console.log(err);
})
})

const addToCartButtons = document.getElementsByClassName("addtocart-button");
const itemCounterButoon = document.getElementById("itemCounter");

for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function(e){
    const button = e.target;
    if (button.innerText == "add to cart") {
      button.innerText = "item added";
      button.style.backgroundColor = "red";
      addToCartByID(button.id);
    } else {
      button.innerText = "add to cart";
      button.style.backgroundColor = "#2ab050";
      removeItemFromCartById(button.id,cart);
    }
    if(cart.length == 0){
      itemCounterButoon.innerText='';
      itemCounterButoon.style.display="none"
    }
    else{
      itemCounterButoon.innerText=cart.length
      itemCounterButoon.style.display="block"
    }
  });
}
