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

@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = {"tags"})
@Entity
@EqualsAndHashCode(of = "code")
public class Product {
	
	@Id
	public int code;
	public String name;
	public double price;
	public String company;
	public String category;
	public String image;
	public double amount;
	
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable (
			name = "products_vs_tags",
			joinColumns = @JoinColumn(name = "product_code"),
			inverseJoinColumns = @JoinColumn(name = "tag_id"))
	@JsonIgnore
	public List<Tags> tags;
	
	
	
	
	
	public List<String> getTagsNames() {
		
		List<String> t = new ArrayList<>();
		System.out.println("activated");
		
		if (!tags.isEmpty()) {
			
			for (int i = 0; i < tags.size(); i++) {
				String name =tags.get(i).getTagName();
				t.add(name);
			}
			return t;
		}
		return null;
		
	}
	
	
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
