package io.oasp.application.mtsj.general.security.ldap.azure;

import java.util.Properties;

import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.capgemini.devonfw.module.winauthad.common.api.accesscontrol.ActiveDirectory;

/**
 *
 */
public class AzureActiveDirectory extends ActiveDirectory {

  private static final Logger LOG = LoggerFactory.getLogger(AzureActiveDirectory.class);

  private String url;

  /**
   * constructor with parameter for initializing a LDAP context
   *
   * @param username a {@link java.lang.String} object - username com.capgemini.devonfw.module.winauth.common.api.to
   *        establish a LDAP connection
   * @param password a {@link java.lang.String} object - password com.capgemini.devonfw.module.winauth.common.api.to
   *        establish a LDAP connection
   * @param domainController a {@link java.lang.String} object - domain controller name for LDAP connection
   * @param ldapURL a {@link java.lang.String} object - ldap url (e.g. LDAPS://11.222.333.444:636)
   */
  public AzureActiveDirectory(String username, String password, String domainController, String ldapURL) {
    super(username, password, domainController);
    this.properties.put(Context.PROVIDER_URL, ldapURL);
  }

  /**
   * The constructor.
   */
  public AzureActiveDirectory() {
    super();
  }

  /**
   * Connects to Azure Active Directory using the given username@domain and password under {@link #getUrl() URL}. Note:
   * The URL has to be {@link #setUrl(String) set} already for this to function!
   *
   * @param username -> AD username
   * @param password -> AD password
   * @param domainController -> AD domainController
   */
  @Override
  public void connect(String username, String password, String domainController) {

    connect(username, password, domainController, this.url);
  }

  /**
   * Connects to Azure Active Directory using the given username@domain and password under ldapURL.
   *
   * @param username user
   * @param password pw
   * @param domainController domain (e.g. instanceName.onmicrosoft.com)
   * @param ldapURL ldap url (e.g. LDAPS://11.222.333.444:636)
   *
   */
  public void connect(String username, String password, String domainController, String ldapURL) {

    this.properties = new Properties();

    this.properties.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
    this.properties.put(Context.PROVIDER_URL, ldapURL);
    this.properties.put(Context.SECURITY_PRINCIPAL, username + "@" + domainController);
    this.properties.put(Context.SECURITY_CREDENTIALS, password);
    this.properties.put(Context.REFERRAL, "follow");
    // initializing active directory LDAP connection
    try {
      this.dirContext = new InitialDirContext(this.properties);
    } catch (NamingException e) {
      LOG.error(e.getMessage());
    }

    // default domain base for search
    this.domainBase = getDomainBase(domainController);

    // initializing search controls
    this.searchCtls = new SearchControls();
    this.searchCtls.setSearchScope(SearchControls.SUBTREE_SCOPE);
    this.searchCtls.setReturningAttributes(this.returnAttributes);

  }

  @SuppressWarnings("javadoc")
  @Override
  public NamingEnumeration<SearchResult> searchUser(String searchValue, String searchBy, String searchBase) {

    return searchUser(searchValue, searchBy, searchBase, "");
  }

  /**
   * search the Active directory by username/email id for given search base
   *
   * @param searchValue a {@link java.lang.String} object - search value used for AD search for eg. username or email
   * @param searchBy a {@link java.lang.String} object - scope of search by username or by email id
   * @param domain a {@link java.lang.String} object - search base value for scope tree
   * @param userSearchBase a {@link java.lang.String} object - search base value for scope tree under domain node
   * @return search result a {@link javax.naming.NamingEnumeration} object - active directory search result
   *
   */
  @SuppressWarnings("unchecked")
  public NamingEnumeration<SearchResult> searchUser(String searchValue, String searchBy, String domain,
      String userSearchBase) {

    String filter = getFilter(searchValue, searchBy);
    String base = (null == domain) ? this.domainBase : getDomainBase(domain); // for eg.: "DC=myjeeva,DC=com";
    if (userSearchBase != null && userSearchBase != "") {
      base = userSearchBase + "," + base;
    }

    @SuppressWarnings("rawtypes")
    NamingEnumeration result;
    try {
      result = this.dirContext.search(base, filter, this.searchCtls);
      return result;
    } catch (NamingException e) {
      e.printStackTrace();
      UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
      LOG.warn("Failed com.capgemini.devonfw.module.winauth.common.api.to get user {}." + searchValue + exception);
      throw exception;
    } catch (Exception e) {
      e.printStackTrace();
      UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
      LOG.warn("Failed com.capgemini.devonfw.module.winauth.common.api.to get user {}." + searchValue + exception);
      throw exception;
    }
  }

  /**
   * active directory filter string value
   *
   * @param searchValue a {@link java.lang.String} object - search value of username/email id for active directory
   * @param searchBy a {@link java.lang.String} object - scope of search by username or email id
   * @return a {@link java.lang.String} object - filter string
   */
  private String getFilter(String searchValue, String searchBy) {

    String filter = this.baseFilter;
    filter += "(" + searchBy + "=" + searchValue + "))";

    return filter;
  }

  /**
   * creating a domain base value from domain controller name
   */
  private static String getDomainBase(String base) {

    char[] namePair = base.toUpperCase().toCharArray();
    String dn = "DC=";
    for (int i = 0; i < namePair.length; i++) {
      if (namePair[i] == '.') {
        dn += ",DC=" + namePair[++i];
      } else {
        dn += namePair[i];
      }
    }
    return dn;
  }

  /**
   * @return url
   */
  public String getUrl() {

    return this.url;
  }

  /**
   * @param url new value of {@link #getUrl}.
   */
  public void setUrl(String url) {

    this.url = url;
  }

}
