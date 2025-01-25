package com.skilldistillery.oldfriends.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.oldfriends.entities.Friend;
import com.skilldistillery.oldfriends.services.FriendService;

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

}
