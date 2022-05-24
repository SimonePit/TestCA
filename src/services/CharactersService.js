import constants from '../config/constants';

export async function getListCharacters(paginationUrl) {
      var endPoint = "character";
      var url= paginationUrl == null? constants.BASE_URL+endPoint:paginationUrl;
      var res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
      });
      try {
        var responseJson = await res.json();
        return responseJson;
      }
      catch (error) {
        console.log("ERROR---"+error);
        return null;
      }
    }

    export async function getSingleCharacter(id) {
      var endPoint = "character/"+id;
      var url= constants.BASE_URL+endPoint;
      var res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
      });
      try {
        var responseJson = await res.json();
        return responseJson;
      }
      catch (error) {
        console.log("ERROR---"+error);
        return null;
      }
    }

    export async function getItemFromUrl(url) {
      var res = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' 
        },
      });
      try {
        var responseJson = await res.json();
        return responseJson;
      }
      catch (error) {
        console.log("ERROR---"+error);
        return null;
      }
    }
