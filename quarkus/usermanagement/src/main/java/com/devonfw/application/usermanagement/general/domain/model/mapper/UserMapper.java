package com.devonfw.application.usermanagement.common.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.usermanagement.common.to.UserEto;
import com.devonfw.application.usermanagement.dataaccess.UserEntity;

@Mapper(componentModel = "cdi")
public interface UserMapper {
  UserEto map(UserEntity model);

  UserEntity map(UserEto dto);

  List<UserEto> map(List<UserEntity> Products);

  default Page<UserEto> map(Page<UserEntity> products) {

    List<UserEto> productsDto = this.map(products.getContent());
    return new PageImpl<>(productsDto, products.getPageable(), products.getTotalElements());
  }
}