package com.devonfw.application.usermanagement.domain.repo;

import static com.devonfw.application.usermanagement.utils.StringUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.usermanagement.domain.model.QUserRoleEntity;
import com.devonfw.application.usermanagement.domain.model.UserRoleEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserRoleSearchCriteriaDto;
import com.devonfw.application.usermanagement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class UserRoleFragmentImpl implements UserRoleFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<UserRoleEntity> findRolesByCriteria(UserRoleSearchCriteriaDto searchCriteria) {

    QUserRoleEntity userRole = QUserRoleEntity.userRoleEntity;
    List<Predicate> predicates = new ArrayList<>();
    if (!isEmpty(searchCriteria.getName())) {
      predicates.add(userRole.name.eq(searchCriteria.getName()));
    }
    if (searchCriteria.getActive() != null) {
      predicates.add(userRole.active.eq(searchCriteria.getActive()));
    }
    JPAQuery<UserRoleEntity> query = new JPAQuery<UserRoleEntity>(this.em).from(userRole);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    query.orderBy(userRole.name.desc());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());
  }

}
