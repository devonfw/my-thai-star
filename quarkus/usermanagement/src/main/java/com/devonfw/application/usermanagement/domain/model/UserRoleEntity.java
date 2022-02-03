package com.devonfw.application.usermanagement.domain.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.devonfw.application.usermanagement.domain.model.UserEntity;
import com.devonfw.application.usermanagement.general.domain.model.ApplicationPersistenceEntity;

import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Entity
@Table(name = "UserRole")
public class UserRoleEntity extends ApplicationPersistenceEntity {
  private String name;

  private Boolean active;

  private List<UserEntity> users;

  @OneToMany(mappedBy = "userRole", fetch = FetchType.EAGER)
  public List<UserEntity> getUsers() {

    return this.users;
  }

  public String getName() {

    return this.name;
  }

  public Boolean isActive() {

    return this.active;
  }

}
