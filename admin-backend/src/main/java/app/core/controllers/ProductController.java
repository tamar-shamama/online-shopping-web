package app.core.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import app.core.entities.Product;
import app.core.entities.Tags;
import app.core.exceptions.AdminException;
import app.core.services.ProductService;

@RestController
@RequestMapping("/api/admin/product/")
@CrossOrigin (origins = "http://localhost:3000")

public class ProductController {
	
	@Autowired
	ProductService productService;
	
	
	@PostMapping("tag/{tagName}")
	public int createTag(@PathVariable String tagName) {
		
		Tags tag = new Tags(0, tagName, null);
		System.out.println("=======" + tag.toString());
		
		try {
			return productService.createTag(tag);
		} catch (AdminException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}
	
	
	@PostMapping("tag/{productCode}/{tagName}")
	public void addTagToProduct(@PathVariable int productCode,@PathVariable String tagName) {
		
		try {
			productService.addTagToProduct(productCode, tagName);
		} catch (AdminException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@PostMapping("tag/multiple/{productCode}")
	public void addMultipleTagsToProduct(@PathVariable int productCode, @RequestBody List<String> tagsNames) {
		
		try {
			productService.addMultipleTagsToProduct(productCode, tagsNames);
		} catch (AdminException e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
		}
	}
	
	
	@PostMapping("create")
	public int createNewProduct(@RequestBody Product product) {
		
		try {
			int code = productService.createNewProduct(product);
			return code;
		} catch (AdminException e) {
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
		}
	}

}
