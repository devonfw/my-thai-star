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

import org.springframework.data.domain.Page;

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
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableSearchCriteriaTo;

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

  private int hoursLimit = 1;

  public BookingDto findBooking(Long id) {

    Optional<BookingEntity> booking = this.bookingDao.findById(id);
    if (booking.isEmpty()) {
      return null;
    }
    BookingDto dto = new BookingDto();
    dto = this.bookingMapper.map(booking.get());
    dto.setTable(this.tableMapper.mapToDto(booking.get().getTable()));
    dto.setInvitedGuests(this.invitedGuestMapper.mapList(booking.get().getInvitedGuests()));
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

  // @RolesAllowed(ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING)
  public Page<BookingDto> findBookingsByPost(BookingSearchCriteriaTo criteria) {

    return findBookingDtos(criteria);
  }

  public Page<BookingDto> findBookingDtos(BookingSearchCriteriaTo criteria) {

    return this.bookingMapper.map(this.bookingDao.findBookingsByCriteria(criteria));
  }

  public InvitedGuestDto findInvitedGuest(long id) {

    Optional<InvitedGuestEntity> guestEntity = this.invitedGuestDao.findById(id);
    if (guestEntity.isPresent()) {
      return this.invitedGuestMapper.mapTo(guestEntity.get());
    }
    return null;
  }

  public InvitedGuestDto saveInvitedGuest(InvitedGuestDto invitedguest) {

    return this.invitedGuestMapper.mapTo(this.invitedGuestDao.save(this.invitedGuestMapper.mapToEntity(invitedguest)));
  }

  public void deleteInvitedGuest(long id) {

    this.invitedGuestDao.deleteById(id);
  }

  public Page<InvitedGuestDto> findInvitedGuestDtos(InvitedGuestSearchCriteriaTo criteria) {

    return this.invitedGuestMapper.map(this.invitedGuestDao.findInvitedGuests(criteria));

  }

  public InvitedGuestDto findInvitedGuestByToken(String token) {

    return this.invitedGuestMapper.mapTo(this.invitedGuestDao.findInvitedGuestByToken(token));
  }

  public InvitedGuestDto acceptInvite(String guestToken) {

    InvitedGuestDto invited = findInvitedGuestByToken(guestToken);
    invited.setAccepted(true);
    BookingDto bookingDto = findBooking(invited.getBookingId());
    // TODO send email
    return saveInvitedGuest(invited);
  }

  public InvitedGuestDto declineInvite(String guestToken) {

    InvitedGuestDto invited = findInvitedGuestByToken(guestToken);
    invited.setAccepted(false);
    BookingDto bookingDto = findBooking(invited.getBookingId());
    // TODO send email
    // TODO delete Order
    return saveInvitedGuest(invited);
  }

  public void cancelInvite(String bookingToken) {

    BookingDto bookingDto = findBookingByToken(bookingToken);
    if (!cancelInviteAllowed(bookingDto)) {
      throw new CancelInviteNotAllowedException();
    }
    List<InvitedGuestDto> guestsEto = findInvitedGuestByBooking(bookingDto.getId());
    if (guestsEto != null) {
      for (InvitedGuestDto guestEto : guestsEto) {
        deleteInvitedGuest(guestEto.getId());
        // TODO send email
      }
    }
    deleteBooking(bookingDto.getId());
    // TODO send email
  }

  private List<InvitedGuestDto> findInvitedGuestByBooking(Long id) {

    List<InvitedGuestEntity> invitedGuestList = this.invitedGuestDao.findInvitedGuestByBookingById(id);
    return this.invitedGuestMapper.mapList(invitedGuestList);
  }

  private BookingDto findBookingByToken(String bookingToken) {

    return this.bookingMapper.map(this.bookingDao.findBookingByToken(bookingToken));
  }

  private boolean cancelInviteAllowed(BookingDto booking) {

    Long bookingTimeMillis = booking.getBookingDate().toEpochMilli();
    Long cancellationLimit = bookingTimeMillis - (3600000 * this.hoursLimit);
    Long now = Instant.now().toEpochMilli();

    return (now > cancellationLimit) ? false : true;
  }

  public TableDto findTable(long id) {

    Optional<TableEntity> tableEntity = this.tableDao.findById(id);
    if (tableEntity.isPresent()) {
      return this.tableMapper.mapToDto(tableEntity.get());
    }
    return null;
  }

  public TableDto saveTable(TableDto table) {

    return this.tableMapper.mapToDto(this.tableDao.save(this.tableMapper.mapToEntity(table)));
  }

  public void deleteTable(long id) {

    this.tableDao.deleteById(id);

  }

  public Page<TableDto> findTableDtos(TableSearchCriteriaTo searchCriteriaTo) {

    return this.tableMapper.map(this.tableDao.findTables(searchCriteriaTo));
  }

}
