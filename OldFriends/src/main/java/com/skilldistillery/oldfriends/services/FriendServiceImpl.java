package com.skilldistillery.oldfriends.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.oldfriends.entities.Friend;
import com.skilldistillery.oldfriends.repositories.FriendRepository;

@Service
public class FriendServiceImpl implements FriendService {
	
	@Autowired
	private FriendRepository friendRepo;

	@Override
	public List<Friend> findAll() {
		return friendRepo.findAll();
	}

	@Override
	public Friend findById(int friendId) {
		return friendRepo.findById(friendId);
	} 
 
	@Override 
	public Friend create(Friend newFriend) {
		
		return null;
	}

	@Override
	public Friend update(int friendId, Friend friend) {
		
		return null;
	}

	@Override
	public boolean deleteById(int friendId) {
		
		return false;
	}

}
