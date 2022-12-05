package com.accenture.ws.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="order_list")
public class Order
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;
	
	@Column(name = "order_name")
	private String orderName;
	
	@Column(name = "price")
	private double price;
	
	@Column(name = "discounted")
	private boolean isDiscounted;
	
	@Column(name = "discount_percent")
	private double isDiscountPercentage = 0.05;
	
	public Order()
	{
		
	}

	public Order(String orderName, double price, boolean isDiscounted) 
	{
		this.orderName = orderName;
		this.price = price;
		this.isDiscounted = isDiscounted;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrderName() {
		return orderName;
	}

	public void setOrderName(String orderName) {
		this.orderName = orderName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public boolean isDiscounted() {
		System.out.println("DSICOUNTED");
		return isDiscounted;
	}

	public void setDiscounted(boolean isDiscounted) {
		this.isDiscounted = isDiscounted;
	}

	public double getIsDiscountPercentage() {
		return isDiscountPercentage;
	}
}
