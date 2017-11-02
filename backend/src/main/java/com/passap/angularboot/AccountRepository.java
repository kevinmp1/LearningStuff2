package com.passap.angularboot;

import com.passap.angularboot.Accounts;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AccountRepository extends CrudRepository<Accounts, Long>{
	
	public List<Accounts> findByCompanyContainingIgnoreCase(String company);
}
