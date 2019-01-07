package com.communication.durga.communication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.communication.durga.communication.model.User;
import com.communication.durga.communication.service.UserService;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> getAll() {
		return userService.getAll();
	}

	@GetMapping("mail/{email}")
	public User getByEmail(@PathVariable String email) {
		return userService.getByEmail(email);
	}
	
	@GetMapping("id/{id}")
	public User getById(@PathVariable Long id) {
		return userService.get(id);
	}
	@GetMapping("find")
	public List<User> find(@RequestParam String match) {
		return userService.find(match);
	}
	
	@DeleteMapping
	public void delete(@RequestParam Long id) {
		 userService.delete(id);
	}

	@PostMapping
	public User save(@RequestBody User user) {
		return userService.create(user);
	}
}
