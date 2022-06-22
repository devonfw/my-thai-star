package com.devonfw.application.bookingmanangement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.bookingmanangement.domain.model.TableEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableDto;

@Mapper(componentModel = "cdi")
public interface TableMapper {

  TableDto mapToDto(TableEntity table);

  TableEntity mapToEntity(TableDto table);

  default Page<TableDto> map(Page<TableEntity> table) {

    List<TableDto> tables = mapList(table.getContent());
    return new PageImpl<>(tables, table.getPageable(), table.getTotalElements());
  }

  List<TableDto> mapList(List<TableEntity> content);
}
