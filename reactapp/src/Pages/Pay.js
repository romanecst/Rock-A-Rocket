import React, { useState, useEffect } from 'react';
import '../App.css';
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {
  Button,InputGroup, InputGroupAddon, InputGroupText, Input
} from 'reactstrap';

import { Redirect } from 'react-router-dom';
import { set } from 'mongoose';
import {connect} from 'react-redux';


const stripePromise = loadStripe('pk_test_51HfQFACHHl93Y5PiikCQkm8axeZ7jnK9A00dlk15nvLMz29O2p2hU6mAhD0fBqAdnMukCTa5rIJlgiHHgAxBQLF200UoWuTYvv');
//paiement
function Checkout(props) {
  const [redir, setRedir] = useState(<div/>);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
    const stripe = useStripe();
  const elements = useElements();

  //au chargement du modal de paiement si l'utilsateur est connecté affichage de son nom et email
  useEffect(()=>{
    async function checkUser(){
    if(props.token){
      const data = await fetch('/user', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `token=${props.token}`
      })
      const body = await data.json()

      setUsername(body.user.username);
      setEmail(body.user.email);
    }
  }
  checkUser()
  },[])

  //utilisation de Stripe pour gerer le paiement
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how to find your CardElement because 
    //there can only ever be one of each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      setSuccess(true);
      //si le paiement fonctionne enregistrement en bdd du voyage 
      const data = await fetch('/addTrip', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `token=${props.token}&departure=${props.rocket.departure}&agency=${props.rocket.agency}&rocket=${props.rocket.rocket}&price=${props.rocket.price}&city=${props.rocket.city}&destination=${props.rocket.destination}`
      })
      const body = await data.json();
  //si lenregistrement en bdd fonctionne redirection vers la page my trips
      if(body){
        setTimeout(function(){setRedir(<Redirect to='/trips'/>)}, 3000);
      }
      
    }
  };

  //customistion du design du paiement
  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        
        iconColor: '#0275d8',
        color: 'black',
        fontWeight: 500,
        fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
        fontSize: '18px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': {color: '#fce883'},
        '::placeholder': {color: '#0275d8'},
      },
      invalid: {
        iconColor: '#d9534f',
        color: '#d9534f',
      },
    },
  };

  //tant que le paiement n'est pas validé renvoi du modal de paiement
  if(!success){
    var modal = <><p style={{fontSize: 18, color: '#0275d8'}}>Name</p>
    <input type='text' onChange={(e)=>setUsername(e.target.value)} value={username}/>
    <p style={{fontSize: 18, color: '#0275d8', paddingTop: 5}}>Email</p>
    <input type='text' onChange={(e)=>setEmail(e.target.value)} value={email}/>
  <CardElement options={CARD_OPTIONS}/>
   <Button type="submit" color='primary' disabled={!stripe}>
       Pay
   </Button>
   <p style={{fontSize:13, cursor: 'pointer', color:'#0275d8', marginTop: 20}} onClick={()=>setRedir(<Redirect to='/sign'/>)}>Sign in/ Sign up here</p></>
  }else{
    //des que le paiement est validé affichage d'un message de succès
    var modal = <p className='text-center' style={{fontSize: 18, color: '#0275d8'}}>Payment Successful!</p>
  }

  return (
       <form onSubmit={handleSubmit}>
         {modal}
        {redir}
        </form>

  );
};

function Pay(props) {
  return (
    <Elements stripe={stripePromise}>
      <Checkout token={props.token} rocket={props.rocket}/>
    </Elements>
  );
}

function mapStateToProps(state){
  return {token: state.token, rocket: state.rocket}
}

export default connect(
  mapStateToProps,
  null
)(Pay);