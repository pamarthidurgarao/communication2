package com.communication.durga.communication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.communication.durga.communication.model.Message;

public interface MessageDao extends CrudRepository<Message, Long> {

	List<Message> findDistinctByIdNotIn(Long fromId);

	@Query("SELECT U FROM Message U WHERE (U.toId=?2 and U.fromId=?1) OR (U.toId=?1 and U.fromId=?2)")
	List<Message> findByFromIdAndToId(Long fromId, Long toId);
	
	@Query("SELECT U FROM Message U WHERE U.toId=?1 OR U.fromId=?1")
	List<Message> find(Long Id);

}
