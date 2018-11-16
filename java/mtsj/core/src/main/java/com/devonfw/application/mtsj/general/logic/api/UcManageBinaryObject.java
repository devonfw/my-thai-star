package com.devonfw.application.mtsj.general.logic.api;

import java.sql.Blob;

import com.devonfw.application.mtsj.general.logic.api.to.BinaryObjectEto;

/**
 * Use case for managing BinaryObject.
 *
 */
public interface UcManageBinaryObject {

  /**
   * @param data the Blob data to save
   * @param binaryObjectEto the {@link BinaryObjectEto}
   * @return {@link BinaryObjectEto}
   */
  BinaryObjectEto saveBinaryObject(Blob data, BinaryObjectEto binaryObjectEto);

  /**
   * @param binaryObjectId the ID of the {@link BinaryObjectEto} that should be deleted
   */
  void deleteBinaryObject(Long binaryObjectId);

  /**
   * @param binaryObjectId the ID of the {@link BinaryObjectEto} to find
   * @return {@link BinaryObjectEto}
   */
  BinaryObjectEto findBinaryObject(Long binaryObjectId);

  /**
   * @param binaryObjectId the ID of the {@link BinaryObjectEto} the blob corresponds to
   * @return {@link Blob}
   */
  Blob getBinaryObjectBlob(Long binaryObjectId);

}
