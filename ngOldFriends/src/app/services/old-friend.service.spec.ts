import { TestBed } from '@angular/core/testing';

import { OldFriendService } from './old-friend.service';

describe('OldFriendService', () => {
  let service: OldFriendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldFriendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
