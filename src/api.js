// PAGE TO HOUSE ALL API FUNCITONS 


const BASE_URL = 'https://thinkful-list-api.herokuapp.com/courtneycarson';


//fetch api & error handling
const bookmarkApiFetch = function (...args) {
    let error;
    return fetch(...args)
        .then(res => {
        if (!res.ok) {
          error = { code: res.status };
  
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
  
        return res.json();
      })
      .then(data => {
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }
  
        return data;
      });
  };
  

//GET function to get from api
function getItems() {
    console.log(getItems)
    return bookmarkApiFetch(`${BASE_URL}/items`)
}

//POST function to create item
const createItem = function (name) {
   const newItem = JSON.stringify({ name })
    return fetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: newItem
    })
}


//PATCH (modifies 1 item) function to edit item
const updateItem = function (id, updateData) {
    const newData = JSON.stringify(updateData)
    return fetch(`${BASE_URL}/items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: newData
    })
}

//DELETE function to delete 
const deleteItem = function (id) {
    return fetch(BASE_URL + '/items/' + id, {
        method: 'DELETE'
    });
}



export default {
    bookmarkApiFetch,
    getItems,
    createItem,
    updateItem,
    deleteItem
};