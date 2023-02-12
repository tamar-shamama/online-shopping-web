package app.core.services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.core.entities.Product;
import app.core.entities.Tags;
import app.core.exceptions.AdminException;
import app.core.repositories.ProductRepository;
import app.core.repositories.TagsRepository;

@Service @Transactional
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	@Autowired
	TagsRepository tagsRepository;
	
	
	
	
	public int createTag(Tags tag) throws AdminException {
		
		if (tagsRepository.existsByTagName(tag.getTagName())) {
			throw new AdminException("createTag faild - allready exists");
		}
		tagsRepository.save(tag);
		return tag.getId();
	}
	
	
	
	public void addTagToProduct(int productCode, String tagName) throws AdminException {
		
		if (productRepository.existsById(productCode)) {
			
			// create/get the tag
			Tags tag;
			
			if (tagsRepository.existsByTagName(tagName)) {
				tag = tagsRepository.findByTagName(tagName);
			
			} else {
				tag = new Tags(0, tagName, null);
				this.createTag(tag);
			}
			
			
			// add tag to product
			Product product = productRepository.findById(productCode).get();
			List<Tags> tags = product.getTags();
			
			if (tags.contains(tag)) {
				throw new AdminException("addTagToProduct faild - tag allready exists");
			} else {
				tags.add(tag);
				product.setTags(tags);
				productRepository.save(product);
			}
			
			
		} else {
			throw new AdminException("addTagToProduct faild - product " + productCode + " not found");
		}
	}
	
	
	
	public void addMultipleTagsToProduct(int productCode, List<String> tagsNames) throws AdminException {
		
		for (int i = 0; i < tagsNames.size(); i++) {
			this.addTagToProduct(productCode, tagsNames.get(i));
		}
	}
	
	
	public int createNewProduct(Product product) throws AdminException {
		
		if (productRepository.existsById(product.getCode())) {
			throw new AdminException("createNewProduct failed - code must be unique");
		}
		if (productRepository.existsByName(product.getName())) {
			throw new AdminException("createNewProduct failed - name must be unique");
		}
		if (product.getPrice() == 0 | product.getCompany() == null) {
			throw new AdminException("createNewProduct failed - price and company must be filled");
		}
		productRepository.save(product);
		return product.getCode();
	}
	
	
	
	public void deleteProduct(int code) throws AdminException {
		
		if (productRepository.existsById(code)) {
			Product product = productRepository.getById(code);
			productRepository.delete(product);
			
		} else {
			throw new AdminException("deleteProduct failed - code " + code + " not found");
		}
	}
	
	
	public void updateProduct(Product product) throws AdminException {
		
		if (!productRepository.existsById(product.getCode())) {
			throw new AdminException("updateProduct faild - product " + product.getCode() + " not found");
		}
		
		productRepository.save(product);
	}
	
	
	/** returns a list of all existing products
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getAllProducts() throws AdminException {
		
		List<Product> productsList = productRepository.findAll();
		return productsList;
	}
	
	
	/** returns a list of products from given String category
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getProductsByCategory(String cat)throws AdminException {
		
		List<Product> productsList = productRepository.findAll();
		List<Product> productsListByCat = new ArrayList<>();
		
		for (int i = 0; i < productsList.size(); i++) {
			
			Product p = productsList.get(i);
			if (p.getCategory().equals(cat)) {
				productsListByCat.add(p);
			}
		}
		return productsListByCat;
	}
	
	
	/** returns a list of products from given String company
	 * @return List<Product>
	 * @throws CustomerException
	 */
	public List<Product> getProductsByCompany(String comp)throws AdminException {
		
		List<Product> productsList = productRepository.findAll();
		List<Product> productsListBycomp = new ArrayList<>();
		
		for (int i = 0; i < productsList.size(); i++) {
			
			Product p = productsList.get(i);
			if (p.getCompany().equals(comp)) {
				productsListBycomp.add(p);
			}
		}
		return productsListBycomp;
	}

}
