import React, { useState, useEffect} from 'react';
import {Redirect} from "react-router-dom";
import Navig from './Navig';

//exploration du system solaire avec annimation (ne marche que sur jupiter pour le moment)
export default function Explore(){
    const [display, setDisplay] = useState(false);
    const [zoom, setZoom] = useState(false);
    const [redir, setRedir] = useState('');
  
    useEffect(() => { 
      console.log(redir);
    }, [redir]);
  
    var nep = {
      width: "60px",
      height: '60px',
      position: 'absolute',
      right: '320px',
      top: '130px',
      cursor: 'pointer'
    }
    var eur = {
      width: "100px",
      height: '100px',
      position: 'absolute',
      right: '60px',
      top: '330px',
      cursor: 'pointer'
    }
    var cal = {
      width: "80px",
      height: '110px',
      position: 'absolute',
      right: 0,
      top: '190px',
      cursor: 'pointer'
    }
    var mer = {
      width: "60px",
      height: '140px',
      position: 'absolute',
      right: 0,
      top: 0,
      cursor: 'pointer'
    }
    var plu = {
      width: "40px",
      height: '30px',
      position: 'absolute',
      right: '100px',
      bottom: '170px',
      cursor: 'pointer'
    }
    var io = {
      width: "120px",
      height: '110px',
      position: 'absolute',
      right: '340px',
      top: '440px',
      cursor: 'pointer'
    }
    var ur = {
      width: "180px",
      height: '170px',
      position: 'absolute',
      left: '680px',
      top: '45px',
      cursor: 'pointer'
    }
    var sat = {
      width: "120px",
      height: '60px',
      position: 'absolute',
      left: '550px',
      top: '190px',
      cursor: 'pointer'
    }
    var gan = {
      width: "100px",
      height: '90px',
      position: 'absolute',
      left: '460px',
      bottom: '150px',
      cursor: 'pointer'
    }
    var earth = {
      width: "150px",
      height: '190px',
      position: 'absolute',
      left: '280px',
      top: '360px',
      cursor: 'pointer'
    }
    var mars = {
      width: "250px",
      height: '250px',
      position: 'absolute',
      left: '100px',
      top: '70px',
      cursor: 'pointer'
    }
    var ven = {
      width: "130px",
      height: '270px',
      position: 'absolute',
      left: 0,
      bottom: '120px',
      cursor: 'pointer'
    }
    var moon = {
      width: "100vw",
      height: '170px',
      position: 'absolute',
      left: 0,
      bottom: 0,
      cursor: 'pointer'
    }
    var jup = {
      width: "320px",
      height: '250px',
      position: 'absolute',
      left: '570px',
      top: '400px',
      cursor: 'pointer'
    }

    if(!display){
    var disp = ''
  }else{
      var disp = <img style={{position:'absolute',left: '450px',top: '300px'}} src='https://media.giphy.com/media/OP9DVYIfo6hu8/source.gif'></img>
    }

    if(!zoom){
      var zoomin = {}
    }else{
        zoomin = {
          webkitTransitionDuration: '2.5s',
          webkitTransform: 'scale(4)',
          transform: 'scale(4)'
        }
    }

    return (
      <div style={zoomin} className="background-exp">
        <Navig />
        {disp}
        <div title="Jupiter" id="jupiter" style={jup} onClick={() =>{setZoom(!zoom); setTimeout(function(){ setDisplay(!display); },1000); setTimeout(function(){ setRedir(<Redirect to="/jupiter" />) },3200)}}></div>
        <div title="The Moon" style={moon}></div>
        <div title="Venus" style={ven}></div>
        <div title="Mars" style={mars}></div>
        <div title="Earth" style={earth}></div>
        <div title="Ganymede" style={gan}></div>
        <div title="Saturn" style={sat}></div>
        <div title="Uranus" style={ur}></div>
        <div title="Io" style={io}></div>
        <div title="Pluto" style={plu}></div>
        <div title="Mercury" style={mer}></div>
        <div title="Callisto" style={cal}></div>
        <div title="Europa" style={eur}></div>
        <div title="Neptune" style={nep}></div>
        {redir}
      </div>
    )
  }