package com.devonfw.application.mtsj.general.common.impl.config;

import org.springframework.context.annotation.Configuration;

import com.devonfw.module.beanmapping.common.base.BaseOrikaConfig;

import ma.glasnost.orika.MapperFactory;

/**
 * Java bean configuration for Orika
 *
 * {@link #configureCustomMapping(MapperFactory)} from {@link BaseOrikaConfig} can be overridden as per requirements
 */
@Configuration
public class BeansOrikaConfig extends BaseOrikaConfig {

}
