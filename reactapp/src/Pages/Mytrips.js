import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Button,InputGroup, InputGroupAddon, InputGroupText, Input, Jumbotron, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter 
  } from 'reactstrap';
import Navig from './Navig';
import {Link, Redirect} from "react-router-dom";

import {connect} from 'react-redux';

//affichage des voyages achetés par l'utilisateur
function Trips(props) {
    const [redir, setRedir] = useState(<div/>);
    const [trips, setTrips] = useState([]);

    var bold = {fontWeight: 'bold'};
//recuperation des voyages de l'utilsateur en bdd avec son token
    useEffect(()=>{
        async function loadTrips(){
            if(props.token){
                const data = await fetch('/trips', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    body: `token=${props.token}`
                  })
                  const body = await data.json()
                  console.log(body);
                  setTrips(body.trips);
            }
        }
        loadTrips()
    },[])
//affichages des voyages, s'il n'y en a pas affichage de no trips
    if(trips.length === 0){
        var allTrips= <p style={{color: 'white'}}>No Trips</p>
    }else{
    var allTrips = trips.map(el=>{
        return <div style={{padding:10, display:'flex', flexDirection:'row wrap',justifyContent:'space-around', backgroundColor: 'white', borderRadius: 12, marginBottom:20}}>
         <p><span style={bold}>City of departure:</span> {el.city}</p>
         <p><span style={bold}>Destination:</span> {el.destination}</p>
        <p><span style={bold}>Date of departure:</span> {el.departure}</p>
        <p><span style={bold}>Rocket name:</span> {el.rocket}</p>
        <p><span style={bold}>Agency:</span> {el.agency}</p>
        <p><span style={bold}>Price:</span> {el.price}€</p>
    </div>
    })
}
  
    return (
        <div className="backgroundTrip">
          <Navig />
          <div className="container">
            <div className="flex">
              <div className="row">
                  <h1 className='display-4' style={{color: 'white', marginBottom: 60}}>My Trips</h1>
                  {/* au click déconnection (le token est effacé du store redux) et retour à la page d'accueil */}
                  <Link style={{marginLeft: 10, marginTop:-40, color:'#d9534f'}} onClick={()=>{props.addToken(''); setRedir(<Redirect to='/'/>)}}>Log Out</Link>
             </div>
             {allTrips}
             {redir}
            </div>
          </div>
        </div>
      );

}

function mapDispatchToProps(dispatch){
    return {
      addToken: function(token){
        dispatch({type: 'token', token: token})
      }
    }
  }

  function mapStateToProps(state){
    return {token: state.token}
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Trips);