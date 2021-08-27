package com.devonfw.application.mtsj.bookingmanangement.common.mapper;

import org.mapstruct.Mapper;

import com.devonfw.application.mtsj.bookingmanangement.common.to.TableEto;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.TableEntity;

@Mapper(componentModel = "cdi")
public interface TableMapper {

  TableEto mapToDTO(TableEntity table);

  TableEntity mapToEntity(TableEto table);
}
