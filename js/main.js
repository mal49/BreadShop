const menuItems = [
    {
        id: 1,
        name: "Croissant",
        price: 2.50,
        category: "Pastries",
        description: "A buttery, flaky pastry with a golden crust.",
        image: "img/Croissant-Petr_Kratochvil.jpg"
    },
    {
        id: 2,
        name: "Baguette",
        price: 3.00,
        category: "Bread",
        description: "A classic French bread with a crispy crust and soft interior.",
        image: "img/Baguette_de_pain,_WikiCheese_Lausanne.jpg"
    },
    {
        id: 3,
        name: "Turkey Club",
        price: 8.50,
        category: "Sandwiches",
        description: "Triple-decker sandwich with turkey, bacon, lettuce, and tomato.",
        image: "img/turkey-club-sandwich-2.jpg"
    },
    {
        id: 4,
        name: "Danish Pastry",
        price: 3.50,
        category: "Pastries",
        description: "Sweet pastry filled with fruit or cream cheese.",
        image: "img/DanishPastry_cook_za-0485.jpg"
    },
    {
        id: 5,
        name: "Sourdough Bread",
        price: 4.50,
        category: "Bread",
        description: "Artisanal bread with a distinctive tangy flavor.",
        image: "img/everyday-sourdough-bread-recipe.jpg"
    },
    {
        id: 6,
        name: "Chicken Pesto",
        price: 9.00,
        category: "Sandwiches",
        description: "Grilled chicken with pesto, mozzarella, and tomatoes.",
        image: "img/creamy-pesto-chicken-1-12-1229x1536.jpg"
    },
    {
        id: 7,
        name: "Pain au Chocolat",
        price: 3.00,
        category: "Pastries",
        description: "Chocolate-filled buttery pastry roll.",
        image: "img/Pain-Au-Chocolat-3--scaled.jpg"
    },
    {
        id: 8,
        name: "Rye Bread",
        price: 4.00,
        category: "Bread",
        description: "Dense, hearty bread made with rye flour.",
        image: "img/Dark-Pumpernickel-Rye-Bread-72dpi-8x12-1.jpg"
    },
    {
        id: 9,
        name: "Veggie Delight",
        price: 7.50,
        category: "Sandwiches",
        description: "Fresh vegetables with hummus on whole grain bread.",
        image: "img/Menuitem-Veggie-Delite.jpg"
    },
    {
        id: 10,
        name: "Cinnamon Roll",
        price: 3.50,
        category: "Pastries",
        description: "Soft roll with cinnamon-sugar swirl and cream cheese frosting.",
        image: "img/Coffee-Cinnamon-Rolls-Feature1.jpg"
    },
    {
        id: 11,
        name: "Focaccia",
        price: 5.00,
        category: "Bread",
        description: "Italian flatbread with herbs and olive oil.",
        image: "img/Garlic-Bread-Focaccia-6.webp"
    },
    {
        id: 12,
        name: "Italian Sub",
        price: 9.50,
        category: "Sandwiches",
        description: "Classic Italian cold cuts with provolone and vegetables.",
        image: "img/18742-italian-sub-600x600.webp"
    },
    {
        id: 13,
        name: "Chocolate Eclair",
        price: 4.00,
        category: "Pastries",
        description: "Choux pastry filled with cream and topped with chocolate.",
        image: "img/Chocolate Eclairs.webp"
    },
    {
        id: 14,
        name: "Ciabatta",
        price: 4.00,
        category: "Bread",
        description: "Italian white bread with a chewy texture and crisp crust.",
        image: "img/ciabatta-bread.jpg"
    },
    {
        id: 15,
        name: "BLT",
        price: 7.00,
        category: "Sandwiches",
        description: "Classic bacon, lettuce, and tomato sandwich on toasted bread.",
        image: "img/BLT-for-recipe-.jpeg.webp"
    }
]

let cart = [];

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

function filterItems(category) {
    const categoryButton = document.querySelectorAll('.category-btn');
    categoryButton.forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === category.toLowerCase() || (button.textContent.toLowerCase() === 'all' && category.toLowerCase() === 'all')) {
            button.classList.add('active');
        }
    });

    let filterItems;
    if (category.toLowerCase() === 'all') {
        filterItems = menuItems;
    } else {
        filterItems = menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    displayMenuItems(filterItems);
}

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

function removeFromCart(itemid) {
    cart = cart.filter(item => item.id !== itemid);
    updateOrderSummary();
}

function changeQuantity(itemid, change) {
    const itemIndex = cart.findIndex(item => item.id === itemid);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
    }

    if (cart[itemIndex].quantity <= 0) {
        removeFromCart(itemid);
    } else {
        updateOrderSummary();
    }
}

function updateOrderSummary() {
    const orderItems = document.getElementById('order-items');
    const emptyCart = document.getElementById('empty-cart');
    const totalPrice = document.getElementById('total-price');

    orderItems.innerHTML = '';

    if (cart.length === 0) {
        orderItems.innerHTML = '<p id="empty-cart">Your cart is empty</p>';
        totalPrice.textContent = '0.00';
        return;
    } 

    let total = 0;

    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';

        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderItem.innerHTML = `
        <div>
            <p>${item.name}</p>
            <p>RM${item.price.toFixed(2)} x ${item.quantity}</p>
        </div>
        <div class="item-controls">
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
            <button class="remove-item" onclick="removeFromCart(${item.id})">x</button>
        </div>
        `;

        orderItems.appendChild(orderItem);
    });

    totalPrice.textContent = total.toFixed(2);
}


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');
    
    displayMenuItems(menuItems);

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
}); 

displayMenuItems(menuItems);