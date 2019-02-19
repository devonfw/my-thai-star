package com.devonfw.mts.common.data;

public class User {

  /** Username */
  private String username;

  /** Password */
  private String password;

  /**
   * Constructor used to create a user
   * @param username. String that represents the name of a user.
   * @param password. Password for the user given.
   * */
  public User(String username, String password) {
    this.username = username;
    this.password = password;
  }

  /**
   * Constructor used to create a user
   * @param username. String that represents the name of a user.
   * */
  public User(String username) {
    this.username = username;
    this.password = "fakepassword";
  }

  /**
   * See also {@link User#username}
   *
   * @return Username.
   * */
  public String getUsername() {
    return this.username;
  }

  /**
   * See also {@link User#password}
   *
   * @return Password of the user.
   * */
  public String getPassword() {
    return this.password;
  }

  /**
   * @return String that represents an instance of this class
   * */
  @Override
  public String toString() {
    return "Usern with username: " + this.username + " and password: " + this.password;
  }
}