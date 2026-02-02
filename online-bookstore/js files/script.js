const books = [
  { title: "Atomic Habits", price: 11.99, img: "https://covers.openlibrary.org/b/id/9259251-L.jpg" },
  { title: "Clean Code", price: 18.99, img: "https://covers.openlibrary.org/b/id/9641651-L.jpg" },
  { title: "The Alchemist", price: 10.50, img: "https://covers.openlibrary.org/b/id/8100921-L.jpg" },
  { title: "Deep Work", price: 12.75, img: "https://covers.openlibrary.org/b/id/10132345-L.jpg" },
  { title: "Rich Dad Poor Dad", price: 9.99, img: "https://covers.openlibrary.org/b/id/10909258-L.jpg" },

  { title: "Think Like a Monk", price: 13.25, img: "https://covers.openlibrary.org/b/id/10409564-L.jpg" },
  { title: "The Power of Habit", price: 14.20, img: "https://covers.openlibrary.org/b/id/8167896-L.jpg" },
  { title: "Ikigai", price: 10.99, img: "https://covers.openlibrary.org/b/id/9250616-L.jpg" },
  { title: "Start With Why", price: 15.50, img: "https://covers.openlibrary.org/b/id/8370226-L.jpg" },
  { title: "The Subtle Art of Not Giving a F*ck", price: 13.99, img: "https://covers.openlibrary.org/b/id/8375046-L.jpg" },

  { title: "The 5 AM Club", price: 11.49, img: "https://covers.openlibrary.org/b/id/10234438-L.jpg" },
  { title: "Zero to One", price: 16.99, img: "https://covers.openlibrary.org/b/id/8375043-L.jpg" },
  { title: "The Psychology of Money", price: 14.75, img: "https://covers.openlibrary.org/b/id/10594708-L.jpg" },
  { title: "Can't Hurt Me", price: 17.99, img: "https://covers.openlibrary.org/b/id/10958356-L.jpg" },
  { title: "Do Epic Shit", price: 9.50, img: "https://covers.openlibrary.org/b/id/12879222-L.jpg" },

  { title: "Harry Potter", price: 14.99, img: "https://covers.openlibrary.org/b/id/7984916-L.jpg" },
  { title: "The Hobbit", price: 15.99, img: "https://covers.openlibrary.org/b/id/6979861-L.jpg" },
  { title: "Lord of the Rings", price: 22.99, img: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
  { title: "Game of Thrones", price: 19.99, img: "https://covers.openlibrary.org/b/id/8319251-L.jpg" },
  { title: "Percy Jackson", price: 12.99, img: "https://covers.openlibrary.org/b/id/7984913-L.jpg" },

  { title: "You Don't Know JS", price: 21.99, img: "https://covers.openlibrary.org/b/id/10406578-L.jpg" },
  { title: "JavaScript: The Good Parts", price: 19.50, img: "https://covers.openlibrary.org/b/id/5546156-L.jpg" },
  { title: "Eloquent JavaScript", price: 17.25, img: "https://covers.openlibrary.org/b/id/10256342-L.jpg" },
  { title: "Design Patterns", price: 24.99, img: "https://covers.openlibrary.org/b/id/8231990-L.jpg" },
  { title: "Cracking the Coding Interview", price: 29.99, img: "https://covers.openlibrary.org/b/id/8235116-L.jpg" }
];


let cart = JSON.parse(localStorage.getItem("cart")) || [];
const grid = document.getElementById("bookGrid");

if (grid) {
  books.forEach((book, i) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <img src="${book.img}">
      <h4>${book.title}</h4>
      <p>$${book.price}</p>
      <button onclick="addToCart('${book.title}', ${book.price})">
        Add to Cart
      </button>
    `;
    grid.appendChild(card);
    setTimeout(() => card.classList.add("show"), i * 100);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(name);
}


function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

updateCartCount();
const cartItemsDiv = document.getElementById("cart-items");
const totalSpan = document.getElementById("total");
const emptyCart = document.getElementById("empty-cart");

function renderCart() {
  if (!cartItemsDiv) return;

  cartItemsDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    emptyCart.classList.remove("hidden");
    totalSpan.innerText = "0";
    return;
  }

  emptyCart.classList.add("hidden");

  cart.forEach((item, index) => {
    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-left">
        <img src="https://covers.openlibrary.org/b/title/${encodeURIComponent(item.name)}-M.jpg">
        <h4>${item.name}</h4>
      </div>
      <div class="cart-controls">
        <span>$${item.price}</span>
        <button class="remove-btn" onclick="removeItem(${index})">✖</button>
      </div>
    `;

    cartItemsDiv.appendChild(div);
  });

  totalSpan.innerText = total.toFixed(2);
}

function removeItem(index) {
  const item = document.querySelectorAll(".cart-item")[index];
  item.classList.add("fade-out");

  setTimeout(() => {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
  }, 300);
}

renderCart();

const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is already empty 😅");
      return;
    }

    alert("🎉 Order placed successfully!");

    // Clear cart
    cart = [];
    localStorage.removeItem("cart");

    // Update UI
    renderCart();
    updateCartCount();
  });
}
function showToast(bookName) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = `📘 "${bookName}" added to cart`;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
