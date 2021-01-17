import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Button,Jumbotron, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Input
  } from 'reactstrap';
import Navig from './Navig';
import ariane from '../img/ariane.jpg';
import atlas from '../img/atlas.jpeg';
import electron from '../img/electron.jpg';
import falcon from '../img/falcon.jpg';
import hiia from '../img/hiia.jpg';
import longmarch from '../img/longmarch.jpg';
import soyuz from '../img/soyuz.jpeg';
import vega from '../img/vega.jpg';
import {connect} from 'react-redux';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import Pay from './Pay';

//affichage des resultats de la recherche de voyage
function Map(props) {
  const [tripList, setTripList] = useState([]);
  const [tripFiltered, setTripFiltered] = useState([]);
  const [count, setCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modify, setModify] = useState(false);
  const [location, setLocation]= useState(props.trip.location);
  const [date1, setDate1]= useState(props.trip.date1);
  const [date2, setDate2]= useState(props.trip.date2);
  const [destination, setDestination]= useState(props.trip.destination);

  const rockets = [ariane,atlas,electron,falcon,hiia,longmarch,soyuz,vega]

  //ouverture et fermeture du modal et dropdown 
  const toggleModal = () => setModal(!modal);

  const toggle = () => setDropdownOpen(prevState => !prevState);

    useEffect(()=>{
//recupération des lancement de fusées correspondant à la recherche grace à une API au chargement du composant
      const Search = async() => {
        var rawResponse = await fetch(`https://launchlibrary.net/1.4/launch/${props.trip.date1}/${props.trip.date2}`);
          var response = await rawResponse.json();
//s'il y a une reponse de l'API, enregistrement de celle ci dans un etat
          if(response !== undefined){
            //ajout d'un prix aléatoire au voyage
            var addPrice = response.launches.map(element => {
              element.price = Math.round(Math.random()*10000);
              element.image = rockets[Math.round(Math.random()*rockets.length)];
              return element;
            });
            console.log('addPrice', addPrice)
            setTripList(addPrice);
            setTripFiltered(addPrice);
            setCount(response.count);
          }
       }
//execution de la fonction seulement s'il y a reception d'information de la recherche
      if(Object.keys(props.trip).length !== 0){
        Search();
      }
    },[]);

  const SearchAgain = async() => {
    if(location!==''&&destination!==''&&date1!==''&&date2!==''){
      var rawResponse = await fetch(`https://launchlibrary.net/1.4/launch/${date1}/${date2}`);
      var response = await rawResponse.json();
//s'il y a une reponse de l'API, enregistrement de celle ci dans un etat
      if(response !== undefined){
        //ajout d'un prix aléatoire au voyage
        var addPrice = response.launches.map(element => {
          element.price = Math.round(Math.random()*10000);
          element.image = rockets[Math.round(Math.random()*rockets.length)];
          return element;
        });
        console.log('addPrice', addPrice)
        setTripList(addPrice);
        setTripFiltered(addPrice);
        setCount(response.count);
      }
      setModify(false);
    }
  }

    // var button = {backgroundColor: '#70A19D' , borderColor: '#8FD0CE', borderWidth: '2px'};
    var bold = {fontWeight: 'bold'};

  //creation d'une liste de pays dans lesquels les lancements ont lieux
    var countryList = [];
    var country = '';
    for(var a=0; a<tripList.length; a++){
      country = tripList[a].location.name.split(' ');
      country = country[country.length-1];
      if(!countryList.includes(country)){
        countryList.push(country)
      }
    }
//creation des markers correspondants à l'emplacement des lancements 
    var markers = tripFiltered.map(function(el, i){
      return <Marker position={[el.location.pads[0].latitude, el.location.pads[0].longitude]} >
      <Popup>
        <b>{el.rocket.name}</b> <br /> {el.location.pads[0].name}
      </Popup>
      </Marker>
    })

    if(modify){
      var tripDetails = <div className='d-flex flex-wrap justify-content-between align-items-center' style={{width: '80%', padding: '15px', margin: 'auto'}}>
   <div className='d-flex flex-wrap justify-content-around' style={{width: '40%', fontSize: '20px'}}>
    <span><span style={bold}>From:</span> <Input placeholder="Your Location" onChange={(e)=>setLocation(e.target.value)} value={location}/></span>
    <span><span style={bold}>To:</span> <Input placeholder="Destination" onChange={(e)=>setDestination(e.target.value)} value={destination}/></span>
  </div>
  <div className='d-flex flex-wrap justify-content-between' style={{width: '40%', fontSize: '20px'}}>
    <span><span style={bold}>From:</span> <Input type='date' onChange={(e)=>setDate1(e.target.value)} value={date1}/></span>
    <span><span style={bold}>To:</span> <Input type='date' onChange={(e)=>setDate2(e.target.value)} value={date2}/></span>
  </div> 
  <Button style={{backgroundColor: '#54757E', borderColor: '#4C6A73', borderWidth: '2px', marginTop: 15}} onClick={()=>SearchAgain()}>Search</Button>
    </div>
    }else{
      var tripDetails =  <div className='d-flex flex-wrap justify-content-between align-items-center' style={{width: '80%', padding: '15px', margin: 'auto'}}>
    <div className='d-flex flex-wrap justify-content-around' style={{width: '40%', fontSize: '20px'}}>
      <span><span style={bold}>From:</span> {location}</span>
      <span><span style={bold}>To:</span>  {destination}</span>
    </div>
    <div className='d-flex flex-wrap justify-content-between' style={{width: '40%', fontSize: '20px'}}>
      <span><span style={bold}>From:</span>  {date1}</span>
      <span><span style={bold}>To:</span>  {date2}</span>
    </div> 
    <Button style={{backgroundColor: '#54757E', borderColor: '#4C6A73', borderWidth: '2px'}} onClick={()=>setModify(!modify)}>Modify</Button>
    </div>
    }

    return (
        <div style={{backgroundColor: 'black'}}>
          <div className='background-map'>
            <Navig/>
          </div>
          
          <h1 className='display-4 text-center' style={{padding: '20px', color: 'white'}}>Choose Your Rocket</h1>
          <div style={{backgroundColor: '#70A19D'}}>
              {tripDetails}
          </div>
          <div style={{backgroundColor: '#54757E'}}>
            <div className='d-flex justify-content-center' style={{width: '70%', fontSize: '20px',  padding: '15px', margin: 'auto'}}>

              {/* filtrage des résulltats par pays */}
              <p style={{marginRight: 20}}>Filter by:</p>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret>
                Country
                </DropdownToggle>
              <DropdownMenu>

              {/* au click réinitialisation du tableau de voyage au résultat initial de la recherche */}
              <DropdownItem onClick={()=>{
                setTripFiltered(tripList);
                setCount(tripList.length);
                }}>Show All</DropdownItem>
              <DropdownItem divider />

              {/* affichage des pays et au click sur un pays seul les lancement situés dans ce pays apparaissent*/}
                {countryList.map(function(el, i){
                return <DropdownItem onClick={()=>{
                  var filtered = tripList.filter(elem => elem.location.countryCode == el);
                  setTripFiltered(filtered);
                  setCount(filtered.length)
                 }}>{el}</DropdownItem>
                })}
              </DropdownMenu>
            </Dropdown>
            </div>
          </div>

              {/* affichage de la carte comprenant la localisation de chaque lancement */}
          <MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
          </MapContainer>

              {/* affichage des résulltats avec informations sur chaque lancement */}
          <div className='background-map2'>
          <h1 className='text-center' style={{padding: '20px', color: 'white', fontWeight: 'lighter'}}>{count} Results</h1>
            {tripFiltered.map(function(el, i){
          return <Jumbotron key={i} className='jumbo'>
            <div className='row' style={{marginTop: '-0.5cm', marginBottom: '0.8cm'}}>
              <img src={el.image} className='col-10 offset-1 col-md-9 offset-lg-0 col-lg-5 col-xl-4' style={{borderRadius: '30px', marginBottom: 30}}/>
              <div className='col-lg-7 col-xl-8'>
                <p className="lead"><span style={bold}>City of departure:</span> {el.location.name}</p>
                <p className="lead"><span style={bold}>Date of departure:</span> {el.net}</p>
                <p className="lead"><span style={bold}>Rocket name:</span> {el.rocket.name}</p>
                <p className="lead"><span style={bold}>Agency:</span> {el.lsp.name}</p>
                <p className="lead"><span style={bold}>Price:</span> {el.price}€</p>
              </div>
            </div>
            <hr className="my-2" />

              {/* au click ouverture d'un modal de paiement et stockage des inforamations du voyage dans le redux store*/}
            <Button color="primary" style={{marginBottom: '-1cm'}} onClick={()=>{toggleModal(); props.addLaunch({city: el.location.name, destination: props.trip.destination, departure: el.net, agency: el.lsp.name, rocket: el.rocket.name, price: el.price});}}>Book Now</Button>
          </Jumbotron>
          })
          }
          </div>

          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>Your Payment Details</ModalHeader>
            <ModalBody>
              <Pay/>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>

        </div>
    )
}

function mapDispatchToProps(dispatch){
  return {
    addLaunch: function(info){
      dispatch({type: 'rocket', info: info})
    }
  }
}
      
function mapStateToProps(state) {
  return { trip: state.trip }
}
  
export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Map);