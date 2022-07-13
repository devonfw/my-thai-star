package com.devonfw.application.bookingmanangement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.bookingmanangement.domain.model.TableEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableSearchCriteriaTo;

public interface TableFragment {
  Page<TableEntity> findTables(TableSearchCriteriaTo criteria);
}
