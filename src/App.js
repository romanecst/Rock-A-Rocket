import React, { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {
  Navbar, NavbarBrand,Nav,Button,NavLink,InputGroup, InputGroupAddon, InputGroupText, Input,
  CardText, CardBody
} from 'reactstrap';

function App(){
  return (
    <Router>
      <div>
        <Switch>
            <Route path="/exp">
              <Page2 />
            </Route>
            <Route path="/jupiter">
              <Jupiter/>
            </Route>
            <Route path="/">
              <Home/>
            </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Navig(){
  var logo = {
    width: "180px"
  };
  return (
        <Navbar expand="md">
          <NavbarBrand><Link to="/"><img src="/rockarocket-logo-white.png" style={logo}/></Link></NavbarBrand>
            <Nav className="mr-auto" navbar>
            </Nav>
            <NavLink><Link to="/exp">Explore</Link></NavLink>
            <NavLink href="#">Get Inspired</NavLink>
            <NavLink href="#">Log In</NavLink>
        </Navbar>
  )
}

function Home() {
  var white = {
    color: "white"
  }
  var width = {
    width: "300px"
  }
  var margin = {
    marginLeft:"10px"
  }
  var from = {
    marginBottom:"10px",
    width: "300px"
  }
  var time = {
    marginBottom:"10px",
    marginLeft:"10px"
  }
  var min = {
    minWidth: '600px'
  }
  return (
    <div className="background">
      <Navig />
      <div className="container">
        <div className="flex">
          <div className="row">
            <h1 className="display-3 text-center" style={white}>FIND A TRIP</h1>
          </div>
          <div className="row">
            <InputGroup style={from}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>From</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Your Location" />
            </InputGroup>
            <input style={time} type="time" ></input>
          </div>
          <div className="row" style={min}>
            <InputGroup style={width}>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>To</InputGroupText>
                </InputGroupAddon>
                <Input placeholder="Destination" />
            </InputGroup>
            <input style={margin} type="date" ></input>
            <Button style={margin}>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

var Page2 = () => {
  const [display, setDisplay] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [redir, setRedir] = useState(false);

  var div = {
    width: "200px",
    height: '200px',
    position: 'absolute',
    left: '470px',
    top: '160px',
    cursor: 'pointer'
  }
  if(!display){
  var disp = {
    display: 'none'
  }}else{
    var disp = {
      position: 'absolute',
      left: '23.25%',
      top: '18.5%'
    }
  }
  if(!zoom){
    var zoomin = {}
  }else{
      zoomin = {
        webkitTransitionDuration: '3s',
        webkitTransform: 'scale(4)',
        transform: 'scale(4)'
      }
  }
  var red = [];
  if(redir == true){
    red.push(<Redirect to="/jupiter" />);
  }
  return (
    <div style={zoomin} className="background-exp">
      <Navig />
      <img style={disp} src='https://media.giphy.com/media/OP9DVYIfo6hu8/source.gif'></img>
      <div id="jupiter" style={div} onClick={() =>{setZoom(!zoom); setTimeout(function(){ setDisplay(!display); },900); setTimeout(function(){ setRedir(true); },3500)}}></div>
      {red}
    </div>
  )
}

function Jupiter(){
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
        <Button style={top}>Reserve My Trip</Button>
      </CardBody>
      </div>
    </div>
  )
}

export default App;
