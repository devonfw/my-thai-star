package com.devonfw.application.mtsj.dishmanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface Category extends ApplicationEntity {

  
	public String getName() ;

	
	public void setName(String name) ;
  
	public String getDescription() ;

	
	public void setDescription(String description) ;
  
	public int getShowOrder() ;

	
	public void setShowOrder(int showOrder) ;

}
