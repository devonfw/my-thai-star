package com.devonfw.mts.tests;

import java.util.HashMap;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;

import com.capgemini.mrchecker.test.core.BaseTest;
import com.devonfw.mts.common.data.Reservation;
import com.devonfw.mts.common.data.User;
import com.devonfw.mts.common.mapper.UserMapper;
import com.devonfw.mts.common.utils.Utils;
import com.devonfw.mts.pages.ThaiBookPage;
import com.devonfw.mts.pages.ThaiConfirmBookPage;
import com.devonfw.mts.pages.ThaiHomePage;
import com.devonfw.mts.pages.ThaiLoginPage;
import com.devonfw.mts.pages.ThaiMenuPage;
import com.devonfw.mts.pages.ThaiReservationsPage;
import com.devonfw.mts.pages.ThaiSummaryPage;
import com.devonfw.mts.pages.ThaiWaiterPage;

import junitparams.FileParameters;
import junitparams.JUnitParamsRunner;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
@RunWith(JUnitParamsRunner.class)
public class MyThaiStarTest extends BaseTest {

  private ThaiHomePage myThaiStarHome = new ThaiHomePage();

  @Override
  public void setUp() {

    this.myThaiStarHome.load();
    logOut();
  }

  @Override
  public void tearDown() {

    // TASK Auto-generated method stub

  }

  // @Test
  // @FileParameters(value = "src/test/resources/datadriven/test_users.csv", mapper = UserMapper.class)
  public void Test_loginAndLogOut(User user) {

    login(user);
    logOut();
  }

  // @Test
  public void Test_loginFake() {

    User userfake = new User("userFake", "passwordfake");
    ThaiLoginPage loginPage = this.myThaiStarHome.clickLogInButton();
    loginPage.enterCredentials(userfake.getUsername(), userfake.getPassword());
    Assert.assertFalse("User " + userfake.getUsername() + " logged",
        this.myThaiStarHome.isUserLogged(userfake.getUsername()));
  }

  @Test
  @FileParameters(value = "src/test/resources/datadriven/test_users.csv", mapper = UserMapper.class)
  public void Test_bookTable(User user) {

    // Generate data for reservation
    String fakeEmail = Utils.getRandomEmail(user.getUsername());
    String date = Utils.getTomorrowDate();
    int guest = Utils.getRandom1toMax(8);
    Reservation reservation = new Reservation(date, user.getUsername(), fakeEmail, guest);
    User waiter = new User("waiter", "waiter");

    login(user);
    bookTable(reservation);
    logOut();
    login(waiter);
    verifyBooking(reservation);
    logOut();
  }

  // @Test
  public void Test_orderMenu() {

    String bookingId = "CB_20170510_123502655Z";
    ThaiMenuPage menuPage = this.myThaiStarHome.clickMenuButton();
    ThaiSummaryPage summaryPage = menuPage.clickFirstMenu();
    summaryPage.orderMenu(bookingId);
  }

  private void login(User user) {

    ThaiLoginPage loginPage = this.myThaiStarHome.clickLogInButton();
    loginPage.enterCredentials(user.getUsername(), user.getPassword());
    Assert.assertTrue("User " + user.getUsername() + " not logged",
        this.myThaiStarHome.isUserLogged(user.getUsername()));
  }

  private void logOut() {

    if (this.myThaiStarHome.isUserLogged()) {
      this.myThaiStarHome.clickLogOutButton();
    }
    Assert.assertFalse("Some user logged", this.myThaiStarHome.isUserLogged());
  }

  private void bookTable(Reservation reservation) {

    ThaiBookPage myBookPage = this.myThaiStarHome.clickBookTable();

    System.out.println("Reserva in bookTable: " + reservation.getDate());
    ThaiConfirmBookPage myComfirmPage = myBookPage.enterBookingData(reservation);
    myComfirmPage.confirmBookingData();
    myBookPage.checkConfirmationDialog();
  }

  private void verifyBooking(Reservation reservation) {

    ThaiWaiterPage myWaiterPage = new ThaiWaiterPage();
    ThaiReservationsPage myReservationsPage = myWaiterPage.switchToReservations();
    HashMap<String, List<Reservation>> reservations = myReservationsPage.searchDatesByEmail(reservation.getEmail());
    System.out.println("Reserva in verifyBooking: " + reservation.getDate());
    Assert.assertTrue("Booking not found", reservations.containsKey(reservation.getDate()));
    List<Reservation> reservationsForDate = reservations.get(reservation.getDate());
    Assert.assertFalse("Booking not found", reservationsForDate.isEmpty());
  }

}
