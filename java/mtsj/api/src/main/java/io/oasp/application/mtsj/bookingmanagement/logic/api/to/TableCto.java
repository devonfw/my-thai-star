package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Table
 */
public class TableCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private TableEto table;

  public TableEto getTable() {

    return table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

}
