package com.accenture.ws.impl;

import com.accenture.ws.entity.CafeClerk;
import com.accenture.ws.entity.Order;
import com.accenture.ws.service.OrderBillService;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public class DiscountedBill extends OrderBill
{
	public DiscountedBill()
	{
		
	}
	
	@Override
	public double getTotalBill()
	{
		double totalBill = 0;
		double discountedBill;
		
		for (Order orders : getOrderList())
		{
			if (orders.isDiscounted() == true)
			{
				discountedBill = orders.getPrice() - (orders.getPrice() * orders.getIsDiscountPercentage());
			}
			else
			{
				discountedBill = orders.getPrice();
			}
			
			totalBill += discountedBill;
			totalBill = Math.round(totalBill * 100.0)/100.0;
			System.out.println("discounted: " + totalBill);
		}
		
		return totalBill;
	}
}
