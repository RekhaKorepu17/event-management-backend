export class User {
    username: string;
    password: string;
    email: string;
    mobile: number;
    role: string
    constructor(username: string, password: string, email: string, mobile:number, role: string){
       this.username= username;
       this.password= password;
       this.email= email;
       this.mobile= mobile;
       this.role= role
    } 
}