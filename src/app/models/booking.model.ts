export enum BookingStatus{
    CONFIRM,
    PENDING
}
export class Booking {
    id:number;
    client:string;
    phone: string;
    email:string;
    persons:number;
    notes:string;
    date:string;
    dateCreation:string;
    status:BookingStatus

    constructor (id:number,client:string,phone:string,email:string,persons:number,notes:string,datetimeBooking:string,dateCreation:string,status:BookingStatus){
        this.id = id;
        this.client = client;
        this.phone = phone;
        this.email = email;
        this.persons = persons;
        this.notes = notes;
        this.date = datetimeBooking;
        this.dateCreation = dateCreation;
        this.status = status
    }
    get getStatus(){
        return this.status == BookingStatus.CONFIRM ? "Confirmada" : "Pendiente";
    }

}