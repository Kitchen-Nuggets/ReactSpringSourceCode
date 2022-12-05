package com.accenture.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.accenture.ws.entity.CafeClerk;
import com.accenture.ws.entity.Order;
import com.accenture.ws.impl.DiscountedBill;
import com.accenture.ws.impl.RegularBill;
import com.accenture.ws.service.OrderBillService;

@RestController
@RequestMapping("api")
@CrossOrigin("http://localhost:9090/")
public class OrderAndBIllingController 
{
	@Autowired
	private OrderBillService service;
	
	private List<Order> setOrderList;
	/*private DiscountedBill discountedBill;*/

	@GetMapping("")
	public String test()
	{
		return "test";
	}
	
	@GetMapping("/orderList")
	public List<Order> getOrders()
	{
		return service.getOrders();
	}
	
	@PostMapping("/add")
	public Order createOrder(@RequestBody Order order)
	{
		return service.addOrder(order);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteOrder(@PathVariable(value="id") int id)
	{
		service.deleteOrder(id);
	}
	
	@PutMapping("update")
	public Order updateOrder(@RequestBody Order order)
	{
		return service.updateOrder(order);
	}
	
	@GetMapping("orderId/{id}")
	public Order getOrderIdUpdate(@PathVariable int id)
	{
		return service.findOrderById(id);
	}
	
	@GetMapping("/regularBill")
	public double getRegularBill()
	{
		return getTotalRegularBill();
	}
	
	@GetMapping("/discountedBill")
	public double getDiscountedBill()
	{
		return getTotalDiscountedBill();
	}
	
	@GetMapping("/clerk")
	public CafeClerk cafeClerk()
	{
		return getClerk();
	}
	
	@GetMapping("/discount")
	public Boolean getBoolValue(Order order)
	{
		return getDiscountValue();
	}
	
	public double getTotalRegularBill()
	{
		RegularBill regularBill = new RegularBill();
		regularBill.setOrderList(getOrders());
		
		return regularBill.getTotalBill();
	}
	
	/*public DiscountedBill getTotalDiscountedBill()
	{
		DiscountedBill discountedBill = new DiscountedBill();
		discountedBill.setOrderList(getOrders());
		
		return discountedBill;
	}*/
	
	public double getTotalDiscountedBill()
	{
		DiscountedBill discountedBill = new DiscountedBill();
		discountedBill.setOrderList(getOrders());
		
		return discountedBill.getTotalBill();
	}
	
	public CafeClerk getClerk()
	{
		CafeClerk clerk = new CafeClerk();
		
		return clerk;
	}
	
	public Boolean getDiscountValue()
	{
		Order order = new Order();
		order.isDiscounted();
		
		return order.isDiscounted();
	}
}
