export class ProductModel {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;

  constructor(
    id: string | number,
    name: string,
    category: string,
    price: number,
    image: string
  ) {
    this.id = id.toString(); // תמיד string באפליקציה
    this.name = name;
    this.category = category;
    this.price = price;
    this.image = image;
  }
}
