package com.devonfw.application.usermanagement.domain.repo;

import org.springframework.data.repository.CrudRepository;

import com.devonfw.application.usermanagement.domain.model.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long>, UserFragment {

}
