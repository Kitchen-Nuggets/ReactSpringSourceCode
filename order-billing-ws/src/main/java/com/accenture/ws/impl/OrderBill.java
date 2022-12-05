package com.accenture.ws.impl;

import java.util.List;

import com.accenture.ws.entity.CafeClerk;
import com.accenture.ws.entity.Order;

public abstract class OrderBill 
{
	private List<Order> orderList;
	
	private CafeClerk clerk;

	public OrderBill() 
	{
		
	}

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}
	
	public CafeClerk getClerk() {
		return clerk;
	}
	
	public double getTotalBill()
	{
		return 0;
	}
}
