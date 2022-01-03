package com.devonfw.application.usermanagement.dataaccess;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.usermanagement.common.ApplicationPersistenceEntity;

import lombok.Setter;

//@Data
//@ToString
@Setter
@Entity
@Table(name = "User")
public class UserEntity extends ApplicationPersistenceEntity {

  private String username;

  private String password;

  private String email;

  private String secret;

  private Boolean twoFactorStatus;

  private UserRoleEntity userRole;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idRole")
  public UserRoleEntity getUserRole() {

    return this.userRole;
  }

  @Transient
  public Long getUserRoleId() {

    if (this.userRole == null) {
      return null;
    }
    return this.userRole.getId();
  }

  public void setUserRoleId(Long userRoleId) {

    if (userRoleId == null) {
      this.userRole = null;
    } else {
      UserRoleEntity userRoleEntity = new UserRoleEntity();
      userRoleEntity.setId(userRoleId);
      this.userRole = userRoleEntity;
    }

  }

  public String getUsername() {

    return this.username;
  }

  public String getPassword() {

    return this.password;
  }

  public String getEmail() {

    return this.email;
  }

  public String getSecret() {

    return this.secret;
  }

  public boolean isTwoFactorStatus() {

    return this.twoFactorStatus;
  }

}