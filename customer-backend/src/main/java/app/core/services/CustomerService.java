package app.core.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Product;
import app.core.exceptions.CustomerException;
import app.core.repositories.ProductRepository;

@Service
@Transactional
public class CustomerService {
	
	@Autowired
	ProductRepository productRepository;
	
	
	public List<Product> getAllProducts() throws CustomerException {
		
		List<Product> productsList = productRepository.findAll();
		return productsList;
	}
	
	
	

}
