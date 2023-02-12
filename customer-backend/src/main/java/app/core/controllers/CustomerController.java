package app.core.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Product;
import app.core.exceptions.CustomerException;
import app.core.services.CustomerService;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin (origins = "http://localhost:3000")

public class CustomerController {
	
	@Autowired
	CustomerService customerService;
	
	
	@GetMapping("/get/all")
	public List<Product> getAllProducts() {
		
		try {
			return this.customerService.getAllProducts();
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@GetMapping("/get/cat/{category}")
	public List<Product> getAllProductsByCategory(@PathVariable String category) {
		
		try {
			return this.customerService.getProductsByCategory(category);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/get/comp/{company}")
	public List<Product> getAllProductsByCompany(@PathVariable String company) {
		
		try {
			return this.customerService.getProductsByCompany(company);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@GetMapping("/get/searchWord/{word}")
	public List<Product> getAllProductsBySearchWord(@PathVariable String word) {
		
		try {
			return this.customerService.getProductsBySearchword(word);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@GetMapping("/categories")
	public List<String> getAllCategories() {
		return customerService.getAllCategories();
	}
	
	@GetMapping("/companies")
	public List<String> getAllCompanies() {
		return customerService.getAllCompanies();
	}

}
