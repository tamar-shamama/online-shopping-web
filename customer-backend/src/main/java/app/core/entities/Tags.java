package app.core.entities;


import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
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

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @ToString(exclude = "products")
@EqualsAndHashCode(of = "id")


public class Tags {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String tagName;
	
	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable (
			name = "products_vs_tags",
			joinColumns = @JoinColumn(name = "tag_id"),
			inverseJoinColumns = @JoinColumn(name = "product_code"))
	@JsonIgnore
	public List<Product> products;
	
	
//	@JsonIgnore
//	private List<String> commonMisspells;
//	
//	
//	public void addMisspelledVariants(String... variants) {
//		
//		for (int i = 0; i < variants.length; i++) {
//			commonMisspells.add(variants[i]);
//		}
//	}
//	
//	public void removeMisspelledVariants(String... variants) {
//		
//		for (int i = 0; i < variants.length; i++) {
//			
//			if (commonMisspells.contains(variants[i])) {
//				commonMisspells.remove(variants[i]);
//			}
//		}
//	}

}
