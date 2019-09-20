package com.devonfw.application.mtsj.general.common;

import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * This class provides login with admin permissions and logout for component tests.
 */
public abstract class ApplicationComponentTest extends ComponentTest {

  @Override
  protected void doSetUp() {

    TestUtil.login("admin", ApplicationAccessControlConfig.GROUP_ADMIN);
  }

  @Override
  protected void doTearDown() {

    TestUtil.logout();
  }

}
