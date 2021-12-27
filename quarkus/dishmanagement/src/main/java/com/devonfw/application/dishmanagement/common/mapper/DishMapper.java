package com.devonfw.application.dishmanagement.common.mapper;

import java.time.OffsetDateTime;
import java.util.Date;

import org.mapstruct.Mapper;

import com.devonfw.application.dishmanagement.common.to.DishEto;
import com.devonfw.application.dishmanagement.dataaccess.DishEntity;

@Mapper(componentModel = "cdi")
public interface DishMapper {
  default Date map(OffsetDateTime value) {

    if (value == null) {
      return null;
    }
    return new Date(value.toInstant().toEpochMilli());
  }

  DishEto mapTo(DishEntity dishEntity);

  DishEntity mapTo(DishEto dishEto);
}
