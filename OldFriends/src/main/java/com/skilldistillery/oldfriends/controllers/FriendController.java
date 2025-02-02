package com.skilldistillery.oldfriends.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.oldfriends.entities.Friend;
import com.skilldistillery.oldfriends.services.FriendService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api")
public class FriendController {
	
	@Autowired
	private FriendService friendServ;
	
	@GetMapping("oldFriends")
	public List<Friend> listFriends() {
		return friendServ.findAll();
	}
	
	@GetMapping("oldFriends/{friendId}")
	public Friend findById(@PathVariable("friendId") Integer friendId, HttpServletResponse resp) {
		Friend friend = friendServ.findById(friendId);
		if (friend == null) {
			resp.setStatus(404);
		}
		return friend;
	}
	
	@PostMapping(path = {"oldFriends", "oldFriends/"})
	public Friend addNewOldFriend(@RequestBody Friend newFriend,
			HttpServletResponse resp,
			HttpServletRequest requ) {
		try {
			newFriend = friendServ.create(newFriend);
			resp.setStatus(201);
			resp.setHeader("Location", requ.getRequestURL().append("/").append(newFriend.getId()).toString());
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			newFriend = null;
		}
		return newFriend;
	}
	
	@PutMapping("oldFriends/{friendId}")
	public Friend updateFriend(@PathVariable("friendId") Integer friendId, 
			@RequestBody Friend updatedFriend, HttpServletResponse resp) {
		try {
			updatedFriend = friendServ.update(friendId, updatedFriend);
			if (updatedFriend == null) {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
			updatedFriend = null;
		}
		return updatedFriend;
	}
	
	@DeleteMapping("oldFriends/{friendId}")
	public void deleteFriend(@PathVariable("friendId") Integer friendId, HttpServletResponse resp) {
		try {
			if (friendServ.deleteById(friendId)) {
				resp.setStatus(204);
			}
			else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}

}
