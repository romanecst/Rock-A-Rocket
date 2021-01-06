import React, { useState} from 'react';
import '../App.css';
import { Link} from "react-router-dom";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  Button
} from 'reactstrap';

import Navig from './Navig';

//Page d'accueil
export default function Discover(){

  //creation des differentes page du carousel 
    const items = [
      {
        id: 1,
        altText: 'Find a Trip',
        content:<div className='caroussel'>
        <h1 className='display-3'>Ready To Go?</h1>
        <p style={{fontSize: '20px', marginTop: '2%'}}>Find the next launches in your area and board a rocket to your dream destination!</p>
        <Link to='/home'><Button style={{marginLeft: '30%', marginTop: '5%'}}>Book Now</Button></Link>
        </div>
      },
      {
        id: 2,
        altText: 'Interactive Solar System',
        content:<div className='caroussel' style={{color: 'white'}}>
        <h1 className='display-3'>Find Your Next Trip</h1>
        <p style={{fontSize: '20px', marginTop: '2%'}}>Explore our interactive solar system to find your next destination.</p>
        <Link to='/explore'><Button style={{marginLeft: '30%', marginTop: '5%'}}>Explore</Button></Link>
        </div>
      },
      {
        id: 3,
        altText: 'Zero-G Flights',
        content:<div className='caroussel'>
        <h1 className='display-3'>Experience Space Close to Home</h1>
        <p style={{fontSize: '20px', marginTop: '2%'}}>Book a 0 gravity flight and experience weightlessness on Earth!</p>
        <Button style={{marginLeft: '30%', marginTop: '2%'}}>Book Now</Button>
        </div>
      }
    ];

    //animation/ changement de page du caroussel
  
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
    //changement de fond en fonction des pages
    
    const slides = items.map((item) => {
      if(item.id==1){
        var background = "custom-tag-1"
      }else if(item.id==2){
        var background = "custom-tag-2"
      }else{
        var background = "custom-tag-3"
      }
      return (
        <CarouselItem
          className={background}
          tag="div"
          key={item.id}
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
  
        >
            <Navig/>
          {item.content}
          
        </CarouselItem>
      );
    });
  
    return (
      <div style={{backgroundColor: 'black'}}>
        
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
        >
          <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
          {slides}
          <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
          <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
      </div>
    )
  }