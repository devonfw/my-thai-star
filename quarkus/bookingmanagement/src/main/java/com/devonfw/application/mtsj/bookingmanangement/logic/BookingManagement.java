package com.devonfw.application.mtsj.bookingmanangement.logic;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import com.devonfw.application.mtsj.bookingmanangement.common.TokenBuilder;
import com.devonfw.application.mtsj.bookingmanangement.common.mapper.BookingMapper;
import com.devonfw.application.mtsj.bookingmanangement.common.mapper.InvitedGuestMapper;
import com.devonfw.application.mtsj.bookingmanangement.common.mapper.TableMapper;
import com.devonfw.application.mtsj.bookingmanangement.common.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanangement.common.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanangement.common.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.BookingEntity;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.InvitedGuestEntity;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.TableEntity;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.repo.BookingRepository;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.repo.InvitedGuestRepository;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.repo.TableRepository;

@ApplicationScoped
public class BookingManagement {

  @Inject
  BookingRepository bookingDao;

  @Inject
  BookingMapper bookingMapper;

  @Inject
  TableRepository tableDao;

  @Inject
  TableMapper tableMapper;

  @Inject
  InvitedGuestRepository invitedGuestDao;

  @Inject
  InvitedGuestMapper invitedGuestMapper;

  public BookingCto findBooking(Long id) {

    Optional<BookingEntity> booking = this.bookingDao.findById(id);
    if (booking.isEmpty()) {
      return null;
    }
    BookingCto cto = new BookingCto();
    cto.setBooking(this.bookingMapper.mapTo(booking.get()));
    cto.setTable(this.tableMapper.mapTo(booking.get().getTable()));
    cto.setInvitedGuests(this.invitedGuestMapper.mapTp(booking.get().getInvitedGuests()));
    return cto;
  }

  public void deleteBooking(Long bookingId) {

    Optional<BookingEntity> booking = this.bookingDao.findById(bookingId);
    if (booking.isEmpty()) {
      throw new RuntimeException("Booking deos not exists.");
    }
    System.out.println(booking.get());
    this.bookingDao.delete(booking.get());
  }

  public BookingEto saveBooking(BookingCto booking) {

    if (Objects.isNull(booking)) {
      throw new RuntimeException("Booking cannot be empty.");
    }

    Optional<TableEntity> table = this.tableDao.findById(booking.getTable().getId());
    if (table.isEmpty()) {
      throw new RuntimeException("Valid table required.");
    }

    BookingEntity bookingEntity = this.bookingMapper.mapTo(booking.getBooking());
    bookingEntity.setCanceled(false);
    bookingEntity.setTable(table.get());
    bookingEntity.setBookingToken(TokenBuilder.build(bookingEntity.getEmail(), "CB_"));

    BookingEntity resultEntity = this.bookingDao.save(bookingEntity);
    if (Objects.nonNull(booking.getInvitedGuests())) {
      saveGuests(booking.getInvitedGuests(), resultEntity.getId());
    }
    return this.bookingMapper.mapTo(resultEntity);
  }

  private void saveGuests(List<InvitedGuestEto> invitedGuests, Long bookingId) {

    List<InvitedGuestEntity> invitedGuestEntities = this.invitedGuestMapper.mapTo(invitedGuests);
    invitedGuestEntities.forEach(guest -> {
      guest.setGuestToken(TokenBuilder.build(guest.getEmail(), "GB_"));
      guest.setIdBooking(bookingId);
      this.invitedGuestDao.save(guest);
    });
  }
}
