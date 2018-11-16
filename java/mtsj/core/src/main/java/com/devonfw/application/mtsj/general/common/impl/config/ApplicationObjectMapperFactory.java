package com.devonfw.application.mtsj.general.common.impl.config;

import javax.inject.Named;

import org.springframework.data.domain.Pageable;
import org.springframework.security.web.csrf.CsrfToken;

import com.fasterxml.jackson.databind.module.SimpleModule;

import com.devonfw.module.json.common.base.ObjectMapperFactory;
import com.devonfw.module.json.common.base.type.PageableJsonSerializer;
import com.devonfw.module.json.common.base.type.PageableJsonDeserializer;

/**
 * The MappingFactory class to resolve polymorphic conflicts within the issue_6 application.
 */
@Named("ApplicationObjectMapperFactory")
public class ApplicationObjectMapperFactory extends ObjectMapperFactory {

  /**
   * The constructor.
   */
  public ApplicationObjectMapperFactory() {

    super();
    SimpleModule module = getExtensionModule();
    module.addAbstractTypeMapping(CsrfToken.class, CsrfTokenImpl.class);
	// register spring-data Pageable
    module.addSerializer(Pageable.class, new PageableJsonSerializer());
    module.addDeserializer(Pageable.class, new PageableJsonDeserializer());
  }
}
