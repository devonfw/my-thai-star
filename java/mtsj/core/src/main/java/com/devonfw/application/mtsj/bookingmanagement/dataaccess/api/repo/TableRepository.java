package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.bookingmanagement.common.api.to.TableSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link TableEntity}.
 */
public interface TableRepository extends DefaultRepository<TableEntity> {

	/**
	 * @param deviceId
	 * @return the {@link TableEntity} objects that matched the search.
	 */
	@Query("SELECT tables FROM TableEntity tables" + " WHERE tables.deviceId = :deviceId")
	List<TableEntity> findTablesByDeviceId(@Param("deviceId") String deviceId);

	/**
	 * @param criteria the {@link TableSearchCriteriaTo} with the criteria to
	 *                 search.
	 * @return the {@link Page} of the {@link TableEntity} objects that matched the
	 *         search.
	 */
	default Page<TableEntity> findTables(TableSearchCriteriaTo criteria) {

		TableEntity alias = newDslAlias();
		JPAQuery<TableEntity> query = newDslQuery(alias);

		Integer seatsNumber = criteria.getSeatsNumber();
		if (seatsNumber != null) {
			query.where(Alias.$(alias.getSeatsNumber()).eq(seatsNumber));
		}

		return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);

	}
}
