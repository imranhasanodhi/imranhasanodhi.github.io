const form = document.querySelector('.form-container');
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const typeSelect = document.querySelector('#type');
const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
const totalPriceElement = document.querySelector('#totalPrice');
const button = document.querySelector('button');
const customerNameInput = document.querySelector('#customerName');
const orderSummary = document.querySelector('.order-summary');

let orders = []; // Array to store the orders
let total = 0;
let selectedPancakeType = '';
let selectedToppings = [];
let selectedExtras = [];
let selectedDelivery = 'eat in'; // Default delivery option

// Function to calculate the total price based on selections
const calculateTotalPrice = () => {
    const selectedTypeOption = typeSelect.selectedOptions[0];
    const basePrice = parseInt(selectedTypeOption.dataset.price) || 0;
    selectedPancakeType = selectedTypeOption.dataset.name;
    
    total = basePrice; // Reset total to base price
    selectedToppings = [];
    selectedExtras = [];
    selectedDelivery = 'eat in'; // Reset delivery option

    // Check selected toppings and extras
    checkToppings();
    checkExtras();
    checkDeliveryOptions();

    // Display the updated total price
    totalPriceElement.textContent = `${total.toFixed(2)}€`;

    // Animate the price banner
    const priceBanner = document.querySelector('.price-banner');
    priceBanner.animate(
        [
            { transform: 'scale(1)' },
            { transform: 'scale(1.05)' },
            { transform: 'scale(1)' },
        ],
        {
            duration: 300,
            iterations: 1,
        }
    );
};

// Function to check selected toppings and update total
const checkToppings = () => {
    checkboxes.forEach(item => {
        if (item.checked && item.dataset.category === 'toppings') {
            const toppingPrice = parseInt(item.value) || 0;
            total += toppingPrice;
            selectedToppings.push(item.dataset.name);
        }
    });
};

// Function to check selected extras and update total
const checkExtras = () => {
    checkboxes.forEach(item => {
        if (item.checked && item.dataset.category === 'extras') {
            const extraPrice = parseInt(item.value) || 0;
            total += extraPrice;
            selectedExtras.push(item.dataset.name);
        }
    });
};

// Function to check selected delivery method and update total
const checkDeliveryOptions = () => {
    selectedDelivery = [...deliveryOptions].find(option => option.checked)?.value || 'eat in';
    if (selectedDelivery === 'delivery') {
        total += 5; // Add delivery charge
    }
};

// Function to display the order summary
const displayOrder = () => {
    const customerName = document.querySelector('#customerName').value.trim();
    
    if (!customerName) {
        alert('Please enter your name.');
        return;
    }
    
    const orderType = document.querySelector('#order_type');
    const orderToppings = document.querySelector('#order_toppings');
    const orderExtras = document.querySelector('#order_extras');
    const orderName = document.querySelector('#order_name');
    const orderDelivery = document.querySelector('#order_delivery');
    const orderPrice = document.querySelector('#order_price');
    const displayOrder = document.querySelector('.order-summary');

    // Populate order summary fields
    orderType.textContent = selectedPancakeType;
    orderToppings.textContent = selectedToppings.length ? selectedToppings.join(', ') : 'No Toppings';
    orderExtras.textContent = selectedExtras.length ? selectedExtras.join(', ') : 'No Extras';
    orderName.textContent = customerName;
    orderDelivery.textContent = selectedDelivery.charAt(0).toUpperCase() + selectedDelivery.slice(1);
    orderPrice.textContent = `${total.toFixed(2)}€`;

    // Show the order summary
    displayOrder.style.display = 'block';

    // Scroll to the order summary smoothly
    displayOrder.scrollIntoView({ behavior: 'smooth' });

    // Log the order details
    const order = {
        name: customerName,
        pancakeType: typeSelect.selectedOptions[0].text,
        toppings: selectedToppings,
        extras: selectedExtras,
        deliveryMethod: selectedDelivery,
        totalPrice: total.toFixed(2),
    };

};

// Event listeners for changes and button clicks
form.addEventListener('change', calculateTotalPrice);
button.addEventListener('click', displayOrder); // Corrected to call the right function

// Initial calculation to set the price based on default selections
calculateTotalPrice();
