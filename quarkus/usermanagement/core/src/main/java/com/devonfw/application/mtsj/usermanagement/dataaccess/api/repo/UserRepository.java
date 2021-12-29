package com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;


import org.springframework.data.domain.Page;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * {@link DefaultRepository} for {@link UserEntity}.
 */
public interface UserRepository extends DefaultRepository<UserEntity> {

  /**
   * @param criteria the {@link UserSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link UserEntity} objects that matched the search.
   */
  default Page<UserEntity> findUsers(UserSearchCriteriaTo criteria) {

    UserEntity alias = newDslAlias();
    JPAQuery<UserEntity> query = newDslQuery(alias);

    String username = criteria.getUsername();
    if ((username != null) && !username.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getUsername()), username, criteria.getUsernameOption());
    }
    String email = criteria.getEmail();
    if ((email != null) && !email.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getEmail()), email, criteria.getEmailOption());
    }
    Long userRole = criteria.getUserRoleId();
    if (userRole != null && alias.getUserRole() != null) {
      query.where(Alias.$(alias.getUserRole().getId()).eq(userRole));
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }

  /**
   * @param username
   * @return An {@link UserEntity} objects that matched the search.
   */
  @Query("SELECT user FROM UserEntity user" //
          + " WHERE user.username = :username")
  UserEntity findByUsername(@Param("username") String username);
}
