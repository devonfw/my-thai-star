package com.devonfw.app.common;

import org.springframework.data.domain.Pageable;

/**
 * Abstract {@link AbstractTo TO} for search criteria.
 */
public abstract class AbstractSearchCriteriaTo extends AbstractTo {

  private static final long serialVersionUID = 1L;

  private Pageable pageable;

  /**
   * @return the {@link Pageable} containing the optional pagination information or {@code null}.
   */
  public Pageable getPageable() {

    return this.pageable;
  }

  /**
   * @param pageable new value of {@link #getPageable()}.
   */
  public void setPageable(Pageable pageable) {

    this.pageable = pageable;
  }

}