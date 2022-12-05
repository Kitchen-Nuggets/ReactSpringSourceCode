package com.accenture.ws.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class OrderException extends RuntimeException
{
	public OrderException()
	{
		
	}
	
	public OrderException(String message)
	{
		super(message);
	}
}
