package com.devonfw.application.mtsj.general.common.impl.security;

import javax.annotation.security.RolesAllowed;
import javax.inject.Named;

import com.devonfw.application.mtsj.general.common.api.constants.Roles;
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

  public static final String PERMISSION_FIND_GEO_CLUSTER = PREFIX + "GetGeoCluster";

  public static final String PERMISSION_FIND_NEXT_WEEK_PREDICTION = PREFIX + "GetNextWeekPrediction";

  public static final String GROUP_READ_MASTER_DATA = PREFIX + "ReadMasterData";

  public static final String GROUP_ADMIN = "Admin";

  public static final String GROUP_WAITER = Roles.WAITER;

  public static final String GROUP_CUSTOMER = Roles.CUSTOMER;

  public static final String GROUP_MANAGER = Roles.MANAGER;

  /**
   * Defining access control groups in the constructor.
   */
  public ApplicationAccessControlConfig() {

    super();

    AccessControlGroup waiter = group(GROUP_WAITER, PERMISSION_FIND_ORDER, PERMISSION_FIND_BOOKING);

    AccessControlGroup manager = group(GROUP_MANAGER, PERMISSION_FIND_BOOKING, PERMISSION_FIND_ORDER,
        PERMISSION_FIND_NEXT_WEEK_PREDICTION, PERMISSION_FIND_GEO_CLUSTER);

    AccessControlGroup customer = group(GROUP_CUSTOMER, PERMISSION_FIND_BOOKING, PERMISSION_FIND_ORDER);

  }

}