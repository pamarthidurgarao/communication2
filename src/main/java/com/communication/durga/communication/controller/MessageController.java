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

import com.communication.durga.communication.model.Message;
import com.communication.durga.communication.service.MessageService;

@RestController
@RequestMapping("/api/v1/message")
public class MessageController {

	@Autowired
	private MessageService messageService;

	@GetMapping
	public List<Message> getAll() {
		return messageService.getAll();
	}

	@GetMapping("find/fromId/{fromId}/toId/{toId}")
	public List<Message> find(@PathVariable("fromId") Long fromId, @PathVariable("toId") Long toId) {
		return messageService.getConversation(fromId, toId);
	}
	
	@GetMapping("find")
	public List<Message> findMessages(@RequestParam Long id) {
		return messageService.find(id);
	}

	@PostMapping
	public Message create(@RequestBody Message message) {
		return messageService.create(message);
	}

	@DeleteMapping
	public void delete(@RequestParam Long id) {
		messageService.delete(id);
	}

	@GetMapping("recent/{fromId}")
	public List<Message> getRecentMessage(@PathVariable("fromId") Long fromId) {
		return messageService.getResentMessages(fromId);
	}
}
