package com.devonfw.application.mtsj.general.common;

import static org.junit.Assert.assertNotNull;

import java.lang.reflect.Method;
import java.util.Set;

import javax.annotation.security.DenyAll;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;

import net.sf.mmm.util.filter.api.Filter;
import net.sf.mmm.util.reflect.api.ReflectionUtil;
import net.sf.mmm.util.reflect.base.ReflectionUtilImpl;

import org.assertj.core.api.SoftAssertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.dishmanagement.logic.impl.DishmanagementImpl;
import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
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
	  TestUtil.login("waiter", ApplicationAccessControlConfig.PERMISSION_FIND_CATEGORY);
	  dishmanagementImpl.findIngredient(1L);
	  TestUtil.logout();
  }

/**
* Check if access to a {@link RolesAllowed} annotated method will be granted to a user that has the required permission.
*/
  @Test()
  public void permissionAccessGranted() {
	  TestUtil.login("waiter", ApplicationAccessControlConfig.PERMISSION_FIND_CATEGORY, ApplicationAccessControlConfig.PERMISSION_FIND_INGREDIENT);
	  dishmanagementImpl.findIngredient(1L);
	  TestUtil.logout();
  }
}
