package io.oasp.application.mtsj.imagemanagement.logic.impl;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.oasp.application.mtsj.SpringBootApp;
import io.oasp.application.mtsj.imagemanagement.logic.api.Imagemanagement;
import io.oasp.application.mtsj.imagemanagement.logic.api.to.ImageEto;
import io.oasp.module.test.common.base.ComponentTest;

/**
 * Tests for {@link Imagemanagement} component.
 *
 */
@SpringBootTest(classes = SpringBootApp.class)
public class ImagemanagementTest extends ComponentTest {

  @Inject
  private Imagemanagement imageManagement;

  /**
   * This test gets an image by id
   */
  @Test
  public void findImageById() {

    ImageEto eto = this.imageManagement.findImage(0L);
    assertThat(eto).isNotNull();
    assertThat(eto.getName()).isEqualTo("basil-fried");
  }
}
