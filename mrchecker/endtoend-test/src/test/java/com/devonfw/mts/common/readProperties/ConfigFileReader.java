package com.devonfw.mts.common.readProperties;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

public class ConfigFileReader {

  private Properties properties;

  private final String propertyFilePath = "src/resources/settings.properties";

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
      throw new RuntimeException("Configuration.properties not found at " + this.propertyFilePath);
    }
  }

  public String getUrl() {

    String url = this.properties.getProperty("mythaistar.url");
    System.out.println("VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" + url);
    if (url != null)
      return url;
    else
      throw new RuntimeException("Url not specified in the configuration.properties file.");
  }

}