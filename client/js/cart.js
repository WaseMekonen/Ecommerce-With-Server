const coustomerCart = [
  {
    id: 1,
    name: "Samsung Galaxy Tab S7",
    price: 500,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "mobiles",
    image: ["https://did.li/ry5Hw", "https://did.li/IJwlC"],
    quantity: 1,
  },
  {
    id: 2,
    name: "Samsung Galaxy A52 5G",
    price: 344,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "mobiles",
    image: ["https://did.li/GJwlC", "https://did.li/XUYYH"],
    quantity: 1,
  },
  {
    id: 3,
    name: "DJI Mavic 2 Pro",
    price: 509,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "drones",
    image: ["https://did.li/ubarl", "https://did.li/LmC5q"],
    quantity: 1,
  },
  {
    id: 4,
    name: "Lenovo Thinkpad T495",
    price: 492,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "laptops",
    image: ["https://did.li/JmC5q", "https://did.li/1x5Hw"],
    quantity: 1,
  },
  {
    id: 5,
    name: "Hori Apex Racing Wheel",
    price: 105,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "game consoles",
    image: ["https://did.li/U6qCN", "https://did.li/bhTfT"],
    quantity: 1,
  },
  {
    id: 6,
    name: "DJI Phantom 4 Pro V2.0",
    price: 470,
    description: "Lorem ipsum dolor sit. Ut doloremque dolor impedit.",
    category: "drones",
    image: ["https://did.li/9gTfT", "https://did.li/pslTY"],
    quantity: 1,
  },
];

const tableCountainer = document.getElementById("table");
const total = document.getElementById("total");
const subTotal = document.getElementById("sub-total");

function getCartItemIndexByID(id) {
  for (let i = 0; i < coustomerCart.length; i++) {
    if (coustomerCart[i].id == id) {
      return i;
    }
  }
}

function addEventListenersToRemoveIcons() {
  const removeIcons = document.getElementsByClassName("remove-icon");

  for (let i = 0; i < removeIcons.length; i++) {
    removeIcons[i].addEventListener("click", function (e) {
      const removeButton = e.target;
      removeItemFromCartById(removeButton.id, coustomerCart);
      render();
    });
  }
}


function removeItemFromCartById(id,array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      array.splice(i, 1);
    }
  }
}


for (let i = 0; i < addToCartButtons.length; i++) {
  addToCartButtons[i].addEventListener("click", function (e) {
    const button = e.target;
    if (button.innerText == "add to cart") {
      button.innerText = "item added";
      button.style.backgroundColor = "red";
      addToCartByID(button.id);
    } else {
      button.innerText = "add to cart";
      button.style.backgroundColor = "#2ab050";
      removeItemFromCartById(button.id, cart);
    }
    if (cart.length == 0) {
      itemCounterButoon.innerText = "";
      itemCounterButoon.style.display = "none";
    } else {
      itemCounterButoon.innerText = cart.length;
      itemCounterButoon.style.display = "block";
    }
  });
}

function addEventListenersToPlusIcons() {
  const plusIcons = document.getElementsByClassName("plus");

  for (let i = 0; i < plusIcons.length; i++) {
    plusIcons[i].addEventListener("click", function (e) {
        const plusButton = e.target;
        const itemIdString = plusButton.id;
        const itemId = Number(itemIdString.slice(-1));
        const cartItemIndex = getCartItemIndexByID(itemId);
        coustomerCart[cartItemIndex].quantity += 1;
        render();
    });
  }
}

function addEventListenersToMinusIcons() {
  const minusIcons = document.getElementsByClassName("minus");

  for (let i = 0; i < minusIcons.length; i++) {
    minusIcons[i].addEventListener("click", function (e) {
      const minusButton = e.target;
      const itemIdString = minusButton.id;
      const itemId = Number(itemIdString.slice(-1));
      const cartItemIndex = getCartItemIndexByID(itemId);
      if(coustomerCart[cartItemIndex].quantity > 1){
        coustomerCart[cartItemIndex].quantity -= 1;
      }
      render();
    });
  }
}

function addListeners() {
  addEventListenersToRemoveIcons();
  addEventListenersToPlusIcons();
  addEventListenersToMinusIcons();
}

function updateTableProducts() {
  let rawHtml = "";
  for (let i = 0; i < coustomerCart.length; i++) {
    rawHtml += `
        <tr class="item-row">
        <td class="item">
          <img class="item-img" src="${coustomerCart[i].image[0]}"> 
          <div class="item-description">
            <h5>${coustomerCart[i].name}</h5>
          </div>
        </td>
        <td class="item-price">${coustomerCart[i].price}$</td>
        <td class="item-quantity">
          <span class="minus" ><i class="fas fa-minus" id="minus-${
            coustomerCart[i].id
          }"></i></span>
          <span class="quantity">${coustomerCart[i].quantity}</span>
          <span class="plus" ><i class="fas fa-plus" id="plus-${
            coustomerCart[i].id
          }"></i><span>
        </td>
        <td class="item-total">${
          coustomerCart[i].price * coustomerCart[i].quantity
        }$</td>
        <td  ><span class="remove-icon" ><i  id="${
            coustomerCart[i].id
          }" class="fas fa-times"></i></span></td>
        </tr>`;
  }
  tableCountainer.innerHTML = rawHtml;
  addListeners();
}

function updateTotal() {
  let sum = 0;
  for (let i = 0; i < coustomerCart.length; i++) {
    sum += coustomerCart[i].price * coustomerCart[i].quantity;
  }
  total.innerHTML = sum + `$`;
  subTotal.innerHTML = sum + `$`;
}

function render() {
  updateTableProducts();
  updateTotal();
}

render();
