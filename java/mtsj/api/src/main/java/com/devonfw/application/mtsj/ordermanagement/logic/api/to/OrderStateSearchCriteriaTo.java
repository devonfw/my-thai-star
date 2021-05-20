package com.devonfw.application.mtsj.ordermanagement.logic.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;

/**
 * {@link SearchCriteriaTo} to find instances of
 * {@link com.devonfw.application.mtsj.ordermanagement.common.api.OrderState}s.
 */
public class OrderStateSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String stateName;

  private StringSearchConfigTo stateNameOption;

  /**
   * @return stateNameId
   */

  public String getStateName() {

    return stateName;
  }

  /**
   * @param stateName setter for stateName attribute
   */

  public void setStateName(String stateName) {

    this.stateName = stateName;
  }

  /**
   * @return the {@link StringSearchConfigTo} used to search for {@link #getStateName() stateName}.
   */
  public StringSearchConfigTo getStateNameOption() {

    return this.stateNameOption;
  }

  /**
   * @param stateNameOption new value of {@link #getStateNameOption()}.
   */
  public void setStateNameOption(StringSearchConfigTo stateNameOption) {

    this.stateNameOption = stateNameOption;
  }

}
