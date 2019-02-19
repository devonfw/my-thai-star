package com.devonfw.mts.common.data;

public class Reservation {

  /** Reservation date */
  private String date;

  /** Name for the reservation */
  private String name;

  /** Email for the reservation */
  private String email;

  /** Reservation identifier */
  private String id;

  /** Number of guests */
  private int guests;

  /**
   * The constructor.
   *
   * @param date
   * @param email
   * @param ids
   */
  public Reservation(String date, String email, String id) {
    this.date = date;
    this.email = email;
    this.id = id;
  }

  /**
   * The constructor used to create a reservation
   *
   * @param date
   * @param email
   */
  public Reservation(String date, String email, int guests) {
    this.date = date;
    this.email = email;
    this.guests = guests;
  }

  /**
   * The constructor used to create a reservation
   *
   * @param date
   * @param name
   * @param email
   * @param guests
   */
  public Reservation(String date, String name, String email, int guests) {
    this.date = date;
    this.name = name;
    this.email = email;
    this.guests = guests;
  }

  /**
   * See also {@link Reservation#id}
   *
   * @return id.
   */
  public String getId() {
    return this.id;
  }

  /**
   * See also {@link Reservation#id}
   *
   * @param id new identifier.
   */
  public void setId(String id) {
    this.id = id;
  }

  /**
   * See also {@link Reservation#guests}
   *
   * @return guests.
   */
  public int getGuests() {
    return this.guests;
  }

  /**
   * See also {@link #getGuests}
   *
   * @param guests new number of guests.
   */
  public void setGuests(int guests) {
    this.guests = guests;
  }

  /**
   * See also {@link Reservation#date}
   *
   * @return String. Reservation date.
   * */
  public String getDate() {
    return this.date;
  }

  /**
   * See also {@link Reservation#date}
   *
   * @param date. Set the date for the reservation.
   * */
  public void setDate(String date) {
    this.date = date;
  }

  /**
   * See also {@link Reservation#email}
   *
   * @return String. Email used for the reservation.
   * */
  public String getEmail() {
    return this.email;
  }

  /**
   * See also {@link Reservation#email}
   *
   * @param email. Set the email used for the reservation.
   * */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * See also {@link Reservation#id}
   *
   * @return String. Reservation id.
   * */
  public String getReservationId() {
    return this.id;
  }

  /**
   * See also {@link Reservation#id}
   *
   * @param id.
   */
  public void setReservationId(String id) {
    this.id = id;
  }

  /**
   * Value of {@link Reservation#name}
   * @return name
   */
  public String getName() {
    return this.name;
  }

  /**
   * See also {@link Reservation#name}
   *
   * @param name new name.
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @return String that represents an instance of this class
   * */
  @Override
  public String toString() {
    return "{date: " + this.date + ", email:" + this.email + ", ids: " + this.id + "}\n";
  }

}
