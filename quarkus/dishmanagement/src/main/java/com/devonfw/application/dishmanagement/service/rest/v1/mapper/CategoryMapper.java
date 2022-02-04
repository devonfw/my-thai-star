package com.devonfw.application.dishmanagement.service.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.dishmanagement.domain.model.CategoryEntity;
import com.devonfw.application.dishmanagement.service.rest.v1.model.CategoryDto;

@Mapper(componentModel = "cdi")
public interface CategoryMapper {

  CategoryDto mapTo(CategoryEntity category);

  CategoryEntity mapTo(CategoryDto category);

  List<CategoryDto> mapList(List<CategoryEntity> entities);

  default Page<CategoryDto> map(Page<CategoryEntity> entities) {

    List<CategoryDto> etos = mapList(entities.getContent());
    return new PageImpl<>(etos, entities.getPageable(), entities.getTotalElements());
  }
}
