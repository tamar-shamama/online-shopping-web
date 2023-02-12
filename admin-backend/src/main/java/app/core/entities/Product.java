package app.core.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = {"tags", "image"})
@Entity
@EqualsAndHashCode(of = "code")
public class Product {
	
	@Id
	private int code;
	private String name;
	private double price;
	private String company;
	private String category;
	private String image;
	private double amount;
	
	
	@JsonIgnore
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable (
			name = "products_vs_tags",
			joinColumns = @JoinColumn(name = "product_code"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	public List<Tags> tags = new ArrayList<>();
	
	
	
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
