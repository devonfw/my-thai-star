package io.oasp.application.mtsj.ordermanagement.dataaccess.api;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Order}.
 */
@Entity
@Table(name = "Order")
public class OrderEntity {

  private Long idReservation;

  private Long idInvitationGuest;

  private List<OrderLine> orderLines;
}
