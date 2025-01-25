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
		friendRepo.saveAndFlush(newFriend);
		return newFriend;
	}

	@Override
	public Friend update(int friendId, Friend updatingFriend) {
		Friend managedFriend = friendRepo.findById(friendId);
		if (managedFriend != null) {
			managedFriend.setName(updatingFriend.getName());
			managedFriend.setType(updatingFriend.getType());
			managedFriend.setDescription(updatingFriend.getDescription());
			managedFriend.setArrivalDate(updatingFriend.getArrivalDate());
			managedFriend.setDepartDate(updatingFriend.getDepartDate());
			managedFriend.setImageUrl(updatingFriend.getImageUrl());
		} 
		return managedFriend;
	}

	@Override
	public boolean deleteById(int friendId) {
		boolean deleted = false;
		Friend toBeDeleted = friendRepo.findById(friendId);
		if (toBeDeleted != null) {
			friendRepo.deleteById(friendId);
			deleted = true;
		}
		return deleted;
	}

}
