package app.core.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Product;
import app.core.exceptions.CustomerException;
import app.core.services.CustomerService;
import app.core.services.ShoppingListService;

@RestController
@RequestMapping("/api/customer/shoppingList")
@CrossOrigin (origins = "http://localhost:3000")

public class ShoppingListController {
	
	@Autowired
	CustomerService customerService;
	@Autowired
	ShoppingListService shoppingListService;
	
	
	@PostMapping("receipt")
	public void addReceipt(@RequestBody Map<Integer, Product> shoppingList) {
		
		try {
			this.shoppingListService.saveCustomerShoppingList(shoppingList, 1);
		} catch (Exception e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	
	// the json object of a map
//	{
//		  "2": {
//		    "amount": 0,
//		    "category": "string",
//		    "code": 101,
//		    "company": "string",
//		    "image": "string",
//		    "name": "string",
//		    "price": 0}
//		}
	
	
	
//	{
//		  "2": {
//		    "amount": 0,
//		    "category": "string",
//		    "code": 107,
//		    "company": "string",
//		    "image": "string",
//		    "name": "string",
//		    "price": 0}
//		}
	
	
	
	

}
