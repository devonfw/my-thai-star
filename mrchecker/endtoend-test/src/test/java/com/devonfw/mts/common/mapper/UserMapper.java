package com.devonfw.mts.common.mapper;

import java.io.Reader;
import java.util.LinkedList;
import java.util.List;

import junitparams.mappers.CsvWithHeaderMapper;

public class UserMapper extends CsvWithHeaderMapper {

  /**
   * Function to map a CSV into a matrix (array of arrays).
   * Each sub array represents a line of the CSV and each element a value separated by commas.
   * @param Reader. Class to read character streams.
   * @return Array<Object[]>. Matrix which contains the data read from the CSV
   * */
  @Override
  public Object[] map(Reader reader) {
    Object[] map = super.map(reader);
    List<Object[]> result = new LinkedList<Object[]>();
    for (Object lineObj : map) {
      String line = (String) lineObj;

      // Splitted with ","
      Object[] lineSplitted = line.split(","); // Example line { 21,John }

      // Order of arguments must be inline with Person class constructor argument list
      result.add(lineSplitted);
    }

    return result.toArray();
  }
}
