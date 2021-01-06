//stockage to token de l'utilisateur pour pouvoir y accéder de toutes les pages
export default function(token = '', action) {
    if(action.type == 'token') {
      return action.token;
    } else {
      return token;
    }  
  }