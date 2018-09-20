package com.devonfw.mts.common.data;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
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
   * The constructor.
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
   * The constructor.
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

  public String getDate() {

    return this.date;
  }

  public String getEmail() {

    return this.email;
  }

  public String getReservationId() {

    return this.id;
  }

  public void setDate(String date) {

    this.date = date;
  }

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

  @Override
  public String toString() {

    return "{date: " + this.date + ", email:" + this.email + ", ids: " + this.id + "}\n";
  }

}
