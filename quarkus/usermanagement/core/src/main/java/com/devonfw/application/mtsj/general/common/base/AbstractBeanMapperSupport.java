package com.devonfw.application.mtsj.general.common.base;

import javax.inject.Inject;

import com.devonfw.module.beanmapping.common.api.BeanMapper;

/**
 * This abstract class provides {@link #getBeanMapper() access} to the {@link BeanMapper}.
 *
 */
public abstract class AbstractBeanMapperSupport {

  /** @see #getBeanMapper() */
  private BeanMapper beanMapper;

  /**
   * @param beanMapper is the {@link BeanMapper} to {@link Inject}
   */
  @Inject
  public void setBeanMapper(BeanMapper beanMapper) {

    this.beanMapper = beanMapper;
  }

  /**
   * @return the {@link BeanMapper} instance.
   */
  protected BeanMapper getBeanMapper() {

    return this.beanMapper;
  }

}
