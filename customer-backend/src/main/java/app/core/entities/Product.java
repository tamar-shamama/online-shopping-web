package app.core.entities;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString
@Entity
public class Product {
	
	@Id
	public int code;
	public String name;
	public double price;
	public String company;
	public String category;
	public String image;
	public String[] tags;
	public double amount;
	
	
	public void buyByUnits() {
		this.amount = this.amount - 1;
	}
	
	public void buyByUnits(int numOfUnits) {
		this.amount = this.amount - numOfUnits;
	}
	
	public void buyByWeight(int weight) {
		this.amount = this.amount - weight;
	}
	

}
