import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router){}

  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((authenticated) => {
      this.isLoggedIn = authenticated;
    });
  }

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(["/"]);
    }).catch((error)=>{console.log(error)});;
  }
}
