import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '@angular/fire/auth';
import { UserService } from '../../../services/user.service';
import { Employee } from '../../../models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  
  constructor(private userService:UserService){}
  user:Employee|null = null;

  ngOnInit(): void {
    this.userService.getUserAuth().subscribe((user:Employee|null)=>{
      if(user!=null){
        this.user = user;
      }
    })
  }


}
