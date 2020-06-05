class ApiFootball{
    
    
    static get baseUrl(){
        return 'https://api.football-data.org/v2/';
    }

    static get header(){
        return {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'X-Auth-Token': 'faf96779306341dea18a5f15d5637618'
            },
        };
    }

    static getKlasemen(){
        return fetch(ApiFootball.baseUrl+'competitions/2021/standings',ApiFootball.header)
       .then(response => {
           return response.json();
       })
       .then(responseJson => {
           if(responseJson) {
               return Promise.resolve(responseJson);
           } else {
               return Promise.reject("Data is not found");
           }
       })
    }

    static getJadwal(id_team){
        return fetch(ApiFootball.baseUrl+'teams/'+id_team+'/matches?status=SCHEDULED',ApiFootball.header)
       .then(response => {
           return response.json();
       })
       .then(responseJson => {
           if(responseJson) {
               return Promise.resolve(responseJson);
           } else {
               return Promise.reject("Data is not found");
           }
       })
    }

    static getJadwalId(id){
        return fetch(ApiFootball.baseUrl+'matches/'+id,ApiFootball.header)
       .then(response => {
           return response.json();
       })
       .then(responseJson => {
           if(responseJson) {
               return Promise.resolve(responseJson);
           } else {
               return Promise.reject("Data is not found");
           }
       })
    }
    
    static getKlub(id_team){
        return fetch(ApiFootball.baseUrl+'teams/'+id_team,ApiFootball.header)
       .then(response => {
           return response.json();
       })
       .then(responseJson => {
           if(responseJson) {
               return Promise.resolve(responseJson);
           } else {
               return Promise.reject("Data is not found");
           }
       })
    }
}

export default ApiFootball;