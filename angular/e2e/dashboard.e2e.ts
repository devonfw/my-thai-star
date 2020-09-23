import {
  browser,
  by,
  protractor,
  $,
  element,
  ProtractorExpectedConditions,
} from 'protractor';

describe('basic e2e test with loading', () => {
  const EC: ProtractorExpectedConditions = protractor.ExpectedConditions;
  describe('home', () => {
    browser.get('/');
    it('should load home page', () => {
      expect(browser.getTitle()).toBe('My Thai Star');
      // Waits for the element 'td-loading' to not be present on the dom.
      browser.wait(EC.not(EC.presenceOf($('td-loading'))), 10000).then(() => {
        // checks if elements were rendered
        expect(element(by.id('homeCard')).isPresent()).toBe(true);
      });
    });
  });
});
