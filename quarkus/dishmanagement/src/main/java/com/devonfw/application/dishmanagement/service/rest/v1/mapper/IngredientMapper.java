package com.devonfw.application.dishmanagement.service.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.dishmanagement.domain.model.IngredientEntity;
import com.devonfw.application.dishmanagement.service.rest.v1.model.IngredientDto;

@Mapper(componentModel = "cdi")
public interface IngredientMapper {

  IngredientEntity mapTo(IngredientDto ingredientDto);

  IngredientDto mapTo(IngredientEntity ingredientEntity);

  List<IngredientDto> mapList(List<IngredientEntity> entities);

  default Page<IngredientDto> map(Page<IngredientEntity> entities) {

    List<IngredientDto> etos = mapList(entities.getContent());
    return new PageImpl<>(etos, entities.getPageable(), entities.getTotalElements());
  }
}
