package app.core.services;

import java.util.HashMap;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Customer;
import app.core.entities.Product;
import app.core.entities.Receipt;
import app.core.repositories.CustomerRepository;
import app.core.repositories.ProductRepository;
import app.core.repositories.ReceiptRepository;

@Service
@Transactional
public class ShoppingListService {
	
	@Autowired
	CustomerRepository customerRepository;
	@Autowired
	ReceiptRepository receiptRepository;
	
	
	
	
	/** receives a shopping list from the user (a map of product and amount) and saves it to the DB.
	 * @param shoppingList
	 * @param customerId
	 */
	public void saveCustomerShoppingList(Map<Integer, Product> shoppingList, int customerId) {
		
		Customer customer = customerRepository.findById(customerId).get();
		
		Receipt receipt = new Receipt(shoppingList, customer);
		System.out.println(receipt.toString());
		receiptRepository.save(receipt);
		
	}
	
	

}
