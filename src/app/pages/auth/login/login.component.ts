import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { UserService } from '../../../services/user.service';
import { UserCredential } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,HeaderComponent,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm:FormGroup;
  loginError:string|null=null;
  constructor(formBuilder:FormBuilder,private authService:AuthService, private router:Router,private userService:UserService){
    this.loginForm = formBuilder.group({
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  login(){
    if(this.loginForm.valid){
      this.loginError=null;
      let email = this.loginForm.get("email")?.value;
      let password = this.loginForm.get("password")?.value;
      this.authService.login({email,password})
      .then(()=>{
        this.router.navigate(["/home"]);
      }).catch(error=>{
        console.log(error.code)
        switch(error.code){
          case "auth/invalid-credential":
            this.loginError="Usuario o contraseña inválidos."
            break;
        }
      });
    }else{
      this.loginError="Introduzca una usuario o contraseña válidos"
    }
  }

  loginGoogle(){
    this.authService.loginGoogle().then((userCredential:UserCredential)=>{
      this.userService.createIfNotExist(userCredential).then(()=>{
        this.router.navigate(["/home"]);
      }).catch((error)=>{
        console.log(error)
        this.loginError="Error al guardar la información del usuario"
      });
    }).catch(error=>{
      switch(error.code){
        case "auth/invalid-credential":
          this.loginError="Usuario o contraseña inválidos."
          break;
      }
    });
  }


}
