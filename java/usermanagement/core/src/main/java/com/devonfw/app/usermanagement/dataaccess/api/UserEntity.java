package com.devonfw.app.usermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.app.usermanagement.common.api.User;

@Entity
@Table(name = "User")
public class UserEntity extends ApplicationPersistenceEntity implements User {

  private String username;

  private String password;

  private String email;

  private String secret;

  private boolean twoFactorStatus;

  private UserRoleEntity userRole;

  private static final long serialVersionUID = 1L;

  /**
   * @return username
   */
  @Override
  public String getUsername() {

    return this.username;
  }

  /**
   * @param username new value of {@link #getUsername()}.
   */
  @Override
  public void setUsername(String username) {

    this.username = username;
  }

  /**
   * @return password
   */
  public String getPassword() {

    return this.password;
  }

  /**
   * @param password new value of {@link #getPassword()}.
   */
  public void setPassword(String password) {

    this.password = password;
  }

  /**
   * @return email
   */
  @Override
  public String getEmail() {

    return this.email;
  }

  /**
   * @param email new value of {@link #getEmail()}.
   */
  @Override
  public void setEmail(String email) {

    this.email = email;
  }

  /**
   * @return secret
   */
  public String getSecret() {

    return this.secret;
  }

  /**
   * @param secret new value of {@link #getSecret()}.
   */
  public void setSecret(String secret) {

    this.secret = secret;
  }

  /**
   * @return twoFactorStatus
   */
  @Override
  public boolean getTwoFactorStatus() {

    return this.twoFactorStatus;
  }

  /**
   *
   * @param twoFactorStatus new value of {@link #getTwoFactorStatus()}
   */
  @Override
  public void setTwoFactorStatus(boolean twoFactorStatus) {

    this.twoFactorStatus = twoFactorStatus;
  }

  /**
   * @return userRole
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idRole")
  public UserRoleEntity getUserRole() {

    return this.userRole;
  }

  /**
   * @param userRole new value of {@link #getUserRole()}.
   */
  public void setUserRole(UserRoleEntity userRole) {

    this.userRole = userRole;
  }

  @Override
  @Transient
  public Long getUserRoleId() {

    if (this.userRole == null) {
      return null;
    }
    return this.userRole.getId();
  }

  @Override
  public void setUserRoleId(Long userRoleId) {

    if (userRoleId == null) {
      this.userRole = null;
    } else {
      UserRoleEntity userRoleEntity = new UserRoleEntity();
      userRoleEntity.setId(userRoleId);
      this.userRole = userRoleEntity;
    }
  }

}
