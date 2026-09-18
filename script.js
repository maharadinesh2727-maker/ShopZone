/* =================================
   PRODUCT DATA
================================= */

/*
    आफ्नो image यहाँ राख्न मिल्छ।

    Local image:
    "images/product1.jpg"

    Image URL:
    "https://example.com/product.jpg"
*/

const products = [

    {
        id: 1,
        name: "Denim Tshirts",
        category: "Fashion",
        price: 850,
        rating: 5,
        image: "https://i.pinimg.com/736x/b0/5d/0c/b05d0c1e46ce884cdb0bb6de90d4f467.jpg"
    },

    {
        id: 2,
        name: "Denim Jeans",
        category: "Accessories",//jeans category
        price: 1450,
        rating: 4,
        image: "https://i.pinimg.com/736x/44/c9/71/44c971642ea05c6d69f7e30a6ede822e.jpg"
    },

    {
        id: 3,
        name: "Hoodie",
        category: "Electronics", //new arrivals category
        price: 1900,
        rating: 5,
        image: "https://i.pinimg.com/736x/e3/4a/47/e34a477db9b7741372ae85c5b2cb2056.jpg"
    },

    {
        id: 4,
        name: "Casual T-Shirt",
        category: "Fashion",//T-shirts category
        price: 1800,
        rating: 4,
        image: "https://i.pinimg.com/1200x/c7/21/59/c72159872c86159bba194a771580ea89.jpg"
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "Shoes",
        price: 3500,
        rating: 4,
        image: "https://i.pinimg.com/1200x/ba/83/96/ba839697799fd857884ecd25dd931200.jpg"
    },

{
        id: 6,
        name: "Nike shoes",
        category: "Shoes",
        price: 2000,
        rating: 4,
        image: "https://i.pinimg.com/1200x/7d/37/9b/7d379be7acbaa02238b5be9370cbef66.jpg"
    },
{
        id: 7,
        name: "Adidas Shoes",
        category: "Shoes",
        price: 2500,
        rating: 4,
        image: "https://i.pinimg.com/736x/99/21/76/992176e775eb7b233eec0de1ded5e633.jpg"
    },


    {
        id: 8,
        name: "Baggy Jeans",
        category: "Accessories",
        price: 1200,
        rating: 4,
        image: "https://i.pinimg.com/1200x/95/21/29/952129590a0cb934971fb405b1ce688d.jpg"
    },

  {
        id: 9,
        name: "Negro Jeans",
        category: "Accessories",
        price: 2500,
        rating: 4,
        image: "https://i.pinimg.com/736x/12/18/1a/12181ac06c5cb662b2d69722a39c4c5d.jpg"
    },


    {
        id: 10,
        name: "Jacket",
        category: "Electronics",//new arrivals cat
        price: 5000,
        rating: 5,
        image: "https://i.pinimg.com/736x/46/23/0a/46230acabd17deb1af72b1a18e92465a.jpg"
    },

    {
        id: 11,
        name: "Denim shirt",
        category: "Fashion",//tshirt cat
        price: 1300,
        rating: 4,
        image: "https://i.pinimg.com/1200x/c8/91/23/c8912344c205c56902f6f99238880a99.jpg"
    },
    {
        id: 12,
        name: "Denim shirt",
        category: "Electronics",//New arrivals
        price: 1300,
        rating: 4,
        image: "https://i.pinimg.com/1200x/c8/91/23/c8912344c205c56902f6f99238880a99.jpg"
    },
     {
        id: 13,
        name: "Dean Jacket",
        category: "Electronics",//New arrivals
        price: 2300,
        rating: 4,
        image: "https://i.pinimg.com/1200x/30/91/75/309175f0ab05973cbe4e6dfe01224db2.jpg"
    }


    
];


/* =================================
   CART
================================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* =================================
   DISPLAY PRODUCTS
================================= */

const productsGrid =
    document.getElementById("productsGrid");


