package com.devonfw.application.mtsj.usermanagement.dataaccess.api;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.usermanagement.common.api.UserRole;

@Entity
@Table(name = "UserRole")
public class UserRoleEntity extends ApplicationPersistenceEntity implements UserRole {

  private String name;

  private Boolean active;

  private List<UserEntity> users;

  private static final long serialVersionUID = 1L;

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
   * @return active
   */
  public Boolean getActive() {

    return this.active;
  }

  /**
   * @param active new value of {@link #getactive}.
   */
  public void setActive(Boolean active) {

    this.active = active;
  }

  /**
   * @return users
   */
  @OneToMany(mappedBy = "userRole", fetch = FetchType.EAGER)
  public List<UserEntity> getUsers() {

    return this.users;
  }

  /**
   * @param users new value of {@link #getusers}.
   */
  public void setUsers(List<UserEntity> users) {

    this.users = users;
  }

}
