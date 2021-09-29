package com.devonfw.application.dishmanagement.common.mapper;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

import org.mapstruct.Mapper;

import com.devonfw.application.dishmanagement.common.to.IngredientEto;
import com.devonfw.application.dishmanagement.dataaccess.IngredientEntity;

@Mapper(componentModel = "cdi")
public interface IngredientMapper {

  default Date map(OffsetDateTime value) {

    if (value == null) {
      return null;
    }
    return new Date(value.toInstant().toEpochMilli());
  }

  IngredientEntity mapTo(IngredientEto ingredientEto);

  IngredientEto mapTo(IngredientEntity ingredientEntity);

  List<IngredientEto> mapList(List<IngredientEntity> entities);
}
