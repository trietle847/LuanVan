package com.CT553.demo;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class DemoApplicationTests {

	@Test
	void contextLoads() {
        String key = Encoders.BASE64.encode(
                Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded()
        );
        System.out.println(key);
	}

}
