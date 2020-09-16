package com.testserver.demorest;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class GreetingController {
    Logger logger = Logger.getLogger(GreetingController.class);

    private static final String temp = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/greeting")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        logger.info("Emit to queue1");
        return new Greeting(counter.incrementAndGet(), String.format(temp, name));
    }

}
