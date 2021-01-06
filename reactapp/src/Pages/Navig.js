import React from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import {
  Navbar, Nav
} from 'reactstrap';

import {connect} from 'react-redux';

//creation d'une barre de navigation commune à tout le site

function Navig(props){
    var logo = {
      width: "180px"
    };
//si l'utilisateur est connecté affiche My trips sinon Log In
    if(props.token){
      var logged = <Link  to="/trips" style={{color: 'white'}}>My trips</Link>
    }else{
      var logged = <Link  to="/sign" style={{color: 'white'}}>Log In</Link>
    }

    return (
          <Navbar className='d-flex justify-content-between' expand="md">
            <Link to="/"><img src="/rockarocket-logo-white.png" style={logo}/></Link>
              <Nav className='d-flex justify-content-between' style={{width: '300px'}}>
              <Link to="/explore" style={{color: 'white'}}>Explore</Link>
              <Link to="/home" style={{color: 'white'}}>Find A Trip</Link>
              {logged}
              </Nav>
          </Navbar>
    )
  }
//recuperation du token stoké dans le redux store
function mapStateToProps(state){
  return {token: state.token}
}

export default connect(
  mapStateToProps,
  null
)(Navig);