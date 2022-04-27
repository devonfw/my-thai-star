package com.devonfw.application.usermanagement.rest.v1;

import static com.devonfw.application.usermanagement.utils.StringUtils.isEmpty;
import static javax.ws.rs.core.Response.created;
import static javax.ws.rs.core.Response.status;

import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.jboss.aerogear.security.otp.api.Base32;
import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.domain.model.UserEntity;
import com.devonfw.application.usermanagement.domain.model.UserRoleEntity;
import com.devonfw.application.usermanagement.domain.repo.UserRepository;
import com.devonfw.application.usermanagement.domain.repo.UserRoleRepository;
import com.devonfw.application.usermanagement.rest.v1.mapper.UserMapper;
import com.devonfw.application.usermanagement.rest.v1.mapper.UserRoleMapper;
import com.devonfw.application.usermanagement.rest.v1.model.UserDto;
import com.devonfw.application.usermanagement.rest.v1.model.UserQrCodeDto;
import com.devonfw.application.usermanagement.rest.v1.model.UserRoleDto;
import com.devonfw.application.usermanagement.rest.v1.model.UserRoleSearchCriteriaDto;
import com.devonfw.application.usermanagement.rest.v1.model.UserSearchCriteriaDto;
import com.devonfw.application.usermanagement.utils.QrCodeService;

@Path("/usermanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UsermanagementRestService {

  @Context
  UriInfo uriInfo;

  @Inject
  UserRepository userRepository;

  @Inject
  UserRoleRepository userRoleRepository;

  @Inject
  UserMapper userMapper;

  @Inject
  UserRoleMapper userRoleMapper;

  @GET
  @Path("/user/{id}/")
  public UserDto getUserById(@PathParam("id") long id) {

    Optional<UserEntity> entity = this.userRepository.findById(id);
    if (entity.isPresent()) {
      return this.userMapper.map(entity.get());
    }
    return null;
  }

  @GET
  @Path("/user/pairing/{username}/")
  public UserQrCodeDto getUserQrCode(@PathParam("username") String username) {

    UserEntity user = this.userRepository.findByUsername(username);
    if (user == null) {
      throw new WebApplicationException(String.format("Username: %s not found", username), 400);
    }
    if (user.getSecret() == null) {
      user.setSecret(Base32.random());
      UserEntity resultEntity = this.userRepository.save(user);
    }
    return user.isTwoFactorStatus() ? QrCodeService.generateQrCode(user) : null;
  }

  @GET
  @Path("/user/twofactor/{username}")
  public UserDto getUserStatus(@PathParam("username") String username) {

    return this.userMapper.map(this.userRepository.findByUsername(username));
  }

  @POST
  @Path("/user/twofactor")
  public UserDto saveUserTwoFactor(UserDto user) {

    UserEntity userEntity = this.userRepository.findByUsername(user.getUsername());
    if (userEntity == null) {
      throw new WebApplicationException(String.format("Username: %s not found", user.getUsername()), 400);
    }
    userEntity.setTwoFactorStatus(user.getTwoFactorStatus());
    UserEntity resultEntity = this.userRepository.save(userEntity);
    return this.userMapper.map(resultEntity);
  }

  @POST
  @Path("/user/")
  public Response saveUser(UserDto user) {

    if (isEmpty(user.getUsername())) {
      throw new WebApplicationException("Username was not set on request.", 400);
    }
    UserEntity userEntity = this.userRepository.save(this.userMapper.map(user));
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(Long.toString(userEntity.getId()));
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/user/{id}/")
  public Response deleteUser(@PathParam("id") long id) {

    this.userRepository.deleteById(Long.valueOf(id));
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/user/search")
  @POST
  public Page<UserDto> findUsersByPost(UserSearchCriteriaDto searchCriteriaTo) {

    return this.userMapper.map(this.userRepository.findUserByCriteria(searchCriteriaTo));
  }

  @GET
  @Path("/userrole/{id}/")
  public UserRoleDto getUserRole(@PathParam("id") long id) {

    Optional<UserRoleEntity> entity = this.userRoleRepository.findById(id);
    if (entity.isPresent()) {
      return this.userRoleMapper.map(entity.get());
    }
    return null;
  }

  @POST
  @Path("/userrole/")
  public Response saveUserRole(UserRoleDto userrole) {

    if (isEmpty(userrole.getName())) {
      throw new WebApplicationException("Rolename was not set on request.", 400);
    }
    UserRoleEntity userRoleEntity = this.userRoleRepository.save(this.userRoleMapper.map(userrole));
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(Long.toString(userRoleEntity.getId()));
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/userrole/{id}/")
  public Response deleteUserRole(@PathParam("id") long id) {

    this.userRoleRepository.deleteById(Long.valueOf(id));
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/userrole/search")
  @POST
  public Page<UserRoleDto> findUserRolesByPost(UserRoleSearchCriteriaDto searchCriteriaTo) {

    return this.userRoleMapper.map(this.userRoleRepository.findRolesByCriteria(searchCriteriaTo));
  }
}
