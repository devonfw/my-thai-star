package com.devonfw.application.mtsj.general.common.api;

import com.devonfw.module.basic.common.api.entity.GenericEntity;

/**
 * This is the abstract interface for a {@link MutableGenericEntity} of the restaurant. We are using {@link Long} for
 * all {@link #getId() primary keys}.
 */
public abstract interface ApplicationEntity extends GenericEntity<Long> {

}
