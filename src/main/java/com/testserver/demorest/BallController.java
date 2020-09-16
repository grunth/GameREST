package com.testserver.demorest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BallController {

    Ball b = new Ball();

    @PutMapping("/ball/{pageX}/{pageY}")
    public void refreshCoordinates(@PathVariable Integer pageX, @PathVariable Integer pageY) {
        b.pageX=pageX;
        b.pageY=pageY;
        //System.out.println(b.toString());
    }

    @GetMapping("ball")
    public Ball getActualCoordinates() {
        return b;
    }

}
