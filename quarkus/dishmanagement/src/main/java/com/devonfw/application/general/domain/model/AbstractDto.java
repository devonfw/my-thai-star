package com.devonfw.application.general.domain.model;

import java.io.Serializable;

/**
 * Abstract base class for any <em>transfer-object</em>. Such transfer-object is used to transfer data between
 * components including services over the network. All transfer-objects should be derived from this class. In case they
 * inherit indirectly via {@link AbstractDto ETO} or {@link AbstractCto CTO} they should carry the according suffixes
 * {@code Eto} or {@code Cto}. Otherwise subclasses should carry the suffix {@code To}.
 *
 * @since 3.0.0
 */
public abstract class AbstractDto implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long id;

  private int modificationCounter;

  /**
   * @return id
   */
  public Long getId() {

    return this.id;
  }

  /**
   * @param id new value of {@link #getid}.
   */
  public void setId(Long id) {

    this.id = id;
  }

  /**
   * @return modificationCounter
   */
  public int getModificationCounter() {

    return this.modificationCounter;
  }

  /**
   * @param modificationCounter new value of {@link #getmodificationCounter}.
   */
  public void setModificationCounter(int modificationCounter) {

    this.modificationCounter = modificationCounter;
  }

  /**
   * The constructor.
   */
  public AbstractDto() {

    super();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public final String toString() {

    StringBuilder buffer = new StringBuilder();
    toString(buffer);
    return buffer.toString();
  }

  /**
   * Method to extend {@link #toString()} logic. Override to add additional information.
   *
   * @param buffer is the {@link StringBuilder} where to {@link StringBuilder#append(Object) append} the string
   *        representation.
   */
  protected void toString(StringBuilder buffer) {

    buffer.append(getClass().getSimpleName());
  }

}
