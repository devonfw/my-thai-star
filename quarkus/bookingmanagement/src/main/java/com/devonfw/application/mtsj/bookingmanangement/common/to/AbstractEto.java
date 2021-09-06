package com.devonfw.application.mtsj.bookingmanangement.common.to;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public abstract class AbstractEto {
  private int modificationCounter;

  private Long id;
}
