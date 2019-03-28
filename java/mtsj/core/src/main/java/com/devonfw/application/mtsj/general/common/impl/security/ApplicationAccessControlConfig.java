package com.devonfw.application.mtsj.general.common.impl.security;

import java.util.Arrays;

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

  public static final String PERMISSION_FIND_BOOKING = PREFIX + "FindBooking";

  public static final String PERMISSION_DELETE_BOOKING = PREFIX + "DeleteBooking";

  public static final String PERMISSION_SAVE_BOOKING = PREFIX + "SaveBooking";

  public static final String PERMISSION_FIND_INVITED_GUESTS = PREFIX + "FindInvitedGuests";

  public static final String PERMISSION_DELETE_INVITED_GUESTS = PREFIX + "DeleteInvitedGuests";

  public static final String PERMISSION_SAVE_INVITED_GUESTS = PREFIX + "SaveInvitedGuests";

  public static final String PERMISSION_FIND_TABLE = PREFIX + "FindTable";

  public static final String PERMISSION_DELETE_TABLE = PREFIX + "DeleteTable";

  public static final String PERMISSION_SAVE_TABLE = PREFIX + "SaveTable";

  public static final String PERMISSION_FIND_IMAGE = PREFIX + "FindImage";

  public static final String PERMISSION_DELETE_IMAGE = PREFIX + "DeleteImage";

  public static final String PERMISSION_SAVE_IMAGE = PREFIX + "SaveImage";

  public static final String PERMISSION_FIND_ORDER = PREFIX + "FindOrder";

  public static final String PERMISSION_DELETE_ORDER = PREFIX + "DeleteOrder";

  public static final String PERMISSION_SAVE_ORDER = PREFIX + "SaveOrder";

  public static final String PERMISSION_FIND_ORDER_LINE = PREFIX + "FindOrderLine";

  public static final String PERMISSION_DELETE_ORDER_LINE = PREFIX + "DeleteOrderLine";

  public static final String PERMISSION_SAVE_ORDER_LINE = PREFIX + "SaveOrderLine";

  public static final String PERMISSION_FIND_USER = PREFIX + "FindUser";

  public static final String PERMISSION_DELETE_USER = PREFIX + "DeleteUser";

  public static final String PERMISSION_SAVE_USER = PREFIX + "SaveUser";

  public static final String PERMISSION_FIND_USER_ROLE = PREFIX + "FindUserRole";

  public static final String PERMISSION_DELETE_USER_ROLE = PREFIX + "DeleteUserRole";

  public static final String PERMISSION_SAVE_USER_ROLE = PREFIX + "SaveUserRole";

  public static final String GROUP_ADMIN = PREFIX + "Admin";

  public static final String GROUP_WAITER = PREFIX + "Waiter";

  public static final String GROUP_CUSTOMER = PREFIX + "Customer";

  /**
   * Defining access control groups in the constructor.
   */
  public ApplicationAccessControlConfig() {

    super();

    // What permissions should belong to waiter?
    AccessControlGroup waiter = group(GROUP_WAITER, PERMISSION_FIND_CATEGORY, PERMISSION_DELETE_CATEGORY,
        PERMISSION_SAVE_CATEGORY);

    AccessControlGroup customer = group(GROUP_CUSTOMER, PERMISSION_FIND_CATEGORY, PERMISSION_SAVE_BOOKING,
        PERMISSION_SAVE_ORDER, PERMISSION_FIND_BOOKING);

    AccessControlGroup admin = group(GROUP_ADMIN, Arrays.asList(waiter, customer), PERMISSION_FIND_DISH,
        PERMISSION_DELETE_DISH, PERMISSION_SAVE_DISH, PERMISSION_FIND_INGREDIENT, PERMISSION_DELETE_INGREDIENT,
        PERMISSION_SAVE_INGREDIENT, PERMISSION_DELETE_BOOKING, PERMISSION_FIND_INVITED_GUESTS,
        PERMISSION_DELETE_INVITED_GUESTS, PERMISSION_SAVE_INVITED_GUESTS, PERMISSION_FIND_TABLE,
        PERMISSION_DELETE_TABLE, PERMISSION_SAVE_TABLE, PERMISSION_FIND_IMAGE, PERMISSION_DELETE_IMAGE,
        PERMISSION_SAVE_IMAGE, PERMISSION_FIND_ORDER, PERMISSION_DELETE_ORDER, PERMISSION_FIND_ORDER_LINE,
        PERMISSION_DELETE_ORDER_LINE, PERMISSION_SAVE_ORDER_LINE, PERMISSION_FIND_USER, PERMISSION_DELETE_USER,
        PERMISSION_SAVE_USER, PERMISSION_FIND_USER_ROLE, PERMISSION_DELETE_USER_ROLE, PERMISSION_SAVE_USER_ROLE);

  }

}