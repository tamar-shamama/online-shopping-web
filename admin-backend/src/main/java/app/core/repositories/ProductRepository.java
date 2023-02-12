package app.core.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import app.core.entities.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	
	List<Product> findAllByCompany (String company);
	List<Product> findAllByCategory (String category);
	List<Product> findAllByCompanyAndCategory (String company, String category);
	
	boolean existsByName(String name);
	

}
