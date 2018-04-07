import React from "react";
import { Carousel  } from 'react-bootstrap';

export default class CarouselBar extends React.Component{

    render(){
        return (
            <Carousel slide={true} controls= {false} interval = {2000}>
                <Carousel.Item animateIn={true} animateOut={true}>
                    <img width={900} height={250} className="img-responsive center-block" src="/images/rsz_bitcoin.jpg" />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item animateIn={true} animateOut={true}>
                    <img width={900} height={250} className="img-responsive center-block" src="/images/rsz_bitcoinother.jpg"  />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item animateIn={true} animateOut={true}>
                    <img width={900} height={250} className="img-responsive center-block" src="/images/rsz_crypto.jpg" />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        );
    }
}