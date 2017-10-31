package io.oasp.application.mtsj.general.common.api.to;

import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import io.oasp.module.jpa.common.api.to.PaginationResultTo;

/**
 * This class will be used if SOAP service needs to return PaginatedList result.
 */
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class PaginatedListToWrapper<T> {

  private PaginationResultTo pagination;

  @XmlElement
  private List<T> result;

  /**
   * @return pagination
   */
  public PaginationResultTo getPagination() {

    return this.pagination;
  }

  /**
   * @return result
   */
  public List<T> getResult() {

    return this.result;
  }

  /**
   * @param result new value of {@link #getresult}.
   */
  public void setResult(List<T> result) {

    this.result = result;
  }

  /**
   * @param pagination new value of {@link #getpagination}.
   */
  public void setPagination(PaginationResultTo pagination) {

    this.pagination = pagination;
  }

}
