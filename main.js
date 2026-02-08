const products = [
  { id: 1, name: "T-Shirt", price: 499, category: "fashion", img: "image/t-shirt.jpg" },
  { id: 2, name: "Shoes", price: 1299, category: "shoes", img: "image/shoes.jpg" },
  { id: 3, name: "Headphones", price: 1999, category: "electronics", img: "image/headphone.jpg" },
  { id: 4, name: "Smart Watch", price: 2499, category: "electronics", img: "image/smart.jpg" },
  { id: 5, name: "Jeans", price: 899, category: "fashion", img: "image/jeans.jpg" },
  { id: 6, name: "Sneakers", price: 1599, category: "shoes", img: "image/sneakers.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(productArray) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  productArray.forEach(product => {
    productList.innerHTML += `
      <div class="card">
        <img src="${product.img}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>Category: ${product.category}</p>
        <p class="price">₹${product.price}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  const product = products.find(item => item.id === id);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(product.name + " added to cart!");
}

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

function openCart() {
  document.getElementById("cartModal").style.display = "flex";
  showCartItems();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function showCartItems() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartItems();
}

function searchProducts() {
  const searchValue = document.getElementById("searchInput").value.toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue)
  );
  displayProducts(filteredProducts);
}

function filterCategory() {
  const category = document.getElementById("categoryFilter").value;

  if (category === "all") {
    displayProducts(products);
  } else {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
  }
}

displayProducts(products);
updateCartCount();
