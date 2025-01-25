package com.skilldistillery.oldfriends.services;

import java.util.List;

import com.skilldistillery.oldfriends.entities.Friend;

public interface FriendService {
	List<Friend> findAll();
	Friend findById(int friendId);
	Friend create(Friend newFriend);
	Friend update(int friendId, Friend friend);
	boolean deleteById(int friendId);

}
