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
  { id: "7", name: "שרה כהן", email: "sara@gmail.com", password: "Ss@222222", role: "customer" },
  { id: "8", name: "אביטל הלוי", email: "A@gmail.com", password: "Aa!12345", role: "customer" },
  { id: "9", name: "יוסף רוב", email: "Yr@gmail.com", password: "Yyrr$111", role: "customer" },
  { id: "10", name: "עדי חזן", email: "Hazan@gmail.com", password: "Ha#321", role: "customer" }
];

let products = [
  { "id": "1", "name": "זר בעיצוב החנות", "category": "ורדים", "price": 250, "image": "/images/img_1.webp" },
  { "id": "2", "name": "זר עירית רגיל ויין", "category": "מעורב", "price": 220, "image": "/images/img_3.webp" },
  { "id": "3", "name": "זר סלין", "category": "מיוחד", "price": 200, "image": "/images/img_6.webp" },
  { "id": "4", "name": "זר ורדים", "category": "מיוחד", "price": 170, "image": "/images/img_7.webp" },
  { "id": "5", "name": "זר טוסקנה", "category": "מעורב", "price": 165, "image": "/images/img_9.jpg" },
  { "id": "6", "name": "זר ימים לבנים", "category": "מיוחד", "price": 280, "image": "/images/img_10.webp" },
  { "id": "7", "name": "זר סולי", "category": "מעורב", "price": 180, "image": "/images/img12.webp" },
  { "id": "8", "name": "זר אושר ורוד", "category": "מעורב", "price": 220, "image": "/images/img13.webp" },
  { "id": "9", "name": "זר אריאנה", "category": "מעורב", "price": 160, "image": "/images/img14.webp"},
  { "id": "10", "name": "זר סלין באגרטל", "category":  "מיוחד", "price": 140, "image": "/images/img15.webp" },
  { "id": "11", "name": "אורה באגרטל", "category": "מיוחד", "price": 200, "image": "/images/img16.webp" },
  { "id": "12", "name": "זר הרמוניה", "category": "מיוחד", "price": 170, "image": "/images/img17.webp" },
  { "id": "13", "name": "סולי באגרטל ויין", "category": "אקזוטי", "price": 250, "image": "/images/img18.webp" },
  { "id": "14", "name": "סולי באגרטל", "category": "מעורב", "price": 165, "image": "/images/img19.webp" },
  { "id": "15", "name": "19 ורדים באגרטל", "category": "מיוחד", "price": 280, "image": "/images/img20.webp" },
  { "id": "16", "name": "זר לינה", "category": "ורדים", "price": 150, "image": "/images/img21.webp" },
  { "id": "17", "name": "זר לינה ויין", "category": "מעורב", "price": 180, "image": "/images/img22.webp" },
  { "id": "18", "name": "זר אושר ורוד באגרטל", "category": "מעורב", "price": 220, "image": "/images/img23.webp" },
  { "id": "19", "name": "זר תמיד", "category": "מעורב", "price": 160, "image":  "/images/img24.webp" },
  { "id": "20", "name": "זר 29 ורדים", "category": "מיוחד", "price": 140, "image": "/images/img26.jpg" },
  { "id": "21", "name": "זר 29 ורדים ויין", "category": "מיוחד", "price": 200, "image": "/images/img25.webp" },
  { "id": "22", "name": "זר בלה ויין", "category": "מיוחד", "price": 170, "image": "/images/img_26.webp" },
    {
      "id": "23",
      "name": "סידור בורוד ויין",
      "category": "אקזוטי",
      "price": 250,
      "image": "/images/img_27.webp"
    },
    {
      "id": "24",
      "name": "זר 49 ורדים",
      "category": "מעורב",
      "price": 165,
      "image": "/images/img_28.jpg"
    },
    {
      "id": "25",
      "name": "דריה גדול ויין",
      "category": "ורדים",
      "price": 150,
      "image": "/images/img_30.webp"
    },
    {
      "id": "26",
      "name": "זר הרים מושלגים",
      "category": "מעורב",
      "price": 180,
      "image": "/images/img_31.jpg"
    },
    {
      "id": "27",
      "name": "זר אור השחר",
      "category": "מעורב",
      "price": 220,
      "image": "/images/img_32.jpg"
    },
    {
      "id": "28",
      "name": "זר שמש מלטפת",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_33.webp"
    },
    {
      "id": "29",
      "name": "זר עדן",
      "category": "מיוחד",
      "price": 140,
      "image": "/images/img_34.webp"
    },
    {
      "id": "30",
      "name": "זר קטיה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_35.webp"
    },
    {
      "id": "31",
      "name": "עדן ויין",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_37.webp"
    },
    {
      "id": "32",
      "name": "זר אורות הצפון",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_38.webp"
    },
    {
      "id": "33",
      "name": "זר עירית",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_39.webp"
    },
    {
      "id": "34",
      "name": "זר בלה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_40.webp"
    },
    {
      "id": "35",
      "name": "זר תחרה לבנה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_41.webp"
    },
    {
      "id": "36",
      "name": "זר אושר בלבן",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_42.webp"
    },
    {
      "id": "37",
      "name": "זר כותנה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_43.webp"
    },
    {
      "id": "38",
      "name": "זר לואר",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_44.webp"
    },
    {
      "id": "39",
      "name": "זר תחרה לבנה ביינוי",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_45.webp"
    },
    {
      "id": "40",
      "name": "זר דריה",
      "category": "מעורב",
      "price": 180,
      "image": "/images/img_2.webp"
    },
    {
      "id": "41",
      "name": "זר עירית רגיל ויין",
      "category": "מעורב",
      "price": 220,
      "image": "/images/img_3.webp"
    },
    {
      "id": "42",
      "name": "הרמוניה ויין",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_4.webp"
    },
    {
      "id": "43",
      "name": "זר עירית בינוני ויין",
      "category": "מיוחד",
      "price": 140,
      "image": "/images/img_5.webp"
    },
    {
      "id": "44",
      "name": "זר סלין",
      "category": "מיוחד",
      "price": 200,
      "image": "/images/img_6.webp"
    },
    {
      "id": "45",
      "name": "זר ורדים",
      "category": "מיוחד",
      "price": 170,
      "image": "/images/img_7.webp"
    },
    {
      "id": "46",
      "name": "זר אורה",
      "category": "אקזוטי",
      "price": 250,
      "image": "/images/img_8.webp"
    },
    {
      "id": "47",
      "name": "זר טוסקנה",
      "category": "מעורב",
      "price": 165,
      "image": "/images/img_9.jpg"
    },
    {
      "id": "48",
      "name": "זר ימים לבנים",
      "category": "מיוחד",
      "price": 280,
      "image": "/images/img_10.webp"
    },
    {
      "id": "49",
      "name": "אושר ורוד ויין",
      "category": "ורדים",
      "price": 150,
      "image": "/images/img11.webp"
    },
    {
      "id": "50",
      "name": "זר סולי",
      "category": "מעורב",
      "price": 180,
      "image": "/images/img12.webp"
    },
    {
      "id": "51",
      "name": "זר אושר ורוד",
      "category": "מעורב",
      "price": 220,
      "image": "/images/img13.webp"
    },
    {
      "id": "52",
      "name": "זר אריאנה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img14.webp"
    },
    {
      "id": "53",
      "name": "זר סלין באגרטל",
      "category": "מיוחד",
      "price": 140,
      "image": "/images/img15.webp"
    },
    {
      "id": "54",
      "name": " אורה באגרטל",
      "category": "מיוחד",
      "price": 200,
      "image": "/images/img16.webp"
    },
    {
      "id": "55",
      "name": "זר הרמוניה",
      "category": "מיוחד",
      "price": 170,
      "image": "/images/img17.webp"
    },
    {
      "id": "56",
      "name": "סולי באגרטל ויין",
      "category": "אקזוטי",
      "price": 250,
      "image": "/images/img18.webp"
    },
    {
      "id": "57",
      "name": "סולי באגרטל",
      "category": "מעורב",
      "price": 165,
      "image": "/images/img19.webp"
    },
    {
      "id": "58",
      "name": "19 ורדים באגרטל",
      "category": "מיוחד",
      "price": 280,
      "image": "/images/img20.webp"
    },
    {
      "id": "59",
      "name": "זר לינה",
      "category": "ורדים",
      "price": 150,
      "image": "/images/img21.webp"
    },
    {
      "id": "60",
      "name": "זר אושר ורוד באגרטל",
      "category": "מעורב",
      "price": 220,
      "image": "/images/img23.webp"
    },
    {
      "id": "61",
      "name": "זר תמיד",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img24.webp"
    },
    {
      "id": "62",
      "name": "זר 29 ורדים",
      "category": "מיוחד",
      "price": 140,
      "image": "/images/img26.jpg"
    },
    {
      "id": "63",
      "name": "זר 29 ורדים ויין",
      "category": "מיוחד",
      "price": 200,
      "image": "/images/img25.webp"
    },
    {
      "id": "64",
      "name": "זר בלה ויין",
      "category": "מיוחד",
      "price": 170,
      "image": "/images/img_26.webp"
    },
    {
      "id": "65",
      "name": "סידור בורוד ויין",
      "category": "אקזוטי",
      "price": 250,
      "image": "/images/img_27.webp"
    },
    {
      "id": "66",
      "name": "זר 49 ורדים",
      "category": "מעורב",
      "price": 165,
      "image": "/images/img_28.jpg"
    },
    {
      "id": "67",
      "name": "זר 99 ורדים מולן רוז",
      "category": "מיוחד",
      "price": 280,
      "image": "/images/img_29.jpg"
    },
    {
      "id": "68",
      "name": "דריה גדול ויין",
      "category": "ורדים",
      "price": 150,
      "image": "/images/img_30.webp"
    },
    {
      "id": "69",
      "name": "זר הרים מושלגים",
      "category": "מעורב",
      "price": 180,
      "image": "/images/img_31.jpg"
    },
    {
      "id": "70",
      "name": "זר אור השחר",
      "category": "מעורב",
      "price": 220,
      "image": "/images/img_32.jpg"
    },
    {
      "id": "71",
      "name": "זר שמש מלטפת",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_33.webp"
    },
    {
      "id": "72",
      "name": "זר עדן",
      "category": "מיוחד",
      "price": 140,
      "image": "/images/img_34.webp"
    },
    {
      "id": "73",
      "name": "זר קטיה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_35.webp"
    },
    {
      "id": "74",
      "name": "עדן ויין",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_37.webp"
    },
    {
      "id": "75",
      "name": "זר אורות הצפון",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_38.webp"
    },
    {
      "id": "76",
      "name": "זר עירית",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_39.webp"
    },
    {
      "id": "77",
      "name": "זר בלה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_40.webp"
    },
    {
      "id": "78",
      "name": "זר תחרה לבנה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_41.webp"
    },
    {
      "id": "79",
      "name": "זר אושר בלבן",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_42.webp"
    },
    {
      "id": "80",
      "name": "זר כותנה",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_43.webp"
    },
    {
      "id": "81",
      "name": "זר לואר",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_44.webp"
    },
    {
      "id": "82",
      "name": "זר תחרה לבנה ביינוי",
      "category": "מעורב",
      "price": 160,
      "image": "/images/img_45.webp"
    },
    {
      "id": "83",
      "name": "זר אביב",
      "category": "מעורב",
      "price": 140,
      "image": "/images/img13.webp"
    }
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
