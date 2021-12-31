package com.devonfw.application.usermanagement.common.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.usermanagement.common.to.UserRoleEto;
import com.devonfw.application.usermanagement.dataaccess.UserRoleEntity;

@Mapper(componentModel = "cdi")
public interface UserRoleMapper {
  UserRoleEto map(UserRoleEntity model);

  UserRoleEntity map(UserRoleEto dto);

  List<UserRoleEto> map(List<UserRoleEntity> Products);

  default Page<UserRoleEto> map(Page<UserRoleEntity> users) {

    List<UserRoleEto> userEtos = this.map(users.getContent());
    return new PageImpl<>(userEtos, users.getPageable(), users.getTotalElements());
  }
}