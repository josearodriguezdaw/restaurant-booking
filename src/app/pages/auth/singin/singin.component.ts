import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../../../components/footer/footer.component';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-singin',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule,HeaderComponent,FooterComponent],
  templateUrl: './singin.component.html',
  styleUrl: './singin.component.css'
})
export class SinginComponent {

  registerForm:FormGroup;

  constructor(formBuilder:FormBuilder,private authService:AuthService, private router:Router){
    this.registerForm = formBuilder.group({
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required]]
    });
  }
  register(){
    if(this.registerForm.valid){
      let email = this.registerForm.get("email")?.value;
      let password = this.registerForm.get("password")?.value;
      this.authService.register({email,password})
      .then(()=>{
        this.router.navigate(["/home"]);
      }).catch(error=>{
        console.log(error)
      });
    }
  }
}
