
const tableCountainer = document.getElementById("table");
const total = document.getElementById("total");
const subTotal = document.getElementById("sub-total");


axios
  .get("/carts/618d25222145eebaf38d1cf8")
  .then((response) => {
    const newCart = response.data.products
    console.log(response.data.products);
    render(newCart);
  })
  .catch((err) => {
    console.log(err);
  });


function updateTableProducts(coustomerCart) {
  let rawHtml = "";
  for (let i = 0; i < coustomerCart.length; i++) {
    rawHtml += `
        <tr class="item-row">
        <td class="item">
          <img class="item-img" src="${coustomerCart[i].image}"> 
          <div class="item-description">
            <h5>${coustomerCart[i].name}</h5>
          </div>
        </td>
        <td class="item-price">${coustomerCart[i].price}$</td>
        <td class="item-quantity">
          <span class="minus" ><i class="fas fa-minus" id="minus-${coustomerCart[i]._id}"></i></span>
          <span class="quantity">${coustomerCart[i].quantity}</span>
          <span class="plus" ><i class="fas fa-plus" id="plus-${coustomerCart[i]._id}"></i><span>
        </td>
        <td class="item-total">${coustomerCart[i].price * coustomerCart[i].quantity}$</td>
        <td  ><span class="remove-icon"><i onclick="deleteItemFromCart('${coustomerCart[i]._id}')" class="fas fa-times"></i></span></td>
        </tr>`;
  }
  tableCountainer.innerHTML = rawHtml;
}



function deleteItemFromCart(id){
  console.log(id);
  axios
  .patch(`/carts/delete/${id}`)
  .then((response)=>{
    console.log(response);
  })
  .catch((err)=>{
    console.log(err);
  })
}

function updateTotal(coustomerCart) {
  let sum = 0;
  for (let i = 0; i < coustomerCart.length; i++) {
    sum += coustomerCart[i].price * coustomerCart[i].quantity;
  }
  total.innerHTML = sum + `$`;
  subTotal.innerHTML = sum + `$`;
}

function render(newCart) {
  updateTableProducts(newCart);
  updateTotal(newCart);
}



// function getCartItemIndexByID(id) {
//   for (let i = 0; i <newCart.length; i++) {
//     if (newCart[i].id == id) {
//       return i;
//     }
//   }
// }

// function addEventListenersToRemoveIcons() {
//   const removeIcons = document.getElementsByClassName("remove-icon");

//   for (let i = 0; i < removeIcons.length; i++) {
//     removeIcons[i].addEventListener("click", function (e) {
//       const removeButton = e.target;
//       removeItemFromCartById(removeButton.id, coustomerCart);

//     });
//   }
// }

// function addEventListenersToPlusIcons() {
//   const plusIcons = document.getElementsByClassName("plus");

//   for (let i = 0; i < plusIcons.length; i++) {
//     plusIcons[i].addEventListener("click", function (e) {
//         const plusButton = e.target;
//         const itemIdString = plusButton.id;
//         const itemId = Number(itemIdString.slice(-1));
//         const cartItemIndex = getCartItemIndexByID(itemId);
//         coustomerCart[cartItemIndex].quantity += 1;
  
//     });
//   }
// }

// function addEventListenersToMinusIcons() {
//   const minusIcons = document.getElementsByClassName("minus");

//   for (let i = 0; i < minusIcons.length; i++) {
//     minusIcons[i].addEventListener("click", function (e) {
//       const minusButton = e.target;
//       const itemIdString = minusButton.id;
//       const itemId = Number(itemIdString.slice(-1));
//       const cartItemIndex = getCartItemIndexByID(itemId);
//       if(coustomerCart[cartItemIndex].quantity > 1){
//         coustomerCart[cartItemIndex].quantity -= 1;
//       }
    
//     });
//   }
// }

// function addListeners() {
//   addEventListenersToRemoveIcons();
//   addEventListenersToPlusIcons();
//   addEventListenersToMinusIcons();
// }