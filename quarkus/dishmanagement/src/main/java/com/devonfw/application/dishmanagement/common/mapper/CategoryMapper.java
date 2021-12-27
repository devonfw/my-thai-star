package com.devonfw.application.dishmanagement.common.mapper;

import java.time.OffsetDateTime;
import java.util.Date;
import java.util.List;

import org.mapstruct.Mapper;

import com.devonfw.application.dishmanagement.common.to.CategoryEto;
import com.devonfw.application.dishmanagement.dataaccess.CategoryEntity;

@Mapper(componentModel = "cdi")
public interface CategoryMapper {
  default Date map(OffsetDateTime value) {

    if (value == null) {
      return null;
    }
    return new Date(value.toInstant().toEpochMilli());
  }

  CategoryEto mapTo(CategoryEntity category);

  CategoryEntity mapTo(CategoryEto category);

  List<CategoryEto> mapList(List<CategoryEntity> entities);
}
