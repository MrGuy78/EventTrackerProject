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

  selected: OldFriends | null = null;
  newFriend: OldFriends = new OldFriends();
  showCreateForm: boolean = false;
  editOldFriend: OldFriends | null = null;

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

    displayFriend(oldFriend: OldFriends) {
      console.log(oldFriend);
      this.selected = oldFriend;
    }

    displayTable() {
      this.selected = null;
    }

    addFriend(newFriend : OldFriends) {
      this.oldFriendService.create(newFriend).subscribe({
        next: (createdFriend) => {
          this.newFriend = new OldFriends();
          this.loadOldFriends();
        },
        error: (notTooFriendly) => {
          console.error('HomeComponent.addFriend: Error creating friend.')
          console.error(notTooFriendly);
        }
      })
    };

    setEditOldFriend() {
      this.editOldFriend = Object.assign({}, this.selected);
    }

    updateFriend(friend: OldFriends, setSelected: boolean = true) {
      this.oldFriendService.update(friend).subscribe({
        next: (updatedFriend) => {
        this.loadOldFriends();
        if (setSelected) {
          this.selected = updatedFriend;
        }
        this.editOldFriend = null;
      },
        error: (whatWentWrong) => {
          console.error('HomeComponent.updateFriend: Error updating friend');
          console.error(whatWentWrong);
        }
      });
      }
}
