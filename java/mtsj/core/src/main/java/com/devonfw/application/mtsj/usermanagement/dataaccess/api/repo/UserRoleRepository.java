package com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserRoleEntity;
import com.devonfw.application.mtsj.usermanagement.logic.api.to.UserRoleSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link UserRoleEntity}.
 */
public interface UserRoleRepository extends DefaultRepository<UserRoleEntity> {

  /**
   * @param criteria the {@link UserRoleSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link UserRoleEntity} objects that matched the search.
   */
  default Page<UserRoleEntity> findUserRoles(UserRoleSearchCriteriaTo criteria) {

    UserRoleEntity alias = newDslAlias();
    JPAQuery<UserRoleEntity> query = newDslQuery(alias);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
    }
    Boolean active = criteria.getActive();
    if (active != null) {
      query.where(Alias.$(alias.getActive()).eq(active));
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }
}
