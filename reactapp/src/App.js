import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,Switch,Route
} from "react-router-dom";


import Home from './Pages/Home';
import Jupiter from './Pages/Jupiter';
import Explore from './Pages/Explore';
import Discover from './Pages/Discover';
import Map from './Pages/Map';
import Pay from './Pages/Pay';
import Sign from './Pages/Sign';
import Mytrips from './Pages/Mytrips';
import trip from './reducers/trips';
import token from './reducers/token';
import rocket from './reducers/rocket';

import {Provider} from 'react-redux';

import {createStore, combineReducers}  from 'redux';
//creation store redux pour stocker et accéder à certaines informations durant la navigation 
const store = createStore(combineReducers({trip, token, rocket}));

//creation des differentes routes du site associées aux composants correspondants
function App(){
  return (
    <Router>
      <div>
        <Switch>
        <Provider store={store}>
            <Route path="/explore" exact component={Explore} />
            <Route path="/map" exact component={Map} />
            <Route path="/jupiter" exact component={Jupiter}/>
            <Route path="/home" exact component={Home} />
            <Route path="/pay" exact component={Pay} />
            <Route path="/sign" exact component={Sign} />
            <Route path="/trips" exact component={Mytrips} />
            <Route path="/" exact component={Discover} />
          </Provider>
        </Switch>
      </div>
    </Router>
  );
}



export default App;
