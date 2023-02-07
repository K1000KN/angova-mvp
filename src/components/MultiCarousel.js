import React from 'react';
import  Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function MultiCarousel() {
   
    const showUkArticle = async ()=> {
        // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=us`);
        // var response = await apiResponse.json();
        // setSourceList(response.sources)
    }
    const showFrArticle = async ()=> {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
    }
    const showMarocArticle = async ()=> {
    // var apiResponse = await fetch(`https://newsapi.org/v2/sources?apiKey=ecae1c873b6f419eb922a2078e805a2e&country=fr`);
    // var response = await apiResponse.json();
    // setSourceList(response.sources)
    }
    return (
       
            <Carousel
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // Change the size to fit the parent element of this div
                    width: '100%',
                    height: 30,
                    backgroundColor:'red'
                }}
                arrows
                centerMode={true}
                swipeable={true}
                responsive={{
                desktop: {
                    breakpoint: {
                    max: 3000,
                    min: 1024
                    },
                    items: 8,
                },
                mobile: {
                    breakpoint: {
                    max: 464,
                    min: 0
                    },
                    items: 4,
                },
                tablet: {
                    breakpoint: {
                    max: 1024,
                    min: 464
                    },
                    items: 4,
                }
                }}
                slidesToSlide={1}
            > 
                <img src='../images/maroc.png' onClick={() => {showMarocArticle()}} className='styleFlag'/>
                <img src='../images/algerie.png' onClick={() => {showMarocArticle()}} className='styleFlag'/>
                <img src='../images/tuni.png' onClick={() => {showMarocArticle()}} className='styleFlag'/>
                <img src='../images/france.png' onClick={() => {showFrArticle()}} className='styleFlag'/>
                <img src='../images/turq.png' onClick={() => {showFrArticle()}} className='styleFlag'/>
                <img src='../images/uk.png' onClick={() => {showUkArticle()}} className='styleFlag'/>
                <img src='../images/albanie.png' onClick={() => {showFrArticle()}} className='styleFlag'/>
                <img src='../images/roumanie.png' onClick={() => {showFrArticle()}} className='styleFlag'/>
            </Carousel>
       
        
    )
}
export default MultiCarousel;