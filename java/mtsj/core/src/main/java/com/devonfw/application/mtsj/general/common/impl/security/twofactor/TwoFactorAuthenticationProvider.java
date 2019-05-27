package com.devonfw.application.mtsj.general.common.impl.security.twofactor;

import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.jboss.aerogear.security.otp.Totp;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;

public class TwoFactorAuthenticationProvider implements AuthenticationProvider {

    /**
     * Logger instance.
     */
    private static final Logger LOG = LoggerFactory.getLogger(TwoFactorAuthenticationProvider.class);

    @Inject
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder;


    @Override
    public Authentication authenticate(Authentication auth)
            throws AuthenticationException {
        UserEntity user = userRepository.findByUsername(auth.getName());

        String twoFactorToken = auth.getDetails().toString();

        if ((user == null)) {
            throw new BadCredentialsException("Invalid username or password");
        }

        if (true) {
            Totp totp = new Totp(user.getSecret());
            if (!isValidLong(twoFactorToken) || !totp.verify(twoFactorToken)) {
                LOG.info("2FA Code {} was invalid", twoFactorToken);
                throw new BadCredentialsException("Invalid verfication code");
            }

            LOG.info("2FA authentication with code {} was successful", twoFactorToken);
            return populateSuccessUsernamePasswordAuthentication(auth.getPrincipal(), auth);
        }

        return null;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        Assert.notNull(passwordEncoder, "passwordEncoder cannot be null");
        this.passwordEncoder = passwordEncoder;
    }

    protected PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }

    private boolean isValidLong(String code) {
        try {
            Long.parseLong(code);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

    private Authentication populateSuccessUsernamePasswordAuthentication(Object principal, Authentication auth) {

        UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
                principal, auth.getCredentials(),
                new ArrayList<>(Arrays.asList(new SimpleGrantedAuthority("ROLE_" + auth.getName()))));
        result.setDetails(auth.getDetails());

        return result;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(TwoFactorAuthenticationToken.class);
    }
}
