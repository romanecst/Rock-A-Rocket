import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Button,InputGroup, InputGroupAddon, InputGroupText, Input, Jumbotron, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter 
  } from 'reactstrap';
import Navig from './Navig';

import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

//connection et enregistrement de l'utilisateur
function Sign(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [listErrorSignUp, setListErrorSignUp] = useState([]);
  const [redir, setRedir] = useState(<div/>);
  const [signup, setSignup] = useState(false);
  const [listErrorsSignin, setErrorsSignin] = useState([])


  var handleSubmitSignUp = async () => {
//envoi au backend des infos de l'utilisateur pour enregistrement en bdd
    const data = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `username=${username}&email=${email}&password=${password}`
    })

    const body = await data.json()
//si l'enregistrement a bien eu lieu enregistrement du token de l'utilisateur dans le redux store
//et redirection vers la page my trips ou vers la page map si l'utilisateur etait en cours d'achat
    if(body.result == true){
      console.log('Logged in!');
      props.addToken(body.token);
      if(Object.keys(props.rocket) !== 0 ){
        setRedir(<Redirect to='/map'/>);
      }else{
       setRedir(<Redirect to='/trips'/>);
      }

    } else {
      setListErrorSignUp(body.error)
    }
  }
//affichage des erreurs
  var tabErrorsSignup = listErrorSignUp.map((error,i) => {
    return(<div style={{color: 'red', fontSize: 12}}>{error}</div>)
  })

  var handleSubmitSignin = async () => {
 //envoi au backend des infos de l'utilisateur pour verification en bdd
    const data = await fetch(`/sign-in`, {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${email}&password=${password}`
    })

    const body = await data.json()
//si la verification de l'email et du mot de passe est correcte, enregistrement du token de l'utilisateur dans le redux store
//et redirection vers la page my trips ou vers la page map si l'utilisateur etait en cours d'achat
    if(body.result == true){
      console.log('Logged in!');
      props.addToken(body.token)
      if(Object.keys(props.rocket) !== 0 ){
        setRedir(<Redirect to='/map'/>);
      }else{
       setRedir(<Redirect to='/trips'/>);
      }
    }  else {
      setErrorsSignin(body.error)
    }
  }
//affichage des erreurs
  var tabErrorsSignin = listErrorsSignin.map((error,i) => {
    return(<div style={{color: 'red', fontSize: 12}}>{error}</div>)
  })

//si l'utisateur veut s'inscrire rajout d'un champs username et d'un boutton signup
  if(signup){
  var name = <InputGroup style={{marginLeft:"15px", width: "300px",marginBottom:"15px"}}>
  <InputGroupAddon addonType="prepend">
    <InputGroupText>U</InputGroupText>
  </InputGroupAddon>
  <Input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} value={username} />
</InputGroup>

//au click sur le boutton si dessous renvoi du modal sigin
  var noAccount = <div style={{display: 'flex', flexDirection:'row',alignItems:'flex-end', marginBottom: '-1cm'}}> <Button color="primary" style={{flex:1}} onClick={()=>handleSubmitSignUp()}>Sign up</Button>
  <p style={{fontSize:12, cursor: 'pointer', color:'#0275d8', marginLeft: 20, flex:2.5}} onClick={()=>setSignup(false)}> Already have an account? Sign in</p></div>

  }else{
    var name= <div/>
    //au click sur le boutton si dessous renvoi du modal sigup
    var noAccount = <div style={{display: 'flex', flexDirection:'row', alignItems:'flex-end', marginBottom: '-1cm'}}> <Button color="primary" style={{flex:0.5}} onClick={()=>handleSubmitSignin()}>Log In</Button>
    <p style={{fontSize:12, cursor: 'pointer', color:'#0275d8', marginLeft: 20, flex:2}} onClick={()=>setSignup(true)}> No account? Sign up</p> </div>
  }

    return (
        <div className="backgroundSign">
          <Navig />
          <div className="container">
            <div className="flex">
              <div className="row">
              <Jumbotron className='jumbo'>
            <div className='row' style={{marginTop: '-1cm', marginBottom: '0.8cm'}}>
              <div className='col-8'>
              {name}
              <InputGroup style={{marginLeft:"15px", width: "300px",marginBottom:"15px"}}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>@</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            </InputGroup>
            <InputGroup style={{marginLeft:"15px", width: "300px",marginBottom:"15px"}}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>**</InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Password" type='password' onChange={(e)=>setPassword(e.target.value)} value={password} />
            </InputGroup>
            {tabErrorsSignup}{tabErrorsSignin}
              </div>
            </div>
            <hr className="my-2" />
            {noAccount}
              </Jumbotron>
             </div>
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
  return {rocket: state.rocket}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sign);