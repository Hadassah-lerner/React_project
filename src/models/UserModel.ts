export class UserModel { 
       id!:string 
       name!:string
       email!:string
       password!:string
       role: userFromApi.role ?? 'customer',

  constructor() {
  this.id = ''
  this.name = ''
  this.email = ''
  this.password = ''
  role: userFromApi.role || 'customer',
  }

}
