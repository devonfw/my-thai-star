package com.devonfw.application.bookingmanangement.rest.v1.mapper;

import org.mapstruct.Mapper;

import com.devonfw.application.bookingmanangement.domain.model.TableEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableDto;

@Mapper(componentModel = "cdi")
public interface TableMapper {

  TableDto mapToDTO(TableEntity table);

  TableEntity mapToEntity(TableDto table);
}
