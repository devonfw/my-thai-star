package com.devonfw.application.usermanagement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.usermanagement.domain.model.UserRoleEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserRoleDto;

@Mapper(componentModel = "cdi")
public interface UserRoleMapper {
  UserRoleDto map(UserRoleEntity model);

  UserRoleEntity map(UserRoleDto dto);

  List<UserRoleDto> map(List<UserRoleEntity> Products);

  default Page<UserRoleDto> map(Page<UserRoleEntity> users) {

    List<UserRoleDto> userEtos = this.map(users.getContent());
    return new PageImpl<>(userEtos, users.getPageable(), users.getTotalElements());
  }
}