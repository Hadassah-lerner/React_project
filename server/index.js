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
 {
      "id": "6",
      "productId": "58",
      "userId": "5cb0dccf",
      "rating": 3,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "7",
      "productId": "71",
      "userId": "4cdd3621",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "8",
      "productId": "61",
      "userId": "1",
      "rating": 3,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "9",
      "productId": "67",
      "userId": "9aa1",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "10",
      "productId": "53",
      "userId": "5cb0dccf",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "11",
      "productId": "79",
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "12",
      "productId": "31",
      "userId": "4e08860e",
      "rating": 5,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "13",
      "productId": "18",
      "userId": "4cdd3621",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "14",
      "productId": "55",
      "userId": "4",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "15",
      "productId": "22",
      "userId": "3673a217",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "16",
      "productId": "46",
      "userId": "5036ebf7",
      "rating": 1,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "17",
      "productId": "94",
      "userId": "c1eea0f9",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "18",
      "productId": "18",
      "userId": "a0e2b217",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "19",
      "productId": "77",
      "userId": "c1eea0f9",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "20",
      "productId": "39",
      "userId": "8ad5a19b",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "21",
      "productId": "59",
      "userId": "6",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "22",
      "productId": "44",
      "userId": "4467efdc",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "23",
      "productId": "77",
      "userId": "5036ebf7",
      "rating": 3,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "24",
      "productId": "14",
      "userId": "a2950594",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "25",
      "productId": "7",
      "userId": "3",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "26",
      "productId": "49",
      "userId": "7bdc604f",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "27",
      "productId": "25",
      "userId": "bbc76ff1",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "28",
      "productId": 9,
      "userId": "c1d256a6",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "29",
      "productId": "10",
      "userId": "2",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "30",
      "productId": "64",
      "userId": "a2950594",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "31",
      "productId": "67",
      "userId": "de5616c0",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "32",
      "productId": "25",
      "userId": "02fc25d3",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "33",
      "productId": "81",
      "userId": "a6b36a71",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "34",
      "productId": "7",
      "userId": "6",
      "rating": 5,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "35",
      "productId": "35",
      "userId": "8ad5a19b",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "36",
      "productId": "96",
      "userId": "4cdd3621",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "37",
      "productId": "18",
      "userId": "4cdd3621",
      "rating": 5,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "38",
      "productId": "83",
      "userId": "47abea9e",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "39",
      "productId": "3",
      "userId": "0656",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "40",
      "productId": "69",
      "userId": "0656",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "41",
      "productId": "7",
      "userId": "2",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "42",
      "productId": "7",
      "userId": "a2950594",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "43",
      "productId": "24",
      "userId": "dd1b59d3",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "44",
      "productId": "56",
      "userId": "9aa1",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "45",
      "productId": "95",
      "userId": "0656",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "46",
      "productId": "93",
      "userId": "3f221874",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "47",
      "productId": "88",
      "userId": "dd1b59d3",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "48",
      "productId": "85",
      "userId": "9aa1",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "49",
      "productId": "86",
      "userId": "5cb0dccf",
      "rating": 3,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "50",
      "productId": "35",
      "userId": "5",
      "rating": 4,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "51",
      "productId": "90",
      "userId": "7bdc604f",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "52",
      "productId": "45",
      "userId": "1873fcf2",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "53",
      "productId": "17",
      "userId": "8ad5a19b",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "54",
      "productId": "90",
      "userId": "bbc76ff1",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "55",
      "productId": "31",
      "userId": "8ad5a19b",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "56",
      "productId": "75",
      "userId": "33093476",
      "rating": 3,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "57",
      "productId": "69",
      "userId": "dd1b59d3",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "58",
      "productId": "90",
      "userId": "7bdc604f",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "59",
      "productId": "27",
      "userId": "8ad5a19b",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "60",
      "productId": "92",
      "userId": "3f221874",
      "rating": 3,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "61",
      "productId": "63",
      "userId": "47abea9e",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "62",
      "productId": "77",
      "userId": "3f221874",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "63",
      "productId": "18",
      "userId": "1",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "64",
      "productId": "28",
      "userId": "7bdc604f",
      "rating": 3,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "65",
      "productId": "99",
      "userId": "9e35",
      "rating": 4,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "66",
      "productId": "43",
      "userId": "9aa1",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "67",
      "productId": "102",
      "userId": "2",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "68",
      "productId": "62",
      "userId": "3",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "69",
      "productId": "70",
      "userId": "a6b36a71",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "70",
      "productId": "68",
      "userId": "4",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "71",
      "productId": "99",
      "userId": "a2950594",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "72",
      "productId": "71",
      "userId": "0656",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "73",
      "productId": "18",
      "userId": "dd1b59d3",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "74",
      "productId": "15",
      "userId": "a6b36a71",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "75",
      "productId": "53",
      "userId": "7bdc604f",
      "rating": 5,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "76",
      "productId": "66",
      "userId": "5",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "77",
      "productId": "80",
      "userId": "2",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "78",
      "productId": "90",
      "userId": "4c521cc5",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "79",
      "productId": 11,
      "userId": "33093476",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "80",
      "productId": "35",
      "userId": "dd1b59d3",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "81",
      "productId": "93",
      "userId": "4e08860e",
      "rating": 3,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "82",
      "productId": "61",
      "userId": "0ef6",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "83",
      "productId": "2",
      "userId": "0656",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "84",
      "productId": "75",
      "userId": "dd1b59d3",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "85",
      "productId": "58",
      "userId": "40d647e1",
      "rating": 4,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "86",
      "productId": "62",
      "userId": "5",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "87",
      "productId": 9,
      "userId": "3f221874",
      "rating": 5,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "88",
      "productId": "58",
      "userId": "8bb44279",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "89",
      "productId": "29",
      "userId": "1873fcf2",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "90",
      "productId": "73",
      "userId": "33093476",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "91",
      "productId": "88",
      "userId": "8ad5a19b",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "92",
      "productId": "52",
      "userId": "8ba993de",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "93",
      "productId": "49",
      "userId": "c1d256a6",
      "rating": 5,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "94",
      "productId": "63",
      "userId": "0656",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "95",
      "productId": "41",
      "userId": "9e35",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "96",
      "productId": "18",
      "userId": "4",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "97",
      "productId": "7",
      "userId": "22a7045f",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "98",
      "productId": "42",
      "userId": "1",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "99",
      "productId": "34",
      "userId": "2",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "100",
      "productId": "21",
      "userId": "e3ea020d",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "101",
      "productId": "62",
      "userId": "eb8e",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "102",
      "productId": "79",
      "userId": "c1eea0f9",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "103",
      "productId": "20",
      "userId": "a0e2b217",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "104",
      "productId": "33",
      "userId": "1873fcf2",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "105",
      "productId": "39",
      "userId": "4c521cc5",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "106",
      "productId": "13",
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "107",
      "productId": "65",
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "108",
      "productId": "75",
      "userId": "9aa1",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "109",
      "productId": "41",
      "userId": "5",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "110",
      "productId": 9,
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "111",
      "productId": "91",
      "userId": "1873fcf2",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "112",
      "productId": "45",
      "userId": "7bdc604f",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "113",
      "productId": "55",
      "userId": "2",
      "rating": 5,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "114",
      "productId": "54",
      "userId": "9aa1",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "115",
      "productId": 9,
      "userId": "de5616c0",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "116",
      "productId": "66",
      "userId": "9e35",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "117",
      "productId": "62",
      "userId": "0656",
      "rating": 4,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "118",
      "productId": "82",
      "userId": "47abea9e",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "119",
      "productId": "44",
      "userId": "a2950594",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "120",
      "productId": "41",
      "userId": "22a7045f",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "121",
      "productId": "33",
      "userId": "3",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "122",
      "productId": "91",
      "userId": "d3cd2237",
      "rating": 3,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "123",
      "productId": "97",
      "userId": "02fc25d3",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "124",
      "productId": "62",
      "userId": "7bdc604f",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "125",
      "productId": "100",
      "userId": "a6b36a71",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "126",
      "productId": "77",
      "userId": "e3ea020d",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "127",
      "productId": "82",
      "userId": "5036ebf7",
      "rating": 4,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "128",
      "productId": "18",
      "userId": "e3ea020d",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "129",
      "productId": "64",
      "userId": "4e08860e",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "130",
      "productId": "17",
      "userId": "5",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "131",
      "productId": "62",
      "userId": "8bb44279",
      "rating": 5,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "132",
      "productId": 9,
      "userId": "5036ebf7",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "133",
      "productId": "48",
      "userId": "4e08860e",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "134",
      "productId": "58",
      "userId": "6",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "135",
      "productId": "7",
      "userId": "bbc76ff1",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "136",
      "productId": "83",
      "userId": "4467efdc",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "137",
      "productId": "93",
      "userId": "4e08860e",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "138",
      "productId": "75",
      "userId": "0ef6",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "139",
      "productId": "6",
      "userId": "d3cd2237",
      "rating": 3,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "140",
      "productId": "26",
      "userId": "40d647e1",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "141",
      "productId": "54",
      "userId": "4467efdc",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "142",
      "productId": "100",
      "userId": "a2950594",
      "rating": 3,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "143",
      "productId": "87",
      "userId": "de5616c0",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "144",
      "productId": "6",
      "userId": "5036ebf7",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "145",
      "productId": "36",
      "userId": "5036ebf7",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "146",
      "productId": "53",
      "userId": "4c521cc5",
      "rating": 3,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "147",
      "productId": "14",
      "userId": "0ef6",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "148",
      "productId": "55",
      "userId": "c1eea0f9",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "149",
      "productId": "35",
      "userId": "33093476",
      "rating": 5,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "150",
      "productId": "95",
      "userId": "de5616c0",
      "rating": 5,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "151",
      "productId": "1",
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "152",
      "productId": "80",
      "userId": "c1eea0f9",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "153",
      "productId": "80",
      "userId": "a6b36a71",
      "rating": 4,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "154",
      "productId": "82",
      "userId": "eeaec814",
      "rating": 3,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "155",
      "productId": 9,
      "userId": "9aa1",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "156",
      "productId": "91",
      "userId": "8ad5a19b",
      "rating": 5,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "157",
      "productId": "49",
      "userId": "8ad5a19b",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "158",
      "productId": "42",
      "userId": "1",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "159",
      "productId": "40",
      "userId": "bbc76ff1",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "160",
      "productId": "54",
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "161",
      "productId": "28",
      "userId": "4e08860e",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "162",
      "productId": "18",
      "userId": "4467efdc",
      "rating": 4,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "163",
      "productId": "60",
      "userId": "1",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "164",
      "productId": "16",
      "userId": "3f221874",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "165",
      "productId": "91",
      "userId": "02fc25d3",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "166",
      "productId": "38",
      "userId": "8bb44279",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "167",
      "productId": "45",
      "userId": "3",
      "rating": 5,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "168",
      "productId": "21",
      "userId": "0656",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "169",
      "productId": "39",
      "userId": "33093476",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "170",
      "productId": "42",
      "userId": "22a7045f",
      "rating": 4,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "171",
      "productId": "49",
      "userId": "7bdc604f",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "172",
      "productId": "84",
      "userId": "4467efdc",
      "rating": 5,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "173",
      "productId": "96",
      "userId": "22a7045f",
      "rating": 4,
      "comment": "מושלם! בדיוק כמו בתמונה"
    },
    {
      "id": "174",
      "productId": "86",
      "userId": "a2950594",
      "rating": 5,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "175",
      "productId": 11,
      "userId": "bbc76ff1",
      "rating": 4,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "176",
      "productId": "38",
      "userId": "4467efdc",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "177",
      "productId": "18",
      "userId": "4cdd3621",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "178",
      "productId": 11,
      "userId": "3",
      "rating": 4,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "179",
      "productId": "2",
      "userId": "a6b36a71",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "180",
      "productId": "103",
      "userId": "a2950594",
      "rating": 4,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "181",
      "productId": "74",
      "userId": "0656",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "182",
      "productId": "74",
      "userId": "5",
      "rating": 3,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "183",
      "productId": "82",
      "userId": "40d647e1",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "184",
      "productId": "85",
      "userId": "5cb0dccf",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "185",
      "productId": "64",
      "userId": "3",
      "rating": 3,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "186",
      "productId": "94",
      "userId": "eeaec814",
      "rating": 3,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "187",
      "productId": "93",
      "userId": "b017920c",
      "rating": 4,
      "comment": "קצת נבלו אחרי יום – מאכזב"
    },
    {
      "id": "188",
      "productId": "67",
      "userId": "a0e2b217",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "189",
      "productId": "80",
      "userId": "0656",
      "rating": 5,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "190",
      "productId": "53",
      "userId": "dd1b59d3",
      "rating": 5,
      "comment": "חוויית קניה נהדרת, ממליצה!"
    },
    {
      "id": "191",
      "productId": "88",
      "userId": "5cb0dccf",
      "rating": 4,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "192",
      "productId": "87",
      "userId": "a6b36a71",
      "rating": 3,
      "comment": "הגיע עטוף יפה מאוד, מתנה מקסימה"
    },
    {
      "id": "193",
      "productId": "88",
      "userId": "5036ebf7",
      "rating": 3,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "194",
      "productId": 11,
      "userId": "bbc76ff1",
      "rating": 5,
      "comment": "יפה מאוד, אבל קטן ממה שציפיתי"
    },
    {
      "id": "195",
      "productId": "78",
      "userId": "1873fcf2",
      "rating": 5,
      "comment": "פרח ריחני ונעים – אשמח להזמין שוב"
    },
    {
      "id": "196",
      "productId": "89",
      "userId": "3",
      "rating": 3,
      "comment": "הצבעים אפילו יותר יפים במציאות"
    },
    {
      "id": "197",
      "productId": "60",
      "userId": "4e08860e",
      "rating": 4,
      "comment": "שווה כל שקל!"
    },
    {
      "id": "198",
      "productId": "50",
      "userId": "c1d256a6",
      "rating": 3,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "199",
      "productId": "5",
      "userId": "4e08860e",
      "rating": 4,
      "comment": "לא מרוצה – הגיע באיחור"
    },
    {
      "id": "200",
      "productId": "91",
      "userId": "5",
      "rating": 4,
      "comment": "איכות מעולה ושירות מהיר"
    },
    {
      "id": "1569",
      "productId": "12",
      "userId": "guest-1768",
      "rating": 5,
      "comment": "צבע נדיררר"
    },
    {
      "id": "228a",
      "productId": "21",
      "userId": "guest-289",
      "rating": 4,
      "comment": "מהמם😊"
    },
    {
      "id": "d98f",
      "productId": "4342",
      "userId": "9aa1",
      "rating": 3,
      "comment": "חביב"
    },
    {
      "id": "d5bc",
      "productId": "6",
      "userId": "9aa1",
      "rating": 5,
      "comment": "מקשט לי את הבית כבר שנה!🤯😀"
    },
    {
      "id": "65b7",
      "productId": "9",
      "userId": "guest-4685",
      "rating": 5,
      "comment": "וואו וואו וואו המחותנים לא נשמווו"
    },
    {
      "id": "2f25",
      "productId": "24",
      "userId": "2",
      "rating": 5,
      "comment": "מרוצה עד הגג כל פעם מחדש!!"
    },
    {
      "id": "26bc",
      "productId": "75",
      "userId": "7a17",
      "rating": 5,
      "comment": "מהמם😊"
    },
    {
      "id": "ebd5",
      "productId": "24",
      "userId": "9aa1",
      "rating": 5,
      "comment": "אין דברים כאילה😍"
    }
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
