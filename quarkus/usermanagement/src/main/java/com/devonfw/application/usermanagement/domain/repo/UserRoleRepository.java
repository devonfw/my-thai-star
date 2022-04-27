package com.devonfw.application.usermanagement.domain.repo;

import org.springframework.data.repository.CrudRepository;

import com.devonfw.application.usermanagement.domain.model.UserRoleEntity;

public interface UserRoleRepository extends CrudRepository<UserRoleEntity, Long>, UserRoleFragment {

}
