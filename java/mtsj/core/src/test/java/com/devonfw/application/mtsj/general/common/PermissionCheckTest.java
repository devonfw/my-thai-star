package com.devonfw.application.mtsj.general.common;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

import net.sf.mmm.util.filter.api.Filter;
import net.sf.mmm.util.reflect.api.ReflectionUtil;
import net.sf.mmm.util.reflect.base.ReflectionUtilImpl;

import org.assertj.core.api.SoftAssertions;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.TableEto;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.TableSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.impl.BookingmanagementImpl;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.CategoryEto;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.CategorySearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.DishCto;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.DishSearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.IngredientEto;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.IngredientSearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.logic.impl.DishmanagementImpl;
import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.application.mtsj.imagemanagement.common.api.to.ImageEto;
import com.devonfw.application.mtsj.imagemanagement.common.api.to.ImageSearchCriteriaTo;
import com.devonfw.application.mtsj.imagemanagement.logic.impl.ImagemanagementImpl;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderLineEto;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderLineSearchCriteriaTo;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderSearchCriteriaTo;
import com.devonfw.application.mtsj.ordermanagement.logic.impl.OrdermanagementImpl;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.logic.impl.UsermanagementImpl;
import com.devonfw.module.test.common.base.ModuleTest;

/**
 * Tests the permission check in logic layer.
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SpringBootApp.class)
public class PermissionCheckTest extends ModuleTest {

  @Inject
  private DishmanagementImpl dishmanagementImpl;

  @Inject
  private BookingmanagementImpl bookingmanagementImpl;

  @Inject
  private ImagemanagementImpl imagemanagementImpl;

  @Inject
  private OrdermanagementImpl ordermanagementImpl;

  @Inject
  private UsermanagementImpl usermanagementImpl;

  /**
   * Check if all relevant methods in use case implementations have permission checks i.e. {@link RolesAllowed},
   * {@link DenyAll} or {@link PermitAll} annotation is applied. This is only checked for methods that are declared in
   * the corresponding interface and thus have the {@link Override} annotations applied.
   */
  @Test
  public void permissionCheckAnnotationPresent() {

    String packageName = "com.devonfw.application.mtsj";
    Filter<String> filter = new Filter<String>() {

      @Override
      public boolean accept(String value) {

        return value.contains(".logic.impl.usecase.Uc") && value.endsWith("Impl");
      }

    };
    ReflectionUtil ru = ReflectionUtilImpl.getInstance();
    Set<String> classNames = ru.findClassNames(packageName, true, filter);
    Set<Class<?>> classes = ru.loadClasses(classNames);
    SoftAssertions assertions = new SoftAssertions();
    for (Class<?> clazz : classes) {
      Method[] methods = clazz.getDeclaredMethods();
      for (Method method : methods) {
        Method parentMethod = ru.getParentMethod(method);
        if (parentMethod != null) {
          Class<?> declaringClass = parentMethod.getDeclaringClass();
          if (declaringClass.isInterface() && declaringClass.getSimpleName().startsWith("Uc")) {
            boolean hasAnnotation = false;
            if (method.getAnnotation(RolesAllowed.class) != null || method.getAnnotation(DenyAll.class) != null
                || method.getAnnotation(PermitAll.class) != null) {
              hasAnnotation = true;
            }
            assertions.assertThat(hasAnnotation)
                .as("Method " + method.getName() + " in Class " + clazz.getSimpleName() + " is missing access control")
                .isTrue();
          }
        }
      }
    }
    assertions.assertAll();
  }

  /**
   * Check if access to a {@link RolesAllowed} annotated method will be denied to an unauthorized user.
   */
  @Test(expected = AccessDeniedException.class)
  public void permissionAccessDenied() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_CATEGORY);
    this.dishmanagementImpl.findIngredient(1L);
  }

  // ================================================================================
  // {@link DishmanagementImpl} method permissions tests
  // ================================================================================

  @Test()
  public void permissionFindCategory() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_CATEGORY);
    this.dishmanagementImpl.findCategory(0L);
  };

  @Test()
  public void permissionfindCategoryEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_CATEGORY);
    CategorySearchCriteriaTo criteria = new CategorySearchCriteriaTo();
    criteria.setShowOrder(1);
    PageRequest pageable = PageRequest.of(0, 100, new Sort(Direction.ASC, "name"));
    criteria.setPageable(pageable);
    this.dishmanagementImpl.findCategoryEtos(criteria);
  }

  @Test()
  public void permissionDeleteCategory() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_CATEGORY);
    this.dishmanagementImpl.deleteCategory(2L);
  }

  @Test()
  public void permissionSaveCategory() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_CATEGORY);
    this.dishmanagementImpl.saveCategory(new CategoryEto());

  }

  @Test()
  public void permissionFindDish() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_DISH);
    this.dishmanagementImpl.findDish(0L);
  }

  @Test()
  public void permissionFindDishCtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_DISH);
    DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
    List<CategoryEto> categories = new ArrayList<>();
    criteria.setCategories(categories);
    PageRequest pageable = PageRequest.of(0, 100, new Sort(Direction.ASC, "name"));
    criteria.setPageable(pageable);
    this.dishmanagementImpl.findDishCtos(criteria);
  }

  @Test()
  public void permissionDeleteDish() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_DISH);
    this.dishmanagementImpl.deleteDish(1L);
  }

  @Test()
  public void permissionFindDishesByCategory() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_DISH);
    DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
    List<CategoryEto> categories = new ArrayList<>();
    criteria.setCategories(categories);
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    Page<DishCto> result = this.dishmanagementImpl.findDishesByCategory(criteria, "Main Dishes");
  }

  @Test()
  public void permissionFindIngredient() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INGREDIENT);
    this.dishmanagementImpl.findIngredient(1L);
  }

  @Test()
  public void permissionFindIngredientEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INGREDIENT);
    IngredientSearchCriteriaTo criteria = new IngredientSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.dishmanagementImpl.findIngredientEtos(criteria);
  }

  @Test()
  public void permissionSaveIngredient() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_INGREDIENT);
    this.dishmanagementImpl.saveIngredient(new IngredientEto());
  }

  // ================================================================================
  // {@link BookingmanagementImpl} method permissions tests
  // ================================================================================

  @Test()
  public void permissionFindBooking() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    this.bookingmanagementImpl.findBooking(1L);
  }

  @Test()
  public void permissionFindBookingByToken() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    this.bookingmanagementImpl.findBookingByToken("token");
  }

  @Test()
  public void permissionFindInvitedGuestByToken() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INVITED_GUESTS);
    this.bookingmanagementImpl.findInvitedGuestByToken("token");
  }

  @Test()
  public void permissionFindBookingsByPost() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    Timestamp timestamp = new Timestamp(100L);
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setBookingDate(timestamp);
    criteria.setExpirationDate(timestamp);
    criteria.setCreationDate(timestamp);
    criteria.setPageable(pageable);
    this.bookingmanagementImpl.findBookingsByPost(criteria);
  }

  @Test()
  public void permissionFindBookingCtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    Timestamp timestamp = new Timestamp(100L);
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setBookingDate(timestamp);
    criteria.setExpirationDate(timestamp);
    criteria.setCreationDate(timestamp);
    criteria.setPageable(pageable);
    this.bookingmanagementImpl.findBookingCtos(criteria);
  }

  @Test()
  public void permissionDeleteBooking() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_BOOKING,
        ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    this.bookingmanagementImpl.deleteBooking(1L);
  }

  @Test()
  public void permissionFindInvitedGuest() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INVITED_GUESTS);
    this.bookingmanagementImpl.findInvitedGuest(0L);
  }

  @Test()
  public void permissionFindInvitedGuestBybooking() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INVITED_GUESTS);
    this.bookingmanagementImpl.findInvitedGuestByBooking(0L);
  }

  @Test()
  public void permissionFindInvitedGuestEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_INVITED_GUESTS);
    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setModificationDate(new Timestamp(System.currentTimeMillis()));
    criteria.setPageable(pageable);
    this.bookingmanagementImpl.findInvitedGuestEtos(criteria);
  }

  @Test()
  public void permissionDeleteInvitedGuest() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_INVITED_GUESTS,
        ApplicationAccessControlConfig.PERMISSION_FIND_ORDER, ApplicationAccessControlConfig.PERMISSION_DELETE_ORDER,
        ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    this.bookingmanagementImpl.deleteInvitedGuest(2L);
  }

  @Test()
  public void permissionSaveInvitedGuest() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_INVITED_GUESTS);
    InvitedGuestEto invitedGuestEto = new InvitedGuestEto();
    invitedGuestEto.setBookingId(0L);
    invitedGuestEto.setId(10L);
    this.bookingmanagementImpl.saveInvitedGuest(invitedGuestEto);
  }

  @Test()
  public void permissionFindTable() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_TABLE);
    this.bookingmanagementImpl.findTable(1L);
  }

  @Test()
  public void permissionFindTableEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_TABLE);
    TableSearchCriteriaTo criteria = new TableSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.bookingmanagementImpl.findTableEtos(criteria);
  }

  @Test()
  public void permissionDeleteTable() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_TABLE);
    this.bookingmanagementImpl.deleteTable(8L);
  }

  @Test
  public void permissionSaveTable() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_TABLE);
    TableEto tableEto = new TableEto();
    tableEto.setSeatsNumber(10);
    this.bookingmanagementImpl.saveTable(tableEto);
  }

  // ================================================================================
  // {@link ImagemanagementImpl} method permissions tests
  // ================================================================================

  @Test
  public void permissionFindImage() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_IMAGE);
    this.imagemanagementImpl.findImage(0L);
  }

  @Test
  public void permissionFindImageEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_IMAGE);
    ImageSearchCriteriaTo criteria = new ImageSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.imagemanagementImpl.findImageEtos(criteria);
  }

  /**
   * deleteDish() and deleteOrderLine() with their respective permissions are required to successfully delete the image.
   */
  @Test
  public void permissionDeleteImage() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_IMAGE,
        ApplicationAccessControlConfig.PERMISSION_DELETE_DISH,
        ApplicationAccessControlConfig.PERMISSION_DELETE_ORDER_LINE);
    this.ordermanagementImpl.deleteOrderLine(3L);
    this.ordermanagementImpl.deleteOrderLine(1L);
    this.dishmanagementImpl.deleteDish(4L);
    this.imagemanagementImpl.deleteImage(4L);
  }

  @Test
  public void permissionSaveImage() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_IMAGE);
    this.imagemanagementImpl.saveImage(new ImageEto());
  }

  // ================================================================================
  // {@link OrdermanagementImpl} method permissions tests
  // ================================================================================

  @Test
  public void permissionFindOrder() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    this.ordermanagementImpl.findOrder(0L);
  }

  @Test
  public void permissionFindOrdersByPost() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.ordermanagementImpl.findOrdersByPost(criteria);
  }

  @Test
  public void permissionFindOrdersByInvitedGuests() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    this.ordermanagementImpl.findOrdersByInvitedGuest(0L);
  }

  @Test
  public void permissionFindOrdersByBookingToken() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    this.ordermanagementImpl.findOrdersByBookingToken("token");
  }

  @Test
  public void permissionFindOrderCtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.ordermanagementImpl.findOrderCtos(criteria);
  }

  @Test
  public void permissionFindOrders() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    this.ordermanagementImpl.findOrders(0L);
  }

  @Test
  public void permissionDeleteOrder() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_ORDER,
        ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    this.ordermanagementImpl.deleteOrder(1L);
  }

  @Test
  public void permissionFindOrderLine() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER_LINE);
    this.ordermanagementImpl.findOrderLine(1L);
  }

  @Test
  public void permissionFindOrderLineCtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER_LINE);
    OrderLineSearchCriteriaTo criteria = new OrderLineSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.ordermanagementImpl.findOrderLineCtos(criteria);
  }

  @Test
  public void permissionDeleteOrderLine() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_ORDER_LINE);
    this.ordermanagementImpl.deleteOrderLine(0L);
  }

  @Test
  public void permissionSaveOrderLine() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_ORDER_LINE);
    OrderLineEto orderLineEto = new OrderLineEto();
    orderLineEto.setDishId(0L);
    orderLineEto.setOrderId(0L);
    this.ordermanagementImpl.saveOrderLine(orderLineEto);
  }

  // ================================================================================
  // {@link UsermanagementImpl} method permissions tests
  // ================================================================================

  @Test
  public void permissionFindUser() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_USER);
    this.usermanagementImpl.findUser(0L);
  }

  @Test
  public void permissionFindUserEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_USER);
    UserSearchCriteriaTo criteria = new UserSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.usermanagementImpl.findUserEtos(criteria);
  }

  @Test
  public void permissionDeleteUser() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_USER);
    this.usermanagementImpl.deleteUser(1L);
  }

  @Test
  public void permissionSaveUser() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_USER);
    UserEto userEto = new UserEto();
    userEto.setUserRoleId(0L);
    this.usermanagementImpl.saveUser(userEto);
  }

  @Test
  public void permissionFindUserRole() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_USER_ROLE);
    this.usermanagementImpl.findUserRole(0L);
  }

  @Test
  public void permissionFindUserRoleEtos() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_USER_ROLE);
    UserRoleSearchCriteriaTo criteria = new UserRoleSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    criteria.setName("name");
    this.usermanagementImpl.findUserRoleEtos(criteria);
  }

  @Test
  public void permissionDeleteUserRole() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_DELETE_USER_ROLE);
    this.usermanagementImpl.deleteUserRole(1L);
  }

  @Test
  public void permissionSaveUserRole() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_SAVE_USER_ROLE);
    UserRoleEto userRoleEto = new UserRoleEto();
    this.usermanagementImpl.saveUserRole(userRoleEto);
  }

  /**
   * It logs out after every test method.
   */
  @After
  public void logout() {

    TestUtil.logout();
  }
}
