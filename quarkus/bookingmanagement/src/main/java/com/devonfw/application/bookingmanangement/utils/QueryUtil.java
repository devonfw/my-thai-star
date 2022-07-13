package com.devonfw.application.bookingmanangement.utils;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.querydsl.jpa.impl.JPAQuery;

public class QueryUtil {

  public static <E> Page<E> findPaginated(Pageable pageable, JPAQuery<E> query, boolean determineTotal) {

    long total = -1;
    if (determineTotal) {
      total = query.clone().fetchCount();
    }
    long offset = 0;
    if (pageable != null) {
      offset = pageable.getOffset();
      query.offset(offset);
      query.limit(pageable.getPageSize());
      // applySort(query, pageable.getSort());
    }
    List<E> hits = query.fetch();
    if (total == -1) {
      total = offset + hits.size();
    }
    return new PageImpl<>(hits, pageable, total);
  }
}
