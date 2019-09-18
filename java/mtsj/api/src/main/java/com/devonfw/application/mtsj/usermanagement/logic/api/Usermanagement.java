package com.devonfw.application.mtsj.usermanagement.logic.api;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.general.common.api.UserProfile;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserQrCodeTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserSearchCriteriaTo;

/**
 * Interface for Usermanagement component.
 */
public interface Usermanagement {

  /**
   * Returns a User by its id 'id'.
   *
   * @param id The id 'id' of the User.
   * @return The {@link UserEto} with id 'id'
   */
  UserEto findUser(Long id);

  /**
   * Returns a User by its userName 'userName'.
   *
   * @param userName The userName 'userName' of the User.
   * @return The {@link UserEto} with userName 'userName'
   */
  UserEto findUserbyName(String userName);

  /**
   * Returns a paginated list of Users matching the search criteria.
   *
   * @param criteria the {@link UserSearchCriteriaTo}.
   * @return the {@link List} of matching {@link UserEto}s.
   */
  Page<UserEto> findUserEtos(UserSearchCriteriaTo criteria);

  /**
   * Deletes a user from the database by its id 'userId'.
   *
   * @param userId Id of the user to delete
   * @return boolean <code>true</code> if the user can be deleted, <code>false</code> otherwise
   */
  boolean deleteUser(Long userId);

  /**
   * Saves a user and store it in the database.
   *
   * @param user the {@link UserEto} to create.
   * @return the new {@link UserEto} that has been saved with ID and version.
   */
  UserEto saveUser(UserEto user);

  /**
   * Pick the boolean and persist it for the user.
   *
   * @param user the {@link UserEto} to create.
   * @return the new {@link UserEto} that has been saved with ID and version.
   */
  UserEto saveUserTwoFactor(UserEto user);

  /**
   * Only returns the necessary info.
   *
   * @param username the {@link String} to create.
   * @return the new {@link UserEto} that has been saved with ID and version.
   */
  UserEto getUserStatus(String username);

  /**
   * Create an QR Code to the belonging user
   *
   * @param username the {@link UserQrCodeTo} to create.
   */
  UserQrCodeTo generateUserQrCode(String username);

  /**
   * Returns a UserRole by its id 'id'.
   *
   * @param id The id 'id' of the UserRole.
   * @return The {@link UserRoleEto} with id 'id'
   */
  UserRoleEto findUserRole(Long id);

  /**
   * Returns a paginated list of UserRoles matching the search criteria.
   *
   * @param criteria the {@link UserRoleSearchCriteriaTo}.
   * @return the {@link List} of matching {@link UserRoleEto}s.
   */
  Page<UserRoleEto> findUserRoleEtos(UserRoleSearchCriteriaTo criteria);

  /**
   * Deletes a userRole from the database by its id 'userRoleId'.
   *
   * @param userRoleId Id of the userRole to delete
   * @return boolean <code>true</code> if the userRole can be deleted, <code>false</code> otherwise
   */
  boolean deleteUserRole(Long userRoleId);

  /**
   * Saves a userRole and store it in the database.
   *
   * @param userRole the {@link UserRoleEto} to create.
   * @return the new {@link UserRoleEto} that has been saved with ID and version.
   */
  UserRoleEto saveUserRole(UserRoleEto userRole);

  /**
   * @param login The login of the requested user.
   * @return The {@link UserProfile} with the given <code>login</code> or {@code null} if no such object exists.
   */
  UserProfile findUserProfileByLogin(String login);

}
