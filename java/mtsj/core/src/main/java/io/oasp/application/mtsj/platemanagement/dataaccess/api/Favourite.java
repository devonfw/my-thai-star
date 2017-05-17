package io.oasp.application.mtsj.platemanagement.dataaccess.api;

/**
 * Entity to encapsulate Favourite info
 *
 */
public class Favourite {

  private boolean isFav;

  private int likes;

  /**
   * @return isFav
   */
  public boolean isFav() {

    return this.isFav;
  }

  /**
   * @param isFav new value of {@link #isFav}.
   */
  public void setFav(boolean isFav) {

    this.isFav = isFav;
  }

  /**
   * @return likes
   */
  public int getLikes() {

    return this.likes;
  }

  /**
   * @param likes new value of {@link #getLikes}.
   */
  public void setLikes(int likes) {

    this.likes = likes;
  }

}
