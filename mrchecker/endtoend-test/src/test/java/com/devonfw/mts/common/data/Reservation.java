package com.devonfw.mts.common.data;

public class Reservation {
  private String date;

  private String name;

  private String email;

  private String id;

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
   * @return id
   */
  public String getId() {
    return this.id;
  }

  /**
   * @param id new value of {@link #getid}.
   */
  public void setId(String id) {
    this.id = id;
  }

  /**
   * @return guests
   */
  public int getGuests() {
    return this.guests;
  }

  /**
   * @param guests new value of {@link #getguests}.
   */
  public void setGuests(int guests) {
    this.guests = guests;
  }

  /**
   * @return String. Reservation date.
   * */
  public String getDate() {
    return this.date;
  }

  /**
   * @return String. Email used for the reservation.
   * */
  public String getEmail() {
    return this.email;
  }

  /**
   * @return String. Reservation id.
   * */
  public String getReservationId() {
    return this.id;
  }

  /**
   * @param date. Set the date for the reservation.
   * */
  public void setDate(String date) {
    this.date = date;
  }

  /**
   * @param email. Set the email used for the reservation.
   * */
  public void setEmail(String email) {
    this.email = email;
  }

  /**
   * @return name
   */
  public String getName() {
    return this.name;
  }

  /**
   * @param name new value of {@link #getname}.
   */
  public void setName(String name) {
    this.name = name;
  }

  /**
   * @param id
   */
  public void setReservationId(String id) {
    this.id = id;
  }

  /**
   * @return String that represents an instance of this class
   * */
  @Override
  public String toString() {
    return "{date: " + this.date + ", email:" + this.email + ", ids: " + this.id + "}\n";
  }

}
