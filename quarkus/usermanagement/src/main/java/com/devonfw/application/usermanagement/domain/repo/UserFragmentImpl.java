package com.devonfw.application.usermanagement.domain.repo;

import static com.devonfw.application.usermanagement.utils.StringUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.usermanagement.domain.model.QUserEntity;
import com.devonfw.application.usermanagement.domain.model.UserEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserSearchCriteriaDto;
import com.devonfw.application.usermanagement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class UserFragmentImpl implements UserFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<UserEntity> findUserByCriteria(UserSearchCriteriaDto searchCriteria) {

    QUserEntity userEntity = QUserEntity.userEntity;
    List<Predicate> predicates = new ArrayList<>();
    if (!isEmpty(searchCriteria.getUsername())) {
      predicates.add(userEntity.username.eq(searchCriteria.getUsername()));
    }
    if (!isEmpty(searchCriteria.getEmail())) {
      predicates.add(userEntity.email.eq(searchCriteria.getEmail()));
    }

    if (searchCriteria.getUserRoleId() != null) {
      predicates.add(userEntity.userRole.id.eq(searchCriteria.getUserRoleId()));
    }

    JPAQuery<UserEntity> query = new JPAQuery<UserEntity>(this.em).from(userEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    query.orderBy(userEntity.username.desc());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());
  }

}