function displayProducts(productList) {

    productsGrid.innerHTML = "";

    if (productList.length === 0) {

        productsGrid.innerHTML = `
            <h2>No products found 😢</h2>
        `;

        return;
    }


    productList.forEach(product => {

        const stars =
            "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);


        const card = document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

          <a href="product.html?id=${product.id}">

    <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
    >

</a>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

               <a
    href="product.html?id=${product.id}"
    class="product-name-link"
>
    <h3 class="product-name">
        ${product.name}
    </h3>
</a>

                <div class="rating">
                    ${stars}
                </div>

                <div class="product-bottom">

                    <span class="price">
                        Rs. ${product.price.toLocaleString()}
                    </span>

                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >
                        + Cart
                    </button>

                </div>

            </div>
        `;


        productsGrid.appendChild(card);

    });

}


/* =================================
   ADD TO CART
================================= */

function addToCart(id) {

    const product =
        products.find(item => item.id === id);


    const existing =
        cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* =================================
   UPDATE CART
================================= */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartCount =
        document.getElementById("cartCount");

    const cartTotal =
        document.getElementById("cartTotal");


    cartItems.innerHTML = "";


    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total +=
            item.price * item.quantity;

        count += item.quantity;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    Rs. ${item.price.toLocaleString()}
                </p>

                <div class="quantity">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        "Rs. " + total.toLocaleString();


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p style="text-align:center;">
                Your cart is empty 🛒
            </p>
        `;

    }

}


/* =================================
   CHANGE QUANTITY
================================= */

function changeQuantity(id, change) {

    const item =
        cart.find(item => item.id === id);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }


    saveCart();

    updateCart();

}


/* =================================
   REMOVE ITEM
================================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);


    saveCart();

    updateCart();

}


/* =================================
   LOCAL STORAGE
================================= */

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


/* =================================
   CART OPEN / CLOSE
================================= */

const cartBtn =
    document.getElementById("cartBtn");

const closeCart =
    document.getElementById("closeCart");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");


function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

}


function closeCartSidebar() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

}


cartBtn.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


/* =================================
   SEARCH
================================= */

const searchInput =
    document.getElementById("searchInput");


searchInput.addEventListener(
    "input",
    function () {

        const search =
            this.value.toLowerCase();


        const filtered =
            products.filter(product =>

                product.name
                    .toLowerCase()
                    .includes(search)

                ||

                product.category
                    .toLowerCase()
                    .includes(search)

            );


        displayProducts(filtered);

    }
);


/* =================================
   CATEGORY FILTER
================================= */

const categoryButtons =
    document.querySelectorAll(".category-btn");


categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            categoryButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            this.classList.add("active");


            const category =
                this.dataset.category;


            if (category === "All") {

                displayProducts(products);

            } else {

                const filtered =
                    products.filter(
                        product =>
                            product.category === category
                    );


                displayProducts(filtered);

            }

        }
    );

});


/* =================================
   DARK MODE
================================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle("dark");


        if (
            document.body.classList.contains("dark")
        ) {

            themeBtn.textContent = "☀️";

        } else {

            themeBtn.textContent = "🌙";

        }

    }
);


/* =================================
   CHECKOUT
================================= */

const checkoutBtn =
    document.querySelector(".checkout-btn");


checkoutBtn.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert("Your cart is empty!");

            return;

        }


        alert(
            "Checkout system coming soon! 🚀"
        );

    }
);


/* =================================
   INITIAL LOAD
================================= */

displayProducts(products);

updateCart();

/* =================================
   PRODUCT DETAIL PAGE
================================= */

const urlParams = new URLSearchParams(window.location.search);

const productId = Number(urlParams.get("id"));


// Check if we are on product.html
if (window.location.pathname.includes("product.html")) {

    const product = products.find(item => item.id === productId);

    if (product) {

        // Product Image
        document.getElementById("detailImage").src =
            product.image;

        document.getElementById("detailImage").alt =
            product.name;


        // Product Name
        document.getElementById("detailName").textContent =
            product.name;


        // Category
        document.getElementById("detailCategory").textContent =
            product.category;


        // Price
        document.getElementById("detailPrice").textContent =
            "Rs. " + product.price.toLocaleString();


        // Rating
        document.getElementById("detailRating").textContent =
            "★".repeat(product.rating) +
            "☆".repeat(5 - product.rating);

    }

    else {

        document.querySelector(".product-details").innerHTML = `

            <div style="text-align:center; width:100%;">

                <h1>Product Not Found 😢</h1>

                <br>

                <a href="index.html">
                    ← Back to Home
                </a>

            </div>

        `;

    }

}

const THEME_KEY = 'NewWEBSITE-theme';
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === 'light' || savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

const themeToggle = document.getElementById('themeToggle');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)');

function currentTheme() {
  const explicit = document.documentElement.getAttribute('data-theme');
  if (explicit) return explicit;
  return systemPrefersLight.matches ? 'light' : 'dark';
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
});