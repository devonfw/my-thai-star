package com.devonfw.application.dishmanagement.service.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.dishmanagement.domain.model.DishEntity;
import com.devonfw.application.dishmanagement.service.rest.v1.model.DishDto;

@Mapper(componentModel = "cdi")
public interface DishMapper {

  DishDto mapTo(DishEntity dishEntity);

  DishEntity mapTo(DishDto dishEto);

  List<DishDto> mapList(List<DishEntity> entities);

  default Page<DishDto> map(Page<DishEntity> entities) {

    List<DishDto> etos = mapList(entities.getContent());
    return new PageImpl<>(etos, entities.getPageable(), entities.getTotalElements());
  }
}
