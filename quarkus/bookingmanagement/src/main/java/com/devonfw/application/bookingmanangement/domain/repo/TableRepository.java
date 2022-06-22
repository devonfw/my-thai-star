package com.devonfw.application.bookingmanangement.domain.repo;

import org.springframework.data.repository.CrudRepository;

import com.devonfw.application.bookingmanangement.domain.model.TableEntity;

public interface TableRepository extends CrudRepository<TableEntity, Long>, TableFragment {

}
