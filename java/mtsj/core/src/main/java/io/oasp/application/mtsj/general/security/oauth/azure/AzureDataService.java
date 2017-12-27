package io.oasp.application.mtsj.general.security.oauth.azure;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.math.BigInteger;
import java.net.URL;
import java.nio.charset.Charset;
import java.security.Key;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;

import org.apache.commons.lang.NotImplementedException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.jsonwebtoken.JwsHeader;

/**
 *
 */
public class AzureDataService {

  private static final String KEY_TYPE = "kty";

  // values from domain and signin_po in BaseWebSecurityConfig
  public static String domain;

  public static String signin_po;

  private AzureDataService() {
  }

  /**
   * Retrieves the key specified by 'kid' from AzureAD's config endpoint.
   *
   * @param kid
   * @return The public key specified by 'kid'.
   * @throws IOException
   * @throws InvalidKeySpecException
   * @throws NoSuchAlgorithmException
   */
  public static Key retrieveKey(String kid) throws IOException, InvalidKeySpecException, NoSuchAlgorithmException {

    String jwksUri = readJsonFromUrl(
        "https://login.microsoftonline.com/" + domain + "/v2.0/.well-known/openid-configuration?p=" + signin_po)
            .getString("jwks_uri");
    JSONArray keys = readJsonFromUrl(jwksUri).getJSONArray("keys");
    for (int i = 0; i < keys.length(); i++) {
      JSONObject key = keys.getJSONObject(i);
      if (key.getString(JwsHeader.KEY_ID).equals(kid)) {
        return buildKey(key);
      }
    }
    jwksUri = readJsonFromUrl("https://login.microsoftonline.com/" + domain + "/.well-known/openid-configuration")
        .getString("jwks_uri");
    keys = readJsonFromUrl(jwksUri).getJSONArray("keys");
    for (int i = 0; i < keys.length(); i++) {
      JSONObject key = keys.getJSONObject(i);
      if (key.getString(JwsHeader.KEY_ID).equals(kid)) {
        return buildKey(key);
      }
    }
    return null;
  }

  private static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {

    InputStream is = new URL(url).openStream();
    try {
      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
      StringBuilder stringBuilder = new StringBuilder();
      int read;
      char[] chars = new char[1024];
      while ((read = rd.read(chars)) != -1)
        stringBuilder.append(chars, 0, read);

      String jsonText = stringBuilder.toString();
      return new JSONObject(jsonText);
    } finally {
      is.close();
    }
  }

  /**
   * @param key
   * @return
   * @throws NoSuchAlgorithmException
   * @throws InvalidKeySpecException
   */
  private static Key buildKey(JSONObject jsonKey) throws InvalidKeySpecException, NoSuchAlgorithmException {

    if ("RSA".equals(jsonKey.getString(KEY_TYPE))) {
      BigInteger modulus = new BigInteger(1, Base64.getUrlDecoder().decode(jsonKey.getString("n")));
      BigInteger exponent = new BigInteger(1, Base64.getUrlDecoder().decode(jsonKey.getString("e")));
      return KeyFactory.getInstance("RSA").generatePublic(new RSAPublicKeySpec(modulus, exponent));
    } else {
      throw new NotImplementedException("Requested signature key type not implemented.");
    }
  }
}
