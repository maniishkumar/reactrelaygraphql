import ServerActions from './actions/ServerActions';
let API = {
    fetchLinks(){
        //console.log('API is working fine');
        /*fetch("/data/links").then(res => {
            return res.json();
        }).then(data => {
            //console.log('Data: ', data);
            ServerActions.receiveLinks(data);
        });*/
        fetch("/graphql", {
            method: "POST",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({query: `{ 
                links {
              _id,
              title,
              url
            }
            }`})
        }).then(res => {
            return res.json();
        }).then(data => {
            //console.log('Data: ', data);
            ServerActions.receiveLinks(data.data.links);
        });
    }
}

export default API;