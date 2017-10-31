package io.oasp.application.mtsj.usermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.usermanagement.common.api.UserRole}s.
 */
public class UserRoleSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private Boolean active;

  /**
   * The constructor.
   */
  public UserRoleSearchCriteriaTo() {

    super();
  }

  public String getName() {

    return name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public Boolean getActive() {

    return active;
  }

  public void setActive(Boolean active) {

    this.active = active;
  }

}
