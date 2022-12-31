package app.core.entities;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MapKey;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @EqualsAndHashCode(of = "id") @ToString(exclude = {"products", "customer"})
public class Receipt {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	public LocalDate date = LocalDate.now();
	public double totalPrice;
	
	// a map with amount of product as key and product as value
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable (
			name = "receipt_vs_product",
			joinColumns = @JoinColumn(name = "receipt_id"),
			inverseJoinColumns = @JoinColumn(name = "product_code"))
	@MapKey
	@JsonIgnore
	public Map<Integer, Product> products;
	
	
	@ManyToOne
	@JsonIgnore
	public Customer customer;
	
	
	
	public Receipt(Map<Integer, Product> products, Customer customer) {
		super();
		this.products = products;
		this.customer = customer;
	}
	
	
	public double getTotalPrice() {
		
		double total = 0;
		
		for (Map.Entry<Integer, Product> p : products.entrySet()) {
			total += p.getKey() * p.getValue().getPrice();
		}
		this.totalPrice = total;
		return total;
	}





	

}
