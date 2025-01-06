import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/person.service';
import { CommonModule } from '@angular/common';
import { Person } from '../../../models/person.model';
import { AuthService } from '../../../services/auth.service';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user:Person|null = null;

  constructor(private authService:AuthService){}

  ngOnInit(): void {
    this.authService.getUserDataAuth().subscribe(({user,person})=>{
      this.user = person;
    })
  }


}
