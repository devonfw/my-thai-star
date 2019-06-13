package com.devonfw.application.mtsj.general.common.base;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import com.devonfw.application.mtsj.general.common.DbTestHelper;
import com.devonfw.application.mtsj.general.common.RestTestClientBuilder;
import com.devonfw.application.mtsj.general.common.SecurityTestHelper;
import com.devonfw.application.mtsj.general.service.impl.config.RestaurantTestConfig;
import com.devonfw.module.basic.common.api.config.SpringProfileConstants;
import com.devonfw.module.test.common.base.SubsystemTest;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

/**
 * Abstract base class for {@link SubsystemTest}s which runs the tests within a local server. <br/>
 * <br/>
 * The local server's port is randomly assigned.
 *
 */
@SpringBootTest(classes = RestaurantTestConfig.class)
@ActiveProfiles(profiles = { SpringProfileConstants.JUNIT })
public abstract class AbstractRestServiceTest extends SubsystemTest {

  /**
   * The port of the web server during the test.
   */
  @Value("${local.server.port}")
  protected int port;

  /**
   * The {@code RestaurantTestHelper}.
   */
  @Inject
  private SecurityTestHelper securityTestHelper;

  @Inject
  private DbTestHelper dbTestHelper;

  /**
   * The {@code RestTestClientBuilder}.
   */
  @Inject
  private RestTestClientBuilder restTestClientBuilder;

  /**
   * The {@code JacksonJsonProvider}
   */
  @Inject
  private JacksonJsonProvider jacksonJsonProvider;

  /**
   * Sets up the test.
   */
  @Override
  protected void doSetUp() {

    super.doSetUp();
    this.restTestClientBuilder.setLocalServerPort(this.port);
    this.restTestClientBuilder.setJacksonJsonProvider(this.jacksonJsonProvider);

  }

  /**
   * Cleans up the test.
   */
  @Override
  protected void doTearDown() {

    super.doTearDown();
  }

  /**
   * @return the {@link SecurityTestHelper}
   */
  public SecurityTestHelper getSecurityTestHelper() {

    return this.securityTestHelper;
  }

  /**
   * @return the {@link DbTestHelper}
   */
  public DbTestHelper getDbTestHelper() {

    return this.dbTestHelper;
  }

  /**
   * @return the {@link RestTestClientBuilder}
   */
  public RestTestClientBuilder getRestTestClientBuilder() {

    return this.restTestClientBuilder;
  }

}
