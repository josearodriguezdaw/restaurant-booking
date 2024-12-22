export class Employee {
    uid:string;
    name:string;
    surname:string;
    email:string;
    role:string[];
    createdAt:string;

    constructor( uid: string, email: string, name: string, surname: string, role: string[], createdAt: string ) { 
        this.uid = uid; 
        this.email = email; 
        this.name = name; 
        this.surname = surname; 
        this.role = role; 
        this.createdAt = createdAt; 
    }
}