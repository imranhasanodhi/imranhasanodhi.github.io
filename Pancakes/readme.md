# Pancake oder applicaiton

## Overview

This project is a dynamic pancake customization tool built using JavaScript to provide an interactive user experience. The tool allows customers to select pancake types, toppings, and extras, and calculates the total price based on their choices. The project includes two steps: implementing the pancake customization logic and enhancing it with customer information and delivery options.

## Step 1: Pancake customization

1. **Listen for changes:**
   - Monitor changes in the pancake type select box and all checkbox inputs (for toppings and extras) using `addEventListener`.

2. **Calculate the total price:**
   - Base price is determined by the pancake type.
   - Each topping adds $1 to the base price.
   - Specific extras have individual prices that are added to the total.
   
3. **Display the total price:**
   - Dynamically show the updated total price in the `#totalPrice` span element.

### Optional Enhancements:

- **Custom Font Integration:** Apply a Google Font to all elements for a modern look.
- **Image Layout:** Resize the pancake image to cover 50% of the page and extend to full viewport height.
- **Price Animation:** Add an animation to the price display to draw attention when the total price changes.
- **Responsive Design:** Ensure the application is fully responsive on both desktop and mobile devices.

## Step 2: Customer Information and Delivery Options

### Tasks:

1. **Capture customer information:**
   - Add an input field for the customer’s name and capture the input value correctly.

2. **Implement delivery method options:**
   - Include radio buttons for delivery method:
     - **Eat In**
     - **Pick Up**
     - **Delivery** (adds $5 to the total price)
   - Update the total price dynamically when the delivery option is selected.

3. **Update the total price dynamically:**
   - Adjust the existing price calculation to account for the $5 delivery charge if the "Delivery" option is selected.
   - Continuously display the updated total price in the `#totalPrice` span.

4. **Display order summary:**
   - Add a "See Order" button that, when clicked, displays the following information:
     - Customer Name
     - Selected Pancake Type, Toppings, and Extras
     - Chosen Delivery Method
     - Total Price (including any delivery charges)

5. **Store orders in an array:**
   - Store each order in an array that contains:
     - Customer’s name
     - Selected pancake details (type, toppings, extras)
     - Chosen delivery method
     - Total price
   - Ensure updates to the order are reflected in the array.

---

## Acceptance Criteria

- **Functionality:**
  - Pancake type, toppings, and extras should dynamically update the total price.
  - Delivery options should work correctly and adjust the total price if delivery is selected.
  - Customer details and current order should be displayed correctly when requested.
  - Orders should be stored in an array with all relevant details and reflect any changes made before finalizing.

- **User Interface:**
  - The page should be responsive and display correctly on both desktop and mobile devices.
  - The font should be modern and cohesive with the design.
  - Pancake image layout should be visually appealing, covering 50% of the page with full viewport height.
  - Any price changes should be highlighted through a smooth animation.

- **Performance:**
  - All input fields should be fully functional, including name input, delivery options, and order summary display.
  - The total price should always reflect the current selections and delivery method.
  - Orders should be properly stored in an array, and any updates should modify the existing order data.