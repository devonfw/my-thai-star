package com.devonfw.application.mtsj.general.common.base;

import io.jsonwebtoken.lang.Assert;
import org.springframework.util.ReflectionUtils;

public class ValidationService {

    static void validateCredentials(Object credentials){
        ReflectionUtils.doWithFields(credentials.getClass(), field -> {
            field.setAccessible(true);
            Assert.notNull(field.get(credentials), "Bad input");
        });
    }
}
