package com.communication.durga.communication.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.communication.durga.communication.dao.MessageDao;
import com.communication.durga.communication.model.Message;
 
@Service
public class MessageServiceImpl implements MessageService {

	@Autowired
	private MessageDao dao;

	@Override
	public Message create(Message message) {
		return dao.save(message);
	}

	@Override
	public Message update(Message message) {
		return dao.save(message);
	}

	@Override
	public Message getByEmail(String email) {
		return null;
	}

	@Override
	public void delete(Long id) {
		Message message = dao.findById(id).get();
		if (message != null) {
			dao.deleteById(id);
		}
	}

	@Override
	public List<Message> getAll() {
		List<Message> msgs = new ArrayList<>();
		dao.findAll().iterator().forEachRemaining(msgs::add);
		return msgs;
	}

	@Override
	public List<Message> getResentMessages(Long userId) {
		return dao.findDistinctByIdNotIn(userId);
	}

	@Override
	public List<Message> getConversation(Long fromId, Long toId) {
		return dao.findByFromIdAndToId(fromId, toId);
	}

	@Override
	public List<Message> find(Long Id) {
		return dao.find(Id);
	}

}
