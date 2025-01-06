import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService } from '../../../services/person.service';
import { UserCredential } from '@angular/fire/auth';
import { Person } from '../../../models/person.model';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,HeaderComponent,FooterComponent],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})
export class SinginComponent {

  registerForm:FormGroup;
  singinErrros:string|null=null;
  constructor(formBuilder:FormBuilder,private authService:AuthService, private router:Router, private userService:UserService){
    this.registerForm = formBuilder.group({
      'name': ['', [Validators.required]],
      'surname': ['', [Validators.required]],
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required]]
    });
  }
  register(){
    this.singinErrros=null;
    if(this.registerForm.valid){
      let name = this.registerForm.get("name")?.value;
      let surname = this.registerForm.get("surname")?.value;
      let email = this.registerForm.get("email")?.value;
      let password = this.registerForm.get("password")?.value;
      let employee = new Person("",email,name,surname,["user","admin"],new Date().toLocaleDateString())
      this.authService.register(employee,password)
      .then((userCredentials:UserCredential)=>{
        this.userService.saveUser(employee).then(()=>{

          employee.uid = userCredentials.user.uid;

          this.userService.saveUser(employee);
        }).then(()=>{
          this.router.navigate(["/home"]);
        }).catch(()=>{
          this.singinErrros="Se ha producido un error al guardar la información del usuario."
        });
      }).catch(()=>{
        this.singinErrros="Se ha producido un error al realizar el registro."
      });
    }
  }
}
