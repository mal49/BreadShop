# Individual Project - BreadShop

## key Features

-   Menu display with categories (Pastries, Sandwiches, Bread)
-   Shopping cart functionality
-   Quantity adjustment for items
-   Checkout system with [SweetAlert](https://sweetalert2.github.io/) notifications

# Sample output
![image](./misc/Screenshot%202025-05-24%20214309.png)
![image](./misc/Screenshot%202025-05-24%20214340.png)
![image](./misc/Screenshot%202025-05-24%20214423.png)
![image](./misc/Screenshot%202025-05-24%20215750.png)

# Core code and Explanation

### 1.  Menu Data Structure

    
    const menuItem = [
        {
            id: 1,
            name: "Croissant",
            price: 2.50,
            category: "Pastries",
            description: "A buttery, flaky pastry with a golden crust.",
            image: "img/croissant_picture.jpg"
        },
        // ... more items
    ]

#### Purpose
-   Stores all menu items with their properties
-   Used as the single source of truth for the application

### 2.  Displaying Menu Items

        function displayMenuItems(items) {
        const menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML = '';
        
        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.dataset.category = item.category;
            
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image" width="250" height="200">
                <div class="item-info">
                    <div class="item-title">
                        <h3>${item.name}</h3>
                        <p>RM${item.price.toFixed(2)}</p>
                    </div>
                    <p class="item-description">${item.description}</p>
                    <button class="add-to-cart" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>`;
            
            menuContainer.appendChild(menuItem);    
        });
    }

#### Functionality
-   Dynamically creates menu items from the data
-   Uses template literals for clean HTML generation
-   Includes "Add to Cart" button with item ID binding

### 3.  Cart Management
    
        function addToCart(itemid) {
        const item = menuItems.find(item => item.id === itemid);
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === itemid);

        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += 1;
        } else {
            cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: 1
            });
        }
        updateOrderSummary();
    }

#### Features
-   Handles adding items to cart
-   Checks for existing items to increment quantity
-   Updates the order summary after modification

### 4.  Filtering Functionality

            function filterItems(category) {
        let filterItems;
        if (category.toLowerCase() === 'all') {
            filterItems = menuItems;
        } else {
            filterItems = menuItems.filter(item => 
                item.category.toLowerCase() === category.toLowerCase()
            );
        }
        displayMenuItems(filterItems);
    }

#### Behavior
-   Filters menu items by category
-   Handles "All" category case
-   Updates the displayed items

### 5.  Checkout Process

        document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length > 0) {
            Swal.fire({
                title: "Purchase Successful",
                text: "Thank you for buying our products!",
                icon: "success"
            });
            cart = [];
            updateOrderSummary();
        } else {
            Swal.fire({
                title: "cart is empty!",
                text: "try adding some products first",
                icon: "error"
            });
        }
    });

#### Process
-   Shows success/error message using [SweetAlert](https://sweetalert2.github.io/)
-   Clears cart on successful checkout
-   Prevents checkout with empty cart

## Conclusion

-  the website can be access [here](https://mal49.github.io/BreadShop/)
-  GitHub repository [here](https://github.com/mal49/BreadShop)

## Full code snippet

![code](./misc/code.png)
HTML

![code](./misc/code2.png)
JavaScript

![code](./misc/code3.png)
CSS