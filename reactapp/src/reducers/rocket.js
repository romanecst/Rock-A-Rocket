//reducer destiné à enregistrer les informations du voyage selectioné sur la page map pour l'envoyer au composant pay 
export default function(rocket = {}, action) {
    if(action.type == 'rocket') {
      return action.info;
    } else {
      return rocket;
    }  
  }