package com.devonfw.application.mtsj.general.common.base;

import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class BaseUserDetails implements UserDetails {

    private UserEntity userEntity;

    public BaseUserDetails(UserEntity userEntity) {
        this.userEntity = userEntity;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>();
        String userRole = StringUtils.capitalize(userEntity.getUserRole().getName());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + userRole));
        return authorities;
    }

    @Override
    public String getUsername() {
        return userEntity.getUsername();
    }

    @Override
    public String getPassword() { return userEntity.getPassword(); }

    public UserEntity getUserEntity() { return this.userEntity; }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
