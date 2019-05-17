package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterDataEto;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;

@NamedNativeQuery(
    name = "getClusters",
    query =
        "SELECT" 
        + "  ST_ClusterId() AS id, "
        + "  1 AS modificationCounter, "
        + "  FIRST_VALUE(idDish ORDER BY idDish) AS idDish, "
        + "  FIRST_VALUE(dishName ORDER BY idDish) AS dishName, "
        + "  SUM(amount) as amount, "
        + "  AVG(geocode.ST_X()) as x, "
        + "  AVG(geocode.ST_Y()) as y, "
        + "  TO_VARCHAR(ST_ConcaveHullAggr(flatgeocode).ST_Transform(4326).ST_AsGeoJSON()) as polygon "
        + "FROM ( "
        + "  SELECT *, geocode.ST_Transform(1000004326) AS flatgeocode "
        + "  FROM GeoBooking "
        + "  WHERE geocode.ST_IsEmpty() = 0 AND idDish = :idDish AND bookingDate >= :startBookingDate AND bookingDate <= :endBookingDate "
        + ") "
        + "GROUP CLUSTER BY flatgeocode "
        + "USING KMEANS CLUSTERS :numberOfClusters "
        + "ORDER BY amount",
    resultSetMapping = "ClusterDataEto"
)
@SqlResultSetMapping(
    name = "ClusterDataEto",
    classes = @ConstructorResult(
        targetClass = ClusterDataEto.class,
        columns = {
            @ColumnResult(name = "id", type = Long.class),
            @ColumnResult(name = "modificationCounter", type =  Integer.class),
            @ColumnResult(name = "idDish", type = Long.class),
            @ColumnResult(name = "dishName", type = String.class),
            @ColumnResult(name = "amount", type = Long.class),
            @ColumnResult(name = "x", type = Double.class),
            @ColumnResult(name = "y", type = Double.class),
            @ColumnResult(name = "polygon", type = String.class)
        }
    )
)
@Entity
@Table(name = "PREDICTION_ALL_FORECAST")
public class PredictionDayDataEntity extends ApplicationPersistenceEntity implements PredictionDayData {

  private static final long serialVersionUID = 1L;

  private DishEntity dish;

  private Integer timestamp;

  private Double forecast;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "IDDISH")
  public DishEntity getDish() {

    return this.dish;
  }

  public void setDish(DishEntity dish) {

    this.dish = dish;
  }

  @Transient
  public Long getDishId() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getId();
  }

  public void setDishId(Long dishId) {

    if (dishId == null) {
      this.dish = null;
    } else {
      DishEntity dishEntity = new DishEntity();
      dishEntity.setId(dishId);
      this.dish = dishEntity;
    }
  }

  @Transient
  public String getDishName() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getName();
  }

  public void setDishName(String dishName) {

    if (dishName == null) {
      this.dish = null;
    } else {
      DishEntity dishEntity = new DishEntity();
      dishEntity.setName(dishName);
      this.dish = dishEntity;
    }
  }

  public Integer getTimestamp() {

    return this.timestamp;
  }

  public void setTimestamp(Integer timestamp) {

    this.timestamp = timestamp;
  }

  public Double getForecast() {

    return this.forecast;
  }

  public void setForecast(Double forecast) {

    this.forecast = forecast;
  }

}
