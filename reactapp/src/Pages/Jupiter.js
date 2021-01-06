import React, { useState, useEffect } from 'react';
import {
    CardText, CardBody
  } from 'reactstrap';
import Navig from './Navig';
import {Link} from 'react-router-dom'

//affichage d'informations sur la planète Jupiter
export default function Jupiter(){
    const [zoom, setZoom] = useState(false);
    const [disp, setDisp] = useState(false);
    useEffect(() => {
      setTimeout(function(){ setZoom(true);},300);
      setTimeout(function(){ setDisp(true);},5500);
    }, []);
    if(!zoom){
      var zoomin = {}
    }else{
    zoomin = {
      webkitTransitionDuration: '5s',
      webkitTransform: 'scale(1)',
      transform: 'scale(1)'
    }}
    if(!disp){
      var background ={
        display: 'none'
      }
    }else{
    var background= {
      color: "white",
      backgroundColor: "rgb(59, 56, 56)",
      opacity: '0.8',
      width: '350px',
      height:'500px',
      position: 'absolute',
      top: '200px',
      left: '50px',
      borderRadius: '20px'
    }}
    var top = {
      marginTop: '20px'
    }
    return (
      <div style={zoomin} className="background-jup">
        <Navig />
        <div style={background}>
        <h1 className="display-4 text-center">Welcome to Jupiter</h1>
        <CardBody className="text-center">
          <CardText>Current Temperature: -145˚c</CardText>
          <CardText>Current Weather: Raging Storm</CardText>
          <CardText>As Jupiter is mostly swirling gases and liquids, a spacecraft has nowhere to land and you will therefore only be able to tour the biggest planet in our solar system.</CardText>
          <CardText>This trip is ideal for amateurs of extreme sports and cinema.</CardText>
          <Link to='/home' className='btn btn-secondary' style={top}>Book My Trip</Link>
        </CardBody>
        </div>
      </div>
    )
  }