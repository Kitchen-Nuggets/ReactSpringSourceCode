package com.accenture.ws.impl;

import com.accenture.ws.entity.CafeClerk;
import com.accenture.ws.entity.Order;
import com.accenture.ws.service.OrderBillService;

public class RegularBill extends OrderBill
{
	public RegularBill()
	{
		
	}
	
	@Override
	public double getTotalBill()
	{
		double totalBill = 0;
		
		for (Order orders : getOrderList())
		{
			totalBill += orders.getPrice();
			System.out.println("regular: " +totalBill);
			
			totalBill = Math.round(totalBill * 100.0)/100.0;
		}
		
		return totalBill;
	}
}
