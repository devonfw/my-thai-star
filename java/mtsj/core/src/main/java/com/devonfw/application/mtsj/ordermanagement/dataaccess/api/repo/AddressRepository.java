package com.devonfw.application.mtsj.ordermanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.util.Iterator;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.AddressEntity;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link AddressEntity}
 */
public interface AddressRepository extends DefaultRepository<AddressEntity> {

  /**
   * Add sorting to the given query on the given alias
   *
   * @param query to add sorting to
   * @param alias to retrieve columns from for sorting
   * @param sort specification of sorting
   */
  public default void addOrderBy(JPAQuery<AddressEntity> query, AddressEntity alias, Sort sort) {

    if (sort != null && sort.isSorted()) {
      Iterator<Order> it = sort.iterator();
      while (it.hasNext()) {
        Order next = it.next();
        switch (next.getProperty()) {
          case "postCode":
            if (next.isAscending()) {
              query.orderBy($(alias.getPostCode()).asc());
            } else {
              query.orderBy($(alias.getPostCode()).desc());
            }
            break;
          case "city":
            if (next.isAscending()) {
              query.orderBy($(alias.getCity()).asc());
            } else {
              query.orderBy($(alias.getCity()).desc());
            }
            break;
          case "streetName":
            if (next.isAscending()) {
              query.orderBy($(alias.getStreetName()).asc());
            } else {
              query.orderBy($(alias.getStreetName()).desc());
            }
            break;
          case "houseNumber":
            if (next.isAscending()) {
              query.orderBy($(alias.getHouseNumber()).asc());
            } else {
              query.orderBy($(alias.getHouseNumber()).desc());
            }
            break;
          default:
            throw new IllegalArgumentException("Sorted by the unknown property '" + next.getProperty() + "'");
        }
      }
    }
  }

}