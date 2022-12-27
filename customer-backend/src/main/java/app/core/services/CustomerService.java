package app.core.services;

import java.util.ArrayList;
import java.util.Iterator;
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
	
	
	
	
	
	/** returns a list of all existing products
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getAllProducts() throws CustomerException {
		
		List<Product> productsList = productRepository.findAll();
		return productsList;
	}
	
	
	/** returns a list of products from given String category
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getProductsByCategory(String cat)throws CustomerException {
		
		List<Product> productsList = productRepository.findAll();
		List<Product> productsListByCat = new ArrayList<>();
		
		for (int i = 0; i < productsList.size(); i++) {
			
			Product p = productsList.get(i);
			if (p.category.equals(cat)) {
				productsListByCat.add(p);
			}
		}
		return productsListByCat;
	}
	
	
	/** returns a list of products from given String company
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getProductsByCompany(String comp)throws CustomerException {
		
		List<Product> productsList = productRepository.findAll();
		List<Product> productsListBycomp = new ArrayList<>();
		
		for (int i = 0; i < productsList.size(); i++) {
			
			Product p = productsList.get(i);
			if (p.company.equals(comp)) {
				productsListBycomp.add(p);
			}
		}
		return productsListBycomp;
	}
	
	
	
	/** returns a list of products from given String company
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getProductsBySearchword(String word)throws CustomerException {
		
		List<Product> productsList = productRepository.findAll();
		List<Product> productsListBySearchWord = new ArrayList<>();
		
		addByProductCode(word, productsList, productsListBySearchWord);
		
		addByName(word, productsList, productsListBySearchWord);
		
		addByTag(word, productsList, productsListBySearchWord);
		
		return productsListBySearchWord;
	}


	private void addByTag(String word, List<Product> productsList, List<Product> productsListBySearchWord) {
		
		List<Product> tagsMatchedList = productsList.stream().filter(p -> p.getTagsNames().contains(word)).toList();
		productsListBySearchWord.addAll(tagsMatchedList);
	}


	private void addByName(String word, List<Product> productsList, List<Product> productsListBySearchWord) {
		
		for (int i = 0; i < productsList.size(); i++) {
			
			Product p = productsList.get(i);
			if (p.getName().equals(word)) {
				productsListBySearchWord.add(productsList.get(i));
			}
		}
	}


	private void addByProductCode(String word, List<Product> productsList, List<Product> productsListBySearchWord) {
		
		for (int i = 0; i < productsList.size(); i++) {
			
			String code = String.valueOf(productsList.get(i).getCode());
			if (code.equals(word)) {
				productsListBySearchWord.add(productsList.get(i));
			}
		}
	}
	

}
