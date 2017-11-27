package com.passap.angularboot;

import java.lang.Iterable;
import java.security.Principal;

import com.passap.angularboot.Accounts;
import com.passap.angularboot.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RestController
public class APIController {
	@Autowired
	private AccountRepository accountRepository;
	
	@GetMapping(path="/api/account/all")
	public Iterable<Accounts> getAllAccounts(){
		return accountRepository.findAll();
	}
	
	
	@RequestMapping(value= {"/api/accounts/","/api/accounts"}, method = RequestMethod.GET)
	public @ResponseBody Iterable<Accounts> getSearchResults(@RequestParam("company") String company){
		return accountRepository.findByCompanyContainingIgnoreCase(company);
	}
	
	@GetMapping(path="/api/account/{accountid}")
	public Accounts getAccount(@PathVariable("accountid") String accountid){
		return accountRepository.findOne(Long.parseLong(accountid));
	}
	
	@PutMapping(path="/api/account/{accountid}")
	public Accounts putAccount(@PathVariable("accountid") String accountid, @RequestBody Accounts account){
		Accounts update = accountRepository.findOne(Long.parseLong(accountid));
		update.setCompany(account.getCompany());
		update.setUsername(account.getUsername());
		update.setPassword(account.getPassword());
		return accountRepository.save(update);
	}
	
	@PostMapping(path="/api/account")
	public Accounts postAccount(@RequestBody Accounts account){
		return accountRepository.save(account);
	}
	
	@DeleteMapping(path="/api/account/{accountid}")
	public void deleteAccount(@PathVariable("accountid") String accountid){
		 accountRepository.delete(Long.parseLong(accountid));
	}
	
//	 @RequestMapping("/user")
//	  public Principal user(Principal user) {
//	    return user;
//	  }
}
