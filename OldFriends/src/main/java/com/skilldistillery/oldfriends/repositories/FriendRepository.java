package com.skilldistillery.oldfriends.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.oldfriends.entities.Friend;

public interface FriendRepository extends JpaRepository<Friend, Integer> {

}
