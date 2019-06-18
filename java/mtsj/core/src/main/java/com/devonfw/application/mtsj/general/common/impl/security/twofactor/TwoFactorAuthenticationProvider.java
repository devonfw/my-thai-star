package com.devonfw.application.mtsj.general.common.impl.security.twofactor;

import com.devonfw.application.mtsj.general.common.base.TokenAuthenticationService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.Assert;

import javax.inject.Inject;

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

        if (user.getTwoFactorStatus()) {
            Totp totp = new Totp(user.getSecret());

            if (!passwordEncoder.matches(auth.getCredentials().toString(), user.getPassword())) {
                LOG.debug("Authentication failed: password does not match stored value");

                throw new BadCredentialsException("Credentials are invalid");
            }

            if (!isValidLong(twoFactorToken) || !totp.verify(twoFactorToken)) {
                LOG.debug("2FA Code {} was invalid", twoFactorToken);
                throw new BadCredentialsException("Invalid verfication code");
            }

            LOG.debug("2FA authentication with code {} was successful", twoFactorToken);
            return populateSuccessUsernamePasswordAuthentication(auth);
        }

        return null;
    }

    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        Assert.notNull(passwordEncoder, "passwordEncoder cannot be null");
        this.passwordEncoder = passwordEncoder;
    }

    private boolean isValidLong(String code) {
        try {
            Long.parseLong(code);
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

    private Authentication populateSuccessUsernamePasswordAuthentication(Authentication auth) {

        UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(
                auth.getPrincipal(), auth.getCredentials(), TokenAuthenticationService.getRolesFromName(auth));
        result.setDetails(true);

        return result;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(TwoFactorAuthenticationToken.class);
    }
}
