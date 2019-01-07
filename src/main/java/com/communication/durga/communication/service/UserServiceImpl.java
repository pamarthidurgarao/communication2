package com.communication.durga.communication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.communication.durga.communication.dao.UserDao;
import com.communication.durga.communication.model.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;

	@Override
	public User create(User user) {
		return dao.save(user);
	}

	@Override
	public User update(User user) {
		return dao.save(user);
	}

	@Override
	public void delete(Long id) {
		User user = dao.findById(id).get();
		if (user != null) {
			dao.deleteById(id);
		}
	}

	@Override
	public List<User> getAll() {
		List<User> users = new ArrayList<>();
		dao.findAll().iterator().forEachRemaining(users::add);
		return users;
	}

	@Override
	public User getByEmail(String email) {
		return dao.findByEmail(email);
	}

	@Override
	public List<User> find(String match) {
		return dao.findByName(match);
	}

	@Override
	public User get(Long id) {
		return dao.findById(id) != null ? dao.findById(id).get() : null;
	}

}
