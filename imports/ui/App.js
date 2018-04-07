import React from 'react';
import PropTypes from "prop-types";
import TitleBar from "./components/login/TitleBar";
import CarouselBar from "./components/login/Carousel";


export default class App extends React.Component{
    render(){
        return (
            <div>
                <TitleBar/>
                <CarouselBar/>
            </div>

        );
    }
};
