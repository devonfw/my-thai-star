package com.devonfw.application.bookingmanangement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingDto;

@Mapper(componentModel = "cdi")
public interface BookingMapper {

  BookingDto map(BookingEntity booking);

  BookingEntity map(BookingDto booking);

  List<BookingDto> map(List<BookingEntity> booking);

  default Page<BookingDto> map(Page<BookingEntity> booking) {

    List<BookingDto> productsDto = this.map(booking.getContent());
    return new PageImpl<>(productsDto, booking.getPageable(), booking.getTotalElements());
  }
}