const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // מאפשר קריאות מה־React
app.use(express.json());

// ====== DATA ======
let users = [
  { id: "1", name: "אפרים לוי", email: "Ephraim.Levy@gmail.com", password: "EphEph$23", role: "manager" },
  { id: "2", name: "בתיה כץ", email: "Batya.Katz@gmail.com", password: "Baka2244@", role: "customer" },
  { id: "3", name: "דניאל נהרי", email: "Daniel.Nahari@gmail.com", password: "dNahari#1", role: "customer" },
  { id: "4", name: "טליה שולץ", email: "Talia.Schultz@gmail.com", password: "!Schultz2@", role: "customer" },
  { id: "5", name: "נעמה מלכה", email: "Naama.Malka@gmail.com", password: "Naama*99", role: "manager" },
  { id: "6", name: "שירה דיין", email: "Shira@gmail.com", password: "Shira2244#", role: "customer" },
  { id: "0656", name: "שרה כהן", email: "sara@gmail.com", password: "Ss@222222", role: "customer" },
  { id: "9aa1", name: "אביטל הלוי 🌹", email: "A@gmail.com", password: "Aa!12345", role: "customer" }
];

let products = [
  { id: "1", name: "זר בעיצוב החנות", category: "ורדים", price: 250, image: "/images/img_1.webp" }
];

let reviews = [
  { id: "1", productId: "79", userId: "de5616c0", rating: 3, comment: "פרח ריחני ונעים – אשמח להזמין שוב" },
  { id: "2f25", productId: "24", userId: "2", rating: 5, comment: "מרוצה עד הגג כל פעם מחדש!!" },
  { id: "26bc", productId: "75", userId: "7a17", rating: 5, comment: "מהמם😊" },
  { id: "ebd5", productId: "24", userId: "9aa1", rating: 5, comment: "אין דברים כאילה😍" }
];

// ====== USERS ======
app.get("/api/users", (req, res) => {
  const { email } = req.query;
  if (email) {
    return res.json(users.filter(u => u.email === email));
  }
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser = { id: Date.now().toString(), ...req.body };
  users.push(newUser);
  res.json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return res.status(404).send("User not found");
  users[index] = { id, ...req.body };
  res.json(users[index]);
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  users = users.filter(u => u.id !== id);
  res.sendStatus(204);
});

// ====== PRODUCTS ======
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).send("Product not found");
  res.json(product);
});

app.post("/api/products", (req, res) => {
  const newProduct = { id: Date.now().toString(), ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).send("Product not found");
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.sendStatus(204);
});

// ====== REVIEWS ======
app.get("/api/reviews", (req, res) => {
  res.json(reviews);
});

app.post("/api/reviews", (req, res) => {
  const newReview = { id: Date.now().toString(), ...req.body };
  reviews.push(newReview);
  res.json(newReview);
});

app.listen(3001, () => console.log("Server running on port 3001"));
