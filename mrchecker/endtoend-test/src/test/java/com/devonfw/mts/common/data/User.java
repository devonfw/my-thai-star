package com.devonfw.mts.common.data;

public class User {
  private String username;

  private String password;

  // Arguments order depends on data in CSV line
  public User(String username, String password) {

    this.username = username;
    this.password = password;

  }

  // When there is only one argument after CSV line split, than treat this one as it is argument AGE
  public User(String username) {

    this.username = username;
    this.password = "fakepassword";
  }

  public String getUsername() {

    return this.username;
  }

  public String getPassword() {

    return this.password;
  }

  @Override
  public String toString() {

    return "Usern with username: " + this.username + " and password: " + this.password;
  }
}