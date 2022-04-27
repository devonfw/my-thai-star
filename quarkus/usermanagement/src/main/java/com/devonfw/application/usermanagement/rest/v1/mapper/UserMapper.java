package com.devonfw.application.usermanagement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.usermanagement.domain.model.UserEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserDto;

@Mapper(componentModel = "cdi")
public interface UserMapper {
  UserDto map(UserEntity model);

  UserEntity map(UserDto dto);

  List<UserDto> map(List<UserEntity> Products);

  default Page<UserDto> map(Page<UserEntity> products) {

    List<UserDto> productsDto = this.map(products.getContent());
    return new PageImpl<>(productsDto, products.getPageable(), products.getTotalElements());
  }
}