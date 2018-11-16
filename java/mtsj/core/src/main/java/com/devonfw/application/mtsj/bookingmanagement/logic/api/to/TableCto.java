package com.devonfw.application.mtsj.bookingmanagement.logic.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of Table
 */
public class TableCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private TableEto table;

  public TableEto getTable() {

    return this.table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

}
