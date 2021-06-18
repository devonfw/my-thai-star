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
	 * @param sort  specification of sorting
	 */
	public default void addOrderBy(JPAQuery<AddressEntity> query, AddressEntity alias, Sort sort) {

		if (sort != null && sort.isSorted()) {
			Iterator<Order> it = sort.iterator();
			while (it.hasNext()) {
				Order next = it.next();
				switch (next.getProperty()) {
				case "stateOrRegion":
					if (next.isAscending()) {
						query.orderBy($(alias.getStateOrRegion()).asc());
					} else {
						query.orderBy($(alias.getStateOrRegion()).desc());
					}
					break;
				case "city":
					if (next.isAscending()) {
						query.orderBy($(alias.getCity()).asc());
					} else {
						query.orderBy($(alias.getCity()).desc());
					}
					break;
				case "countryCode":
					if (next.isAscending()) {
						query.orderBy($(alias.getCountryCode()).asc());
					} else {
						query.orderBy($(alias.getCountryCode()).desc());
					}
					break;
				case "postalCode":
					if (next.isAscending()) {
						query.orderBy($(alias.getPostalCode()).asc());
					} else {
						query.orderBy($(alias.getPostalCode()).desc());
					}
					break;
				case "addressLine1":
					if (next.isAscending()) {
						query.orderBy($(alias.getAddressLine1()).asc());
					} else {
						query.orderBy($(alias.getAddressLine1()).desc());
					}
					break;
				case "addressLine2":
					if (next.isAscending()) {
						query.orderBy($(alias.getAddressLine2()).asc());
					} else {
						query.orderBy($(alias.getAddressLine2()).desc());
					}
					break;
				case "addressLine3":
					if (next.isAscending()) {
						query.orderBy($(alias.getAddressLine3()).asc());
					} else {
						query.orderBy($(alias.getAddressLine3()).desc());
					}
					break;
				case "districtOrCounty":
					if (next.isAscending()) {
						query.orderBy($(alias.getDistrictOrCounty()).asc());
					} else {
						query.orderBy($(alias.getDistrictOrCounty()).desc());
					}
					break;
				default:
					throw new IllegalArgumentException("Sorted by the unknown property '" + next.getProperty() + "'");
				}
			}
		}
	}

}