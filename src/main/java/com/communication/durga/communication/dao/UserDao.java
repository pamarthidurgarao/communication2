package com.communication.durga.communication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.communication.durga.communication.model.User;

public interface UserDao extends CrudRepository<User, Long> {
	User findByEmail(String email);
	
	@Query("SELECT U FROM User U WHERE LOWER(U.email) LIKE LOWER(concat(?1, '%')) OR LOWER(U.firstName) LIKE LOWER(concat(?1, '%')) OR LOWER(U.lastName) LIKE LOWER(concat(?1, '%'))")
	List<User> findByName(String matchPhrase);
}
