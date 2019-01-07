package com.communication.durga.communication.service;

import java.util.List;

import com.communication.durga.communication.model.Message;

public interface MessageService {

	public Message create(Message message);

	public Message update(Message message);

	public Message getByEmail(String email);

	public void delete(Long id);

	public List<Message> getAll();

	public List<Message> getConversation(Long fromId, Long toId);
	
	public List<Message> find(Long Id);

	public List<Message> getResentMessages(Long userId);

}
