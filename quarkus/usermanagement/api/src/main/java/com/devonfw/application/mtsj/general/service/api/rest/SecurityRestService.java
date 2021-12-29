package com.devonfw.application.mtsj.general.service.api.rest;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.devonfw.application.mtsj.general.common.api.to.UserDetailsClientTo;

/**
 * The security REST service provides access to the csrf token, the authenticated user's meta-data. Furthermore, it
 * provides functionality to check permissions and roles of the authenticated user.
 *
 */
@Transactional
@Path("/security/v1")
@Produces(MediaType.APPLICATION_JSON)
public interface SecurityRestService {

  /**
   * Returns the user details from the jwt token included in the 'Authorization' header
   *
   * @param request {@link HttpServletRequest} to retrieve the token
   * @return the user details {@link UserDetailsClientTo}
   */
  @GET
  @Path("/currentuser/")
  public UserDetailsClientTo getCurrentUserDetails(@Context HttpServletRequest request);

}
