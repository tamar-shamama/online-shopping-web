package app.core.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	
	@GetMapping("/get/cat")
	public List<Product> getAllProductsByCategory(String category) {
		
		try {
			return this.customerService.getProductsByCategory(category);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	@GetMapping("/get/comp")
	public List<Product> getAllProductsByCompany(String company) {
		
		try {
			return this.customerService.getProductsByCompany(company);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@GetMapping("/get/searchWord")
	public List<Product> getAllProductsBySearchWord(String word) {
		
		try {
			return this.customerService.getProductsBySearchword(word);
		} catch (CustomerException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}

}
