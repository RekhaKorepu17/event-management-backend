export class User {
    username: string;
    password: string;
    email: string;
    mobile: number;
    isAdmin: boolean
    constructor(username: string, password: string, email: string, mobile:number, isAdmin: boolean){
       this.username= username;
       this.password= password;
       this.email= email;
       this.mobile= mobile;
       this.isAdmin= isAdmin
    } 
}