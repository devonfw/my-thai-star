package com.devonfw.application.bookingmanangement.logic;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;
import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;
import com.devonfw.application.bookingmanangement.domain.model.TableEntity;
import com.devonfw.application.bookingmanangement.domain.repo.BookingRepository;
import com.devonfw.application.bookingmanangement.domain.repo.InvitedGuestRepository;
import com.devonfw.application.bookingmanangement.domain.repo.TableRepository;
import com.devonfw.application.bookingmanangement.rest.v1.mapper.BookingMapper;
import com.devonfw.application.bookingmanangement.rest.v1.mapper.InvitedGuestMapper;
import com.devonfw.application.bookingmanangement.rest.v1.mapper.TableMapper;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;

@ApplicationScoped
public class BookingManagement {

  @Inject
  BookingRepository bookingDao;

  @Inject
  TableRepository tableDao;

  @Inject
  InvitedGuestRepository invitedGuestDao;

  @Inject
  BookingMapper bookingMapper;

  @Inject
  TableMapper tableMapper;

  @Inject
  InvitedGuestMapper invitedGuestMapper;

  public BookingDto findBooking(Long id) {

    Optional<BookingEntity> booking = this.bookingDao.findById(id);
    if (booking.isEmpty()) {
      return null;
    }
    BookingDto dto = new BookingDto();
    dto = this.bookingMapper.map(booking.get());
    dto.setTable(this.tableMapper.mapToDTO(booking.get().getTable()));
    dto.setInvitedGuests(this.invitedGuestMapper.mapToList(booking.get().getInvitedGuests()));
    return dto;
  }

  public void deleteBooking(Long bookingId) {

    this.bookingDao.deleteById(bookingId);
  }

  public BookingDto saveBooking(BookingDto booking) {

    if (Objects.isNull(booking)) {
      throw new RuntimeException("Booking cannot be empty.");
    }

    Optional<TableEntity> table = this.tableDao.findById(booking.getTable().getId());
    if (table.isEmpty()) {
      throw new RuntimeException("Valid table required.");
    }

    BookingEntity bookingEntity = this.bookingMapper.map(booking);
    bookingEntity.setCanceled(false);
    bookingEntity.setTable(table.get());
    bookingEntity.setBookingToken(buildToken(bookingEntity.getEmail(), "CB_"));

    BookingEntity resultEntity = this.bookingDao.save(bookingEntity);
    if (Objects.nonNull(booking.getInvitedGuests())) {
      saveGuests(booking.getInvitedGuests(), resultEntity.getId());
    }
    return this.bookingMapper.map(resultEntity);
  }

  private void saveGuests(List<InvitedGuestDto> invitedGuests, Long bookingId) {

    List<InvitedGuestEntity> invitedGuestEntities = this.invitedGuestMapper.mapToListEntity(invitedGuests);
    invitedGuestEntities.forEach(guest -> {
      guest.setGuestToken(buildToken(guest.getEmail(), "GB_"));
      guest.setIdBooking(bookingId);
      this.invitedGuestDao.save(guest);
    });
  }

  private String buildToken(String email, String type) {

    LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault());
    String date = String.format("%04d%02d%02d_", localDateTime.getYear(), localDateTime.getMonthValue(),
        localDateTime.getDayOfMonth());
    String time = String.format("%02d%02d%02d", localDateTime.getHour(), localDateTime.getMinute(),
        localDateTime.getSecond());

    MessageDigest md = null;
    try {
      md = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    }
    md.update((email + date + time).getBytes());
    byte[] digest = md.digest();
    StringBuilder sb = new StringBuilder();
    for (byte b : digest) {
      sb.append(String.format("%02x", b & 0xff));
    }
    return type + date + sb;
  }

}
