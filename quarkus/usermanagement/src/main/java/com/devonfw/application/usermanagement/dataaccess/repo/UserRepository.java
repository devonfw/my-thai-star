package com.devonfw.application.usermanagement.dataaccess.repo;

import org.springframework.data.repository.CrudRepository;

import com.devonfw.application.usermanagement.dataaccess.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long>, UserFragment {

}
