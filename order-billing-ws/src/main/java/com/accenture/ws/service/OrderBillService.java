package com.accenture.ws.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.accenture.ws.repository.OrderRepository;

import net.bytebuddy.asm.MemberSubstitution.Substitution.Stubbing;

import com.accenture.ws.entity.CafeClerk;
import com.accenture.ws.entity.Order;
import com.accenture.ws.exception.OrderException;
import com.accenture.ws.impl.DiscountedBill;
import com.accenture.ws.impl.RegularBill;

import java.util.List;

@Service
public class OrderBillService 
{
	@Autowired
	private OrderRepository repository;
	
	private CafeClerk clerk;
	private List<Order> setOrderList;
	
	public CafeClerk getClerk() 
	{
		return clerk;
	}

	public List<Order> getOrders()
	{
		return repository.findAll();
	}
	
	public Order addOrder(Order order)
	{	
		System.out.println("ADD");
		return repository.save(order);
	}
	
	public void deleteOrder(int id)
	{
		repository.findById(id)
		.orElseThrow(() -> new OrderException("Order does not exist."));
		
		repository.deleteById(id);
	}
	
	public Order updateOrder(Order order)
	{
		repository.findById(order.getId())
		.orElseThrow(() -> new OrderException(
		"Order wiht id = " + 
		order.getId() + 
		"does not exist."));
		
		return repository.save(order);
	}
	
	public Order findOrderById(int id)
	{
		return repository.findOrderById(id);
	}
	
	/*public DiscountedBill getTotalDiscountedBill(DiscountedBill discountBill)
	{
		discountBill.setOrderList(getOrders());
		
		return discountBill;
	}*/
}
