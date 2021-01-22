if (document.readyState == "loading") { //This check to make sure that the document is load before we try to access different parts of it.
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() { //Listener for all of the items that are already loaded into the document
    var removeCartItemButtons = document.getElementsByClassName("btn-danger")
    for(var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener("click", removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName("cart-quantity-input")
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
        
    }

    var addToCartButtons = document.getElementsByClassName("shop-item-btn")
    for (let i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener("click", addToCartClicked)
    }

    document.getElementsByClassName("btn-purchase")[0].addEventListener("click", purchaseClicked)
}

// Events that make changes in our HTML, make sure to hook up the listeners into the events

function purchaseClicked() {
    alert("Thank you for your purchase")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()

}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove() //double parent cause we want to delete the row
    updateCartTotal() 
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
    var imageSrc = shopItem.getElementsByClassName("shop-item-img")[0].src
    
    addItemTocart(title, price, imageSrc)
    updateCartTotal() //To update the total after add a new item 
}

function addItemTocart(title, price, imageSrc) {
    var cartRow = document.createElement("div")
    cartRow.classList.add("cart-row")
    var cartItems = document.getElementsByClassName("cart-items")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-item-title")
    for(var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("This item is already added to the cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-img" src="${imageSrc}">
            <span class="cart-item-title">${title}</span>
        </div>    
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" name="" id="" value="1">
            <button class="btn btn-danger" role="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents    
    cartItems.append(cartRow)
    cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click",removeCartItem) //To activate the delete button
    cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change",quantityChanged) //To activate the quantity validation

}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0] //[0] case from "cart-items" we'll get an array & just want 1 element (0)
    var cartRows = cartItemContainer.getElementsByClassName("cart-row")
    var total = 0

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        //Get the element
        var priceElement = cartRow.getElementsByClassName("cart-price")[0]
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
        //Access to the text/value of the element
        var price = parseFloat(priceElement.innerText.replace("$",""))
        var quantity = quantityElement.value
        total = total + (price * quantity)   
    }

    total = Math.round(total*100) / 100
    document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total
}