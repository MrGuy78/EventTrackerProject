import { OldFriendService } from './../../services/old-friend.service';
import { OldFriends } from './../../models/old-friends';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  oldFriends: OldFriends[] = [];

  constructor(
    private oldFriendService: OldFriendService,
  ) {}

  ngOnInit(): void {
    this.loadOldFriends();
  }

    loadOldFriends(): void {
      this.oldFriendService.index().subscribe( {
        next: (friendList) => {
          this.oldFriends = friendList;
        },
        error: (someError) => {
          console.error('HomeComponent.loadOldFriends: error');
          console.error(someError);

        },
      } );
    }

}
