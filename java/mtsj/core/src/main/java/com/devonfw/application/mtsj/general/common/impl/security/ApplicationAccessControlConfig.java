package com.devonfw.application.mtsj.general.common.impl.security;

import javax.annotation.security.RolesAllowed;
import javax.inject.Named;

import com.devonfw.module.security.common.api.accesscontrol.AccessControlGroup;
import com.devonfw.module.security.common.base.accesscontrol.AccessControlConfig;

/**
 * This class configures access control objects for authorization. To be used with {@link RolesAllowed} annotation.
 */
@Named
public class ApplicationAccessControlConfig extends AccessControlConfig {

  private static final String APP_ID = "mts";

  private static final String PREFIX = APP_ID + ".";

  public static final String PERMISSION_FIND_CATEGORY = PREFIX + "FindCategory";

  public static final String PERMISSION_DELETE_CATEGORY = PREFIX + "DeleteCategory";

  public static final String PERMISSION_SAVE_CATEGORY = PREFIX + "SaveCategory";

  public static final String PERMISSION_FIND_DISH = PREFIX + "FindDish";

  public static final String PERMISSION_DELETE_DISH = PREFIX + "DeleteDish";

  public static final String PERMISSION_SAVE_DISH = PREFIX + "SaveDish";

  public static final String PERMISSION_FIND_INGREDIENT = PREFIX + "FindIngredient";

  public static final String PERMISSION_DELETE_INGREDIENT = PREFIX + "DeleteIngredient";

  public static final String PERMISSION_SAVE_INGREDIENT = PREFIX + "SaveIngredient";

  public static final String GROUP_WAITER = PREFIX + "Waiter";

  /**
   * Defining access control groups in the constructor.
   */
  public ApplicationAccessControlConfig() {

    super();
    AccessControlGroup waiter = group(GROUP_WAITER, PERMISSION_FIND_CATEGORY, PERMISSION_DELETE_CATEGORY,
        PERMISSION_SAVE_CATEGORY);
  }

}
