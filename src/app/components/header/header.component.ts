import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { DataSnapshot } from '@angular/fire/database';
import { Employee } from '../../models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router,private userService:UserService){}

  isLoggedIn: boolean = false;
  role:string[]|null = null;
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
      if(authenticated){
        this.authService.getUser().then((user:User|null)=>{
          if(user!=null && user.email){
            this.userService.getUserById(user.uid).subscribe((data:Employee)=>{
              if(data!=null && data.uid !=null){
                this.role = data.roles;
              }
            });
          }
        });
      }
    });
  }

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(["/"]);
    }).catch((error)=>{console.log(error)});;
  }
}
