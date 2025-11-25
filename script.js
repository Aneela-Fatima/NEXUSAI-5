let products = [];

fetch("./products.json")
  .then(res => {
    if (!res.ok) {
      throw new Error("Unable to load products.json");
    }
    return res.json();
  })
  .then(data => {
    products = data;
    displayProducts(products);
  })
  .catch(err => {
    console.error("Error:", err);
    document.getElementById("products").innerHTML =
      "<p style='color:red; font-size:18px;'>Unable to load products. Check your products.json file.</p>";
  });

function displayProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(item => {
    container.innerHTML += `
      <div class="card">
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}

document.getElementById("search").addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );
  displayProducts(filtered);
});

function addToCart(id) {
  alert("Product added to cart: " + id);
}
