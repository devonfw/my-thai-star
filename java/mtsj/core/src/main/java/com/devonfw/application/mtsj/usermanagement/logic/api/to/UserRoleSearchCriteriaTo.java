package com.devonfw.application.mtsj.usermanagement.logic.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;

/**
 * used to find {@link com.devonfw.application.mtsj.usermanagement.common.api.UserRole}s.
 */
public class UserRoleSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private Boolean active;

  private StringSearchConfigTo nameOption;

  /**
   * The constructor.
   */
  public UserRoleSearchCriteriaTo() {

    super();
  }

  public String getName() {

    return this.name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public Boolean getActive() {

    return this.active;
  }

  public void setActive(Boolean active) {

    this.active = active;
  }

  /**
   * @return nameOption
   */
  public StringSearchConfigTo getNameOption() {

    return this.nameOption;
  }

  /**
   * @param nameOption new value of {@link #getnameOption}.
   */
  public void setNameOption(StringSearchConfigTo nameOption) {

    this.nameOption = nameOption;
  }

}
