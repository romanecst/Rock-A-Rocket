//reducer destiné à enregistrer la recherche de voyage de la page home pour l'envoyer à la page map
export default function(trip = {}, action) {
    if(action.type == 'trip') {
      var newTrip= action.tripInfo;
      return newTrip;
    } else {
      return trip;
    }  
  }