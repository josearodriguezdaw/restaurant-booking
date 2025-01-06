import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/person.service';

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
  roles:string[]|null = null;
  ngOnInit(): void {
    this.authService.getUserDataAuth().subscribe(({user,person})=>{

      if(user){
        this.isLoggedIn = true;
        if(person && person.email && person.roles){
          this.roles = person.roles;
        }
      }else{
        this.isLoggedIn=false;
      }
    })
  }

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(["/"]);
    }).catch((error)=>{console.log(error)});;
  }
}
