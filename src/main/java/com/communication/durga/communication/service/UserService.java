package com.communication.durga.communication.service;

import java.util.List;

import com.communication.durga.communication.model.User;

public interface UserService {

	public User create(User user);

	public User update(User user);

	public List<User> find(String match);

	public User getByEmail(String email);

	public void delete(Long id);
	
	public User get(Long id);

	public List<User> getAll();

}
