package com.devonfw.application.mtsj.usermanagement.logic.impl;

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.jboss.aerogear.security.otp.api.Base32;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.devonfw.application.mtsj.general.common.api.UserProfile;
import com.devonfw.application.mtsj.general.common.api.datatype.Role;
import com.devonfw.application.mtsj.general.common.api.exception.UserAlreadyExistsException;
import com.devonfw.application.mtsj.general.common.api.to.UserDetailsClientTo;
import com.devonfw.application.mtsj.general.common.base.QrCodeService;
import com.devonfw.application.mtsj.general.logic.base.AbstractComponentFacade;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserQrCodeTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserRoleEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRepository;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRoleRepository;
import com.devonfw.application.mtsj.usermanagement.logic.api.Usermanagement;

/**
 * Implementation of component interface of usermanagement
 */
@Named
@Transactional
public class UsermanagementImpl extends AbstractComponentFacade implements Usermanagement {

  private static final Logger LOG = LoggerFactory.getLogger(UsermanagementImpl.class);

  @Inject
  private UserRepository userDao;

  @Inject
  private UserRoleRepository userRoleDao;

  @Inject
  private PasswordEncoder passwordEncoder;

  /**
   * The constructor.
   */
  public UsermanagementImpl() {

    super();
  }

  @Override
  public UserEto findUser(Long id) {

    LOG.debug("Get User with id {} from database.", id);
    return getBeanMapper().map(getUserDao().find(id), UserEto.class);
  }

  @Override
  public UserQrCodeTo generateUserQrCode(String username) {

    LOG.debug("Get User with username {} from database.", username);
    UserEntity user = getBeanMapper().map(getUserDao().findByUsername(username), UserEntity.class);
    initializeSecret(user);
    if (user != null && user.getTwoFactorStatus()) {
      return QrCodeService.generateQrCode(user);
    } else {
      return null;
    }
  }

  @Override
  public UserEto getUserStatus(String username) {

    LOG.debug("Get User with username {} from database.", username);
    return getBeanMapper().map(getUserDao().findByUsername(username), UserEto.class);
  }

  @Override
  public UserEto findUserbyName(String userName) {

    UserEntity entity = this.userDao.findByUsername(userName);
    return getBeanMapper().map(entity, UserEto.class);
  }

  @Override
  public Page<UserEto> findUserEtos(UserSearchCriteriaTo criteria) {

    Page<UserEntity> users = getUserDao().findUsers(criteria);
    return mapPaginatedEntityList(users, UserEto.class);
  }

  @Override
  public boolean deleteUser(Long userId) {

    UserEntity user = getUserDao().find(userId);
    getUserDao().delete(user);
    LOG.debug("The user with id '{}' has been deleted.", userId);
    return true;
  }

  @Override
  public UserEto saveUser(UserEto user) {

    Objects.requireNonNull(user, "user");

    if (user.getUserRoleId() == null) {
      user.setUserRoleId(0L);
    }

    UserEntity userEntity = getBeanMapper().map(user, UserEntity.class);
    userEntity.setPassword(this.passwordEncoder.encode(userEntity.getPassword()));

    // initialize, validate userEntity here if necessary
    UserEntity existingUser = this.userDao.findByUsername(user.getUsername());
    if (existingUser == null) {
      UserEntity resultEntity = getUserDao().save(userEntity);
      LOG.debug("User with id '{}' has been created.", resultEntity.getId());
      return getBeanMapper().map(resultEntity, UserEto.class);
    } else {
      throw new UserAlreadyExistsException();
    }
  }

  @Override
  public UserEto saveUserTwoFactor(UserEto user) {

    Objects.requireNonNull(user, "user");
    UserEntity userEntity = getBeanMapper().map(getUserDao().findByUsername(user.getUsername()), UserEntity.class);

    // initialize, validate userEntity here if necessary
    userEntity.setTwoFactorStatus(user.getTwoFactorStatus());
    UserEntity resultEntity = getUserDao().save(userEntity);
    LOG.debug("User with id '{}' has been modified.", resultEntity.getId());
    return getBeanMapper().map(resultEntity, UserEto.class);
  }

  /**
   * Returns the field 'userDao'.
   *
   * @return the {@link UserRepository} instance.
   */
  public UserRepository getUserDao() {

    return this.userDao;
  }

  @Override
  public UserRoleEto findUserRole(Long id) {

    LOG.debug("Get UserRole with id {} from database.", id);
    return getBeanMapper().map(getUserRoleDao().find(id), UserRoleEto.class);
  }

  @Override
  public Page<UserRoleEto> findUserRoleEtos(UserRoleSearchCriteriaTo criteria) {

    Page<UserRoleEntity> userroles = getUserRoleDao().findUserRoles(criteria);
    return mapPaginatedEntityList(userroles, UserRoleEto.class);
  }

  @Override
  public boolean deleteUserRole(Long userRoleId) {

    UserRoleEntity userRole = getUserRoleDao().find(userRoleId);
    getUserRoleDao().delete(userRole);
    LOG.debug("The userRole with id '{}' has been deleted.", userRoleId);
    return true;
  }

  @Override
  public UserRoleEto saveUserRole(UserRoleEto userRole) {

    Objects.requireNonNull(userRole, "userRole");
    UserRoleEntity userRoleEntity = getBeanMapper().map(userRole, UserRoleEntity.class);

    // initialize, validate userRoleEntity here if necessary
    UserRoleEntity resultEntity = getUserRoleDao().save(userRoleEntity);
    LOG.debug("UserRole with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, UserRoleEto.class);
  }

  /**
   * Assigns a randomly generated secret for an specific user
   *
   * @param user
   */
  private void initializeSecret(UserEntity user) {

    if (user.getSecret() == null) {
      user.setSecret(Base32.random());
      UserEntity resultEntity = getUserDao().save(user);
      LOG.debug("User with id '{}' has been modified.", resultEntity.getId());
    }
  }

  /**
   * Returns the field 'userRoleDao'.
   *
   * @return the {@link UserRoleRepository} instance.
   */
  public UserRoleRepository getUserRoleDao() {

    return this.userRoleDao;
  }

  @Override
  public UserProfile findUserProfileByLogin(String login) {

    UserEto userEto = findUserbyName(login);
    UserDetailsClientTo profile = new UserDetailsClientTo();
    profile.setId(userEto.getId());
    profile.setRole(Role.getRoleById(userEto.getUserRoleId()));
    return profile;
  }

}
