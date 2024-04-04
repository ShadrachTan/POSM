let cart = [];

function addToCart() {
    const foodSelect = document.getElementById('food');
    const food = foodSelect.options[foodSelect.selectedIndex].text;
    const quantity = parseInt(document.getElementById('quantity').value);

    const existingItemIndex = cart.findIndex(item => item.food === food);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ food, quantity });
    }

    displayCart();
}

function displayCart() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';

    cart.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('input', (event) => {
            item.quantity = parseInt(event.target.value);
        });

        const itemName = document.createElement('span');
        itemName.textContent = item.food;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            cart = cart.filter(cartItem => cartItem.food !== item.food);
            displayCart();
        });

        cartItemDiv.appendChild(quantityInput);
        cartItemDiv.appendChild(itemName);
        cartItemDiv.appendChild(removeButton);

        cartDiv.appendChild(cartItemDiv);
    });

    showPaymentForm();
}

function showPaymentForm() {
    const paymentForm = document.querySelector('.payment-form');
    paymentForm.style.display = cart.length > 0 ? 'block' : 'none';
}

function calculateChange() {
    const cashInput = document.getElementById('cash');
    const cash = parseFloat(cashInput.value);
    const total = calculateTotal();

    if (isNaN(cash) || cash < total) {
        alert('Insufficient cash!');
        return;
    }

    const change = cash - total;
    const changeMessage = `Change: ${change.toFixed(2)} pesos`;

    document.getElementById('changeMessage').textContent = changeMessage;
    document.getElementById('overlay').style.display = 'flex';
}

function closePaymentPopup() {
    document.getElementById('overlay').style.display = 'none';
    clearCart();
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += getItemPrice(item.food) * item.quantity;
    });
    return total;
}

function getItemPrice(item) {
    switch (item) {
        case 'Pizza - 500 pesos':
            return 500;
        case 'Pasta - 200 pesos':
            return 200;
        case 'Burger - 120 pesos':
            return 120;
        case 'Fries - 60 pesos':
            return 60;
        default:
            return 0;
    }
}

function clearCart() {
    cart = [];
    displayCart();
}

// JavaScript for To-Do list
const list = document.querySelector('#toDoList');

const addForm = document.querySelector('#add-form');

const addInput = addForm.querySelector('#add-input');

const searchForm = document.querySelector('#search-form');

const searchInput = searchForm.querySelector('#search-input');

list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        event.target.closest('li').remove();
    }
});

addForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const value = addInput.value;

    const li = document.createElement('li');

    li.classList.add('list-group-item');
    li.textContent = value;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'float-end', 'delete');
    button.textContent = 'Delete';
    li.appendChild(button);
    list.appendChild(li);

});

searchForm.addEventListener('input', (event) => {
    event.preventDefault();

    const query = searchInput.value.toLowerCase();

    const items = list.querySelectorAll('li');

    for (let i = 0; i < items.length; i++) {

        const item = items[i];

        const text = item.textContent.toLowerCase();

        if (text.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
});