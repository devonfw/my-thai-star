package io.oasp.application.mtsj.usermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of User
 */
public class UserCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private UserEto user;

  private UserRoleEto userRole;

  private List<BookingEto> bookings;

  private List<DishEto> favourites;

  public UserEto getUser() {

    return user;
  }

  public void setUser(UserEto user) {

    this.user = user;
  }

  public UserRoleEto getUserRole() {

    return userRole;
  }

  public void setUserRole(UserRoleEto userRole) {

    this.userRole = userRole;
  }

  public List<BookingEto> getBookings() {

    return bookings;
  }

  public void setBookings(List<BookingEto> bookings) {

    this.bookings = bookings;
  }

  public List<DishEto> getFavourites() {

    return favourites;
  }

  public void setFavourites(List<DishEto> favourites) {

    this.favourites = favourites;
  }

}
