package com.devonfw.application.dishmanagement.service.rest.v1;

import static javax.ws.rs.core.Response.created;
import static javax.ws.rs.core.Response.status;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.dishmanagement.domain.CategorySearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.DishSearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.IngredientSearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.model.CategoryEntity;
import com.devonfw.application.dishmanagement.domain.model.DishEntity;
import com.devonfw.application.dishmanagement.domain.model.IngredientEntity;
import com.devonfw.application.dishmanagement.domain.repo.CategoryRepository;
import com.devonfw.application.dishmanagement.domain.repo.DishRepository;
import com.devonfw.application.dishmanagement.domain.repo.IngredientRepository;
import com.devonfw.application.dishmanagement.service.rest.v1.mapper.CategoryMapper;
import com.devonfw.application.dishmanagement.service.rest.v1.mapper.DishMapper;
import com.devonfw.application.dishmanagement.service.rest.v1.mapper.IngredientMapper;
import com.devonfw.application.dishmanagement.service.rest.v1.model.CategoryDto;
import com.devonfw.application.dishmanagement.service.rest.v1.model.DishDto;
import com.devonfw.application.dishmanagement.service.rest.v1.model.IngredientDto;

@Path("/dishmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DishManagementRestService {

  private static final Logger LOG = LoggerFactory.getLogger(DishManagementRestService.class);

  @Context
  UriInfo uriInfo;

  @Inject
  CategoryRepository categoryRepo;

  @Inject
  CategoryMapper categoryMapper;

  @Inject
  DishRepository dishRepository;

  @Inject
  DishMapper dishMapper;

  @Inject
  IngredientRepository ingredientRepository;

  @Inject
  IngredientMapper ingredientMapper;

  @GET
  @Path("/category/{id}/")
  public CategoryDto getCategory(@PathParam("id") long id) {

    Optional<CategoryEntity> entity = this.categoryRepo.findById(id);
    return this.categoryMapper.mapTo(entity.get());

  }

  @POST
  @Path("/category/")
  public Response saveCategory(CategoryDto category) {

    CategoryEntity entity = this.categoryRepo.save(this.categoryMapper.mapTo(category));
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(Long.toString(entity.getId()));
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/category/{id}/")
  public Response deleteCategory(@PathParam("id") long id) {

    this.categoryRepo.deleteById(id);
    LOG.info("Entity with Id " + id + " is deleted ");
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/category/search")
  @POST
  public Page<CategoryDto> findCategorysByPost(CategorySearchCriteriaDto searchCriteriaTo) {

    Page<CategoryDto> pagListTo = null;
    Page<CategoryEntity> categories = this.categoryRepo.findCategorys(searchCriteriaTo);
    List<CategoryDto> etos = this.categoryMapper.mapList(categories.getContent());
    if (etos.size() > 0) {
      Pageable pagResultTo = PageRequest.of(searchCriteriaTo.getPageable().getPageNumber(), etos.size());
      pagListTo = new PageImpl<>(etos, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;
  }

  @GET
  @Path("/dish/{id}/")
  public DishDto getDish(@PathParam("id") long id) {

    Optional<DishEntity> dishEntity = this.dishRepository.findById(id);
    DishEntity entity = dishEntity.get();
    DishDto cto = new DishDto();
    if (entity != null) {
      cto = this.dishMapper.mapTo(entity);
      cto.setCategories(this.categoryMapper.mapList(entity.getCategories()));
      cto.setExtras(this.ingredientMapper.mapList(entity.getExtras()));
    }

    return cto;
  }

  @POST
  @Path("/dish/")
  public Response saveDish(DishDto dish) {

    DishEntity dishEntity = this.dishRepository.save(this.dishMapper.mapTo(dish));
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(Long.toString(dishEntity.getId()));
    return created(uriBuilder.build()).build();

  }

  @DELETE
  @Path("/dish/{id}/")
  public Response deleteDish(@PathParam("id") long id) {

    this.dishRepository.deleteById(id);
    LOG.info("Entity with Id " + id + " is deleted ");
    return status(Status.NO_CONTENT.getStatusCode()).build();

  }

  @Path("/dish/search")
  @POST
  // @CrossOrigin
  public Page<DishDto> findDishsByPost(DishSearchCriteriaDto searchCriteriaTo) {

    Page<DishDto> pagListTo = null;
    Page<DishEntity> entities = this.dishRepository.findDishs(searchCriteriaTo);
    List<DishEntity> dishes = entities.getContent();
    List<DishDto> ctos = new ArrayList<>(dishes.size());
    for (DishEntity dish : dishes) {
      DishDto dishDto = new DishDto();
      dishDto = this.dishMapper.mapTo(dish);
      dishDto.setCategories(this.categoryMapper.mapList(dish.getCategories()));
      dishDto.setExtras(this.ingredientMapper.mapList(dish.getExtras()));
      ctos.add(dishDto);
    }
    if (!searchCriteriaTo.getCategories().isEmpty()) {
      ctos = categoryFilter(ctos, searchCriteriaTo.getCategories());
    }
    if (ctos.size() > 0) {
      Pageable pagResultTo = PageRequest.of(searchCriteriaTo.getPageable().getPageNumber(), ctos.size());
      pagListTo = new PageImpl<>(ctos, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;

  }

  @GET
  @Path("/ingredient/{id}/")
  public IngredientDto getIngredient(@PathParam("id") long id) {

    IngredientEntity ingredient = this.ingredientRepository.getOne(id);
    return this.ingredientMapper.mapTo(ingredient);
  }

  @POST
  @Path("/ingredient/")
  public Response saveIngredient(IngredientDto ingredient) {

    IngredientEntity entity = this.ingredientRepository.save(this.ingredientMapper.mapTo(ingredient));
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(Long.toString(entity.getId()));
    return created(uriBuilder.build()).build();
    // return this.ingredientMapper.mapTo(entity);
  }

  @DELETE
  @Path("/ingredient/{id}/")
  public Response deleteIngredient(@PathParam("id") long id) {

    this.ingredientRepository.deleteById(id);
    LOG.info("Entity with Id " + id + " is deleted ");
    return status(Status.NO_CONTENT.getStatusCode()).build();

  }

  @Path("/ingredient/search")
  @POST
  public Page<IngredientDto> findIngredientsByPost(IngredientSearchCriteriaDto searchCriteriaTo) {

    Page<IngredientDto> pagListTo = null;
    Page<IngredientEntity> entities = this.ingredientRepository.findIngredients(searchCriteriaTo);
    List<IngredientDto> ingredients = this.ingredientMapper.mapList(entities.getContent());
    if (ingredients.size() > 0) {
      Pageable pagResultTo = PageRequest.of(searchCriteriaTo.getPageable().getPageNumber(), ingredients.size());
      pagListTo = new PageImpl<>(ingredients, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;
  }

  private List<DishDto> categoryFilter(List<DishDto> dishes, List<CategoryDto> categories) {

    List<DishDto> dishFiltered = new ArrayList<>();
    for (DishDto dish : dishes) {

      List<CategoryDto> entityCats = dish.getCategories();
      for (CategoryDto entityCat : entityCats) {
        for (CategoryDto category : categories) {
          if (category.getId().equals(entityCat.getId())) {
            if (!dishAlreadyAdded(dishFiltered, dish)) {
              dishFiltered.add(dish);
              break;
            }

          }
        }
      }

    }

    return dishFiltered;
  }

  private boolean dishAlreadyAdded(List<DishDto> dishEntitiesFiltered, DishDto dishEntity) {

    boolean result = false;
    for (DishDto entity : dishEntitiesFiltered) {
      Long entityId = entity.getId();
      Long dishEntityId = dishEntity.getId();
      if (entityId.equals(dishEntityId)) {
        result = true;
        break;
      }
    }
    return result;
  }

}
