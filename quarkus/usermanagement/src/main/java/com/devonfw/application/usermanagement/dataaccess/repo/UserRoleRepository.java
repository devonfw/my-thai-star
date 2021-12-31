package com.devonfw.application.usermanagement.dataaccess.repo;

import org.springframework.data.repository.CrudRepository;

import com.devonfw.application.usermanagement.dataaccess.UserRoleEntity;

public interface UserRoleRepository extends CrudRepository<UserRoleEntity, Long>, UserRoleFragment {

}
