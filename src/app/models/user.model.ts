export class Employee {
    uid:string;
    name:string;
    surname:string;
    email:string;
    roles:string[];
    createdAt:string;

    constructor( uid: string, email: string, name: string, surname: string, roles: string[], createdAt: string ) { 
        this.uid = uid; 
        this.email = email; 
        this.name = name; 
        this.surname = surname; 
        this.roles = roles; 
        this.createdAt = createdAt; 
    }
}