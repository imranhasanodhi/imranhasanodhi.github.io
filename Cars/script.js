class Car {
    constructor(licensePlate, maker, model, currentOwner, price, color, year) {
        this.licensePlate = licensePlate;
        this.maker = maker;
        this.model = model;
        this.currentOwner = currentOwner;
        this.price = price;
        this.color = color;
        this.year = year;
    }

    calculateDiscount() {
        const currentYear = new Date().getFullYear();
        const age = currentYear - this.year;
        return age > 10 ? this.price * 0.85 : this.price; // Calculate discount percentage
    }
}
let carCollection = [];

const loadCarsFromLocalStorage = () => {             // Function for load car collection from localStorage
    const storedCars = localStorage.getItem('cars');
    if (storedCars) {
        const parsedCars = JSON.parse(storedCars);
        parsedCars.forEach(carData => {
            const { licensePlate, maker, model, currentOwner, price, color, year } = carData;
            carCollection.push(new Car(licensePlate, maker, model, currentOwner, price, color, year));
        });
        displayCarTable(); // Display the cars in the table
    }
};

const handleCarFormSubmit = (event) => {
    event.preventDefault();
    const errorDiv = document.getElementById('formError');
    errorDiv.innerHTML = '';

    try {
        const licensePlate = document.getElementById('licensePlate').value.trim();
        const maker = document.getElementById('maker').value.trim();
        const model = document.getElementById('model').value.trim();
        const currentOwner = document.getElementById('currentOwner').value.trim();
        const price = parseFloat(document.getElementById('price').value.trim());
        const color = document.getElementById('color').value.trim();
        const year = parseInt(document.getElementById('year').value.trim());

        const currentYear = new Date().getFullYear();

        // Input validation
        if (!licensePlate) throw new Error('License plate is required.');
        if (!maker) throw new Error('Maker is required.');
        if (!model) throw new Error('Model is required.');
        if (!currentOwner) throw new Error('Current owner is required.');
        if (isNaN(price) || price <= 0) throw new Error('Price must be a positive number.');
        if (!color) throw new Error('Color is required.');
        if (isNaN(year) || year < 1886 || year > currentYear) {
            throw new Error(`Year must be between 1886 and ${currentYear}.`);
        }

        // create a new car object
        const newCar = new Car(licensePlate, maker, model, currentOwner, price, color, year);
        carCollection.push(newCar); 
        localStorage.setItem('cars', JSON.stringify(carCollection)); // For save cars to local storage

        // update car table
        displayCarTable();
        document.getElementById('carForm').reset(); //clear form after adding new car
    } catch (error) {
        showError(error.message);
    }
};

// display error messages
function showError(message) {
    const errorDiv = document.getElementById('formError');
    errorDiv.textContent = message;
}

//display car collection in the table
function displayCarTable() {
    const tableBody = document.getElementById('carTableBody');
    tableBody.innerHTML = ''; // Clear existing rows

    carCollection.forEach((car, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.licensePlate}</td>
            <td>${car.maker}</td>
            <td>${car.model}</td>
            <td>${car.currentOwner}</td>
            <td>€${car.price.toFixed(2)}</td>
            <td>€${car.calculateDiscount().toFixed(2)}</td>
            <td>${car.color}</td>
            <td>${car.year}</td>
            <td><button onclick="deleteCar(${index})">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

const deleteCar = (index) => {
    carCollection.splice(index, 1); // Remove the car from the collection
    localStorage.setItem('cars', JSON.stringify(carCollection)); // Update local storage
    displayCarTable(); // Refresh the table
};

const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    const searchLicensePlate = document.getElementById('searchLicensePlate').value.trim();
    const searchResultsDiv = document.getElementById('searchResults');
    const searchErrorDiv = document.getElementById('searchError');
    searchResultsDiv.innerHTML = ''; // for clearing previous result
    searchErrorDiv.style.display = 'none'; // for hiding previous error message

    if (!searchLicensePlate) {
        displayMessage('Please input a license plate number.', true);
        return;
    }

    const foundCar = carCollection.find(car => car.licensePlate.toLowerCase() === searchLicensePlate.toLowerCase()); //.toLowerCase() is used on both the stored license plate (car.licensePlate) and the search input (searchLicensePlate) to ensure case-insensitive matching.
    if (foundCar) {
        const result = `
            <h1>Search Car Details:</h1>
            <p><strong>License Plate:</strong> ${foundCar.licensePlate}</p>
            <p><strong>Maker:</strong> ${foundCar.maker}</p>
            <p><strong>Model:</strong> ${foundCar.model}</p>
            <p><strong>Current Owner:</strong> ${foundCar.currentOwner}</p>
            <p><strong>Original Price:</strong> €${foundCar.price.toFixed(2)}</p>
            <p><strong>Discounted Price:</strong> €${foundCar.calculateDiscount().toFixed(2)}</p>
            <p><strong>Color:</strong> ${foundCar.color}</p>
            <p><strong>Year:</strong> ${foundCar.year}</p>
        `;
        searchResultsDiv.innerHTML = result;

        // Scroll to search results
        searchResultsDiv.scrollIntoView({ behavior: 'smooth' });
        displayMessage('Car found successfully!', false); // Show success message
    } else {
        displayMessage('Please enter a valid license plate number.', true);
    }
};

function displayMessage(message, isError = true) {
    const messageDiv = document.getElementById('formError');
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.color = isError ? 'red' : 'green'; 
}

loadCarsFromLocalStorage();

document.getElementById('carForm').addEventListener('submit', handleCarFormSubmit);
document.getElementById('searchForm').addEventListener('submit', handleSearchFormSubmit);

// Scroll to the search bar on nav click
document.getElementById('searchNavLink').addEventListener('click', function (e) {
    e.preventDefault(); 
    const searchForm = document.getElementById('searchForm');
    searchForm.scrollIntoView({ behavior: 'smooth' }); 

    // Focus on the search input field
    const searchInput = document.getElementById('searchLicensePlate');
    searchInput.focus(); 
});
