export class ProductModel { 
  id!: number;
  name!: string;
  category!: string;
  price!: number;
  image!: string;

  constructor() {
  this.id = 0
  this.name = ''
  this.category = ''
  this.price = 0
  this.image = ''
  }

}