package com.devonfw.application.mtsj.general.common.impl.security.twofactor;

import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller
@Secured({"ROLE_Waiter", "ROLE_Manager", "ROLE_Customer"})
public class TwoFactorPairingController {

    @Inject
    private UserRepository userRepository;

    @RequestMapping(value = "/pairing/{user}.png", method = RequestMethod.GET)
    public void generatePairingURL(HttpServletResponse res, @PathVariable("user") String username) throws IOException, WriterException {

        final UserEntity user = userRepository.findByUsername(username);

        if (user != null && user.isUsingTwoFactor()) {
            res.setContentType("image/png");
            String url = generateUrl(user);
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(url, BarcodeFormat.QR_CODE, 350, 350);
            MatrixToImageWriter.writeToStream(matrix, "PNG", res.getOutputStream());
            res.getOutputStream().flush();
        }
        else{
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.getWriter().write("2FA is not activated");
            res.getWriter().flush();
        }
    }

    private String generateUrl(UserEntity user) {
        return "otpauth://totp/" + user.getUsername() + ":"
                + user.getEmail() + "?secret="
                + user.getSecret() + "&issuer=My-Thai-Star";
    }
}
