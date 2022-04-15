package com.devonfw.application.usermanagement.domain.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.usermanagement.domain.model.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, Long>, UserFragment {
  @Query("SELECT user FROM UserEntity user WHERE user.username = :username")
  UserEntity findByUsername(@Param("username") String username);
}
