package io.oasp.application.mtsj.platemanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Plate
 */
public class PlateCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private PlateEto plate;

  /**
   * @return plate
   */
  public PlateEto getPlate() {

    return this.plate;
  }

  /**
   * @param plate the plate to set
   */
  public void setPlate(PlateEto plate) {

    this.plate = plate;
  }

}
