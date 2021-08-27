package com.devonfw.application.mtsj.bookingmanangement.logic;

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
  TableRepository tableDao;

  @Inject
  InvitedGuestRepository invitedGuestDao;

  @Inject
  BookingMapper bookingMapper;

  @Inject
  TableMapper tableMapper;

  @Inject
  InvitedGuestMapper invitedGuestMapper;

  public BookingCto findBooking(Long id) {

    Optional<BookingEntity> booking = this.bookingDao.findById(id);
    if (booking.isEmpty()) {
      return null;
    }
    BookingCto cto = new BookingCto();
    cto.setBooking(this.bookingMapper.mapTo(booking.get()));
    cto.setTable(this.tableMapper.mapToDTO(booking.get().getTable()));
    cto.setInvitedGuests(this.invitedGuestMapper.mapToList(booking.get().getInvitedGuests()));
    return cto;
  }

  public void deleteBooking(Long bookingId) {

    this.bookingDao.deleteById(bookingId);
  }

  public BookingEto saveBooking(BookingCto booking) {

    if (Objects.isNull(booking)) {
      throw new RuntimeException("Booking cannot be empty.");
    }

    Optional<TableEntity> table = this.tableDao.findById(booking.getTable().getId());
    if (table.isEmpty()) {
      throw new RuntimeException("Valid table required.");
    }

    BookingEntity bookingEntity = this.bookingMapper.mapToEntity(booking.getBooking());
    bookingEntity.setCanceled(false);
    bookingEntity.setTable(table.get());
    bookingEntity.setBookingToken(buildToken(bookingEntity.getEmail(), "CB_"));

    BookingEntity resultEntity = this.bookingDao.save(bookingEntity);
    if (Objects.nonNull(booking.getInvitedGuests())) {
      saveGuests(booking.getInvitedGuests(), resultEntity.getId());
    }
    return this.bookingMapper.mapTo(resultEntity);
  }

  private void saveGuests(List<InvitedGuestEto> invitedGuests, Long bookingId) {

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
