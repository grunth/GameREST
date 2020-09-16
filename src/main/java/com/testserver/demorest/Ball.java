package com.testserver.demorest;

public class Ball {

    Integer pageX = 0;
    Integer pageY = 0;

    public Ball() {
    }

    public Integer getPageX() {
        return pageX;
    }

    public Integer getPageY() {
        return pageY;
    }

    public void setPageX(Integer pageX) {
        this.pageX = pageX;
    }

    public void setPageY(Integer pageY) {
        this.pageY = pageY;
    }

    @Override
    public String toString() {
        return "Ball{" +
                "pageX=" + pageX +
                ", pageY=" + pageY +
                '}';
    }
}
