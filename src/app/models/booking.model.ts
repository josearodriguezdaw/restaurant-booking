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
    date:Date;
    dateCreation:Date;
    status:BookingStatus

    constructor (id:number,client:string,phone:string,email:string,persons:number,notes:string,datetimeBooking:Date,dateCreation:Date,status:BookingStatus){
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
    getDateForm():string{
        let day = this.date.getDate().toString().padStart(2, '0');;
        let month = (this.date.getMonth()+1).toString().padStart(2, '0');;
        let year = this.date.getFullYear();
        let hour = this.date.getHours().toString().padStart(2, '0');
        let minutes = this.date.getMinutes().toString().padStart(2, '0');;

        return `${year}-${month}-${day}T${hour}:${minutes}`
    }
}