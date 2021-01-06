import React, { useState, useEffect } from 'react';
import {
    Button,InputGroup, InputGroupAddon, InputGroupText, Input,
  } from 'reactstrap';
import Navig from './Navig';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

//Page de recherche de voyage

function Home(props) {
  const [location, setLocation]= useState('');
  const [date1, setDate1]= useState('');
  const [date2, setDate2]= useState('');
  const [destination, setDestination]= useState('');
  const [lat, setLat]= useState(0);
  const [lon, setLon]= useState(0);
  const [uncomplete, setUncomplete]= useState(false);


//activation geolocalisation 
  useEffect(()=>{
    if('geolocation' in navigator) {
        console.log('geolocation is available');
      } else {
        console.log('geolocation IS NOT available');
      }
    navigator.geolocation.getCurrentPosition(async(position) => {
      console.log(position.coords.latitude, position.coords.longitude);
      await setLat(position.coords.latitude);
      await setLon(position.coords.longitude);
    });
  },[]);

//optention du nom de la ville et du pays grace à une API  de reverse geocoding en envoyant la latitude et longitude obtenues avec la geolocalistion
  useEffect(()=>{
const API = async()=> {
      var rawResponse = await fetch(`https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?format=json&lon=${lon}&lat=${lat}&accept-language=en&polygon_threshold=0.0`, {
      "method": "GET",
      "headers": {
          "x-rapidapi-key": "eb71094070msh0f063c4534649bcp14ec8djsn9f81e1fd2c7b",
          "x-rapidapi-host": "forward-reverse-geocoding.p.rapidapi.com"
      }
      });
      var response = await rawResponse.json();
      console.log(response);
      if(response !== undefined){
        //affichage de la ville et du pays
        if(response.address.city !== undefined && response.address.country !== undefined){
          setLocation(response.address.city+', '+response.address.country)
        }
      }
    }
    API();
  },[lat]);

  var alert = <div></div>;
  var loc = {};
  var des= {};
  var d1= {};
  var d2= {};
//si aucun des champs n'est vide renvoi vers la page map et enregistrement des informations de la recherche dans le store redux
  if(location!==''&&destination!==''&&date1!==''&&date2!==''){
    var button = <Link to='/map'><Button style={{marginLeft:"15px",marginBottom:"15px"}} onClick={()=>props.SearchTrip(location, destination, date1, date2, lon, lat)}>Search</Button></Link>
//sinon affichage du ou des champs non rempli en rouge
  }else{
    var button = <Button style={{marginLeft:"15px",marginBottom:"15px"}} onClick={()=> setUncomplete(true)}>Search</Button>
  }

  if(uncomplete){
    if(location===''){
      loc= {
        border: '1px solid red'
      }
    }
    if(destination===''){
      des= {
        border: '1px solid red'
      }
    }
    if(date1===''){
      d1= {
        border: '1px solid red'
      }
    }
    if(date2===''){
      d2= {
        border: '1px solid red'
      }
    }
    alert = <div className="row"><p style={{color:'red', backgroundColor: '#f7c7c7', paddingLeft: '0.5cm', paddingRight: '0.5cm', paddingTop: '0.2cm', paddingBottom: '0.2cm', borderRadius: '20px'}}>Please fill all the input fields</p></div>
  }

  return (
    <div className="background">
      <Navig />
      <div className="container">
        <div className="flex">
          <div className="row">
            <h1 className="display-3 text-center" style={{color: "white"}}>FIND A TRIP</h1>
          </div>
          <div className="row">
            <InputGroup style={{marginBottom:"15px",width: "450px"}}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>In Between</InputGroupText>
              </InputGroupAddon>
              <Input style={d1} type="date" onChange={(e)=>setDate1(e.target.value)} value={date1}/>
              <Input style={d2} type="date" onChange={(e)=>setDate2(e.target.value)} value={date2}/>
            </InputGroup>
          </div>
          <div className="row">
          <InputGroup style={{marginLeft:"15px", width: "300px",marginBottom:"15px"}}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>From</InputGroupText>
              </InputGroupAddon>
              <Input style={loc} placeholder="Your Location" onChange={(e)=>setLocation(e.target.value)} value={location}/>
            </InputGroup>
            <InputGroup style={{marginLeft:"15px",width: "300px", marginBottom:"15px"}}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>To</InputGroupText>
                </InputGroupAddon>
                <Input style={des} placeholder="Destination" onChange={(e)=>setDestination(e.target.value)} value={destination}/>
            </InputGroup>
            {button}
          </div>
          {alert}
        </div>
      </div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    SearchTrip: function(location, destination, date1, date2, lon, lat) { 
        dispatch( {type: 'trip', tripInfo:{location: location, destination: destination, date1: date1, date2: date2, lon: lon, lat: lat}} ) 
    }
  }
}

export default connect(
    null, 
    mapDispatchToProps
)(Home);