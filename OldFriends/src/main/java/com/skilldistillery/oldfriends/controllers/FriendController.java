package com.skilldistillery.oldfriends.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.oldfriends.entities.Friend;
import com.skilldistillery.oldfriends.services.FriendService;

@RestController
@RequestMapping("api")
public class FriendController {
	
	private FriendService friendServ;
	
	public List<Friend> listFriends() {
		return friendServ.findAll();
	}

}
