package com.devonfw.application.dishmanagement.service.rest.v1;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import com.devonfw.application.dishmanagement.common.to.CategoryEto;
import com.devonfw.application.dishmanagement.logic.UcDishManagement;

@Path("/dishmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DishManagementRestService {

  @Context
  UriInfo uriInfo;

  @Inject
  UcDishManagement ucDishManagement;

  @GET
  @Path("/category/{id}/")
  public CategoryEto getCategory(@PathParam("id") long id) {

    return this.ucDishManagement.findCategory(id);

  }
}
