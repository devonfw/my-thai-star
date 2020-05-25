package com.devonfw.application.mtsj.general.common;

import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.util.Set;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

import net.sf.mmm.util.filter.api.Filter;
import net.sf.mmm.util.reflect.api.ReflectionUtil;
import net.sf.mmm.util.reflect.base.ReflectionUtilImpl;

import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.impl.BookingmanagementImpl;
import com.devonfw.application.mtsj.dishmanagement.logic.impl.DishmanagementImpl;
import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.application.mtsj.imagemanagement.logic.impl.ImagemanagementImpl;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderSearchCriteriaTo;
import com.devonfw.application.mtsj.ordermanagement.logic.impl.OrdermanagementImpl;
import com.devonfw.application.mtsj.usermanagement.logic.impl.UsermanagementImpl;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * Tests the permission check in logic layer.
 *
 */
// @RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SpringBootApp.class)
public class PermissionCheckTest extends ComponentTest {

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
  @Test
  public void permissionAccessDenied() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    Timestamp timestamp = new Timestamp(100L);
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setBookingDate(timestamp.toInstant());
    criteria.setExpirationDate(timestamp.toInstant());
    criteria.setCreationDate(timestamp.toInstant());
    criteria.setPageable(pageable);
    Assertions.assertThrows(AccessDeniedException.class, () -> {
      this.bookingmanagementImpl.findBookingsByPost(criteria);
    });
  }

  // ================================================================================
  // {@link BookingmanagementImpl} method permissions tests
  // ================================================================================

  @Test()
  public void permissionFindBookingsByPost() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_BOOKING);
    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    Timestamp timestamp = new Timestamp(100L);
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setBookingDate(timestamp.toInstant());
    criteria.setExpirationDate(timestamp.toInstant());
    criteria.setCreationDate(timestamp.toInstant());
    criteria.setPageable(pageable);
    this.bookingmanagementImpl.findBookingsByPost(criteria);
  }

  // ================================================================================
  // {@link OrdermanagementImpl} method permissions tests
  // ================================================================================

  @Test
  public void permissionFindOrdersByPost() {

    TestUtil.login("user", ApplicationAccessControlConfig.PERMISSION_FIND_ORDER);
    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    PageRequest pageable = PageRequest.of(0, 100);
    criteria.setPageable(pageable);
    this.ordermanagementImpl.findOrdersByPost(criteria);
  }

  /**
   * It logs out after every test method.
   */
  @AfterEach
  public void logout() {

    TestUtil.logout();
  }
}
