export class ReviewModel { 
    id!: string;
    productId!: string;
    userId!: string;
    rating!: number;
    comment!: string;

  constructor() {
  this.id = ''
  this.productId = ''
  this.userId = ''
  this.rating = 0
  this.comment = ''
  }

}