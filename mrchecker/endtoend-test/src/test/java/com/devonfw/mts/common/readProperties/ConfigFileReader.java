package com.devonfw.mts.common.readProperties;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class ConfigFileReader {

  private Properties properties;

  private final String propertyFilePath = "src/resources/settings.properties";

  /**
   * Load properties
   * */
  public ConfigFileReader() {
    BufferedReader reader;
    try {
      reader = new BufferedReader(new FileReader(this.propertyFilePath));
      this.properties = new Properties();
      try {
        this.properties.load(reader);
        reader.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    } catch (FileNotFoundException e) {
      e.printStackTrace();
      throw new RuntimeException("settings.properties not found at " + this.propertyFilePath);
    }
  }

  /**
   * Get the value of a property.
   *
   * @param String. Name of a property.
   * */
  public String getProperty(String property) {
    String url = this.properties.getProperty(property);
    if (url != null)
      return url;
    else
      throw new RuntimeException("Url not specified in the settings.properties file.");
  }

}
