import $ from 'jquery';
import store from './store'
import api from './api'
import index from './index'
import render from './render'


/// PAGE FOR EVENT LISTENERS

// // EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO SHOW THE BOOKMARK LIST PAGE
function whenAddButtonIsClicked() {
    $('body').on('click', '#add-new-button', function (event) {
        event.preventDefault();
        console.log('whenAddButtonIsClicked ran')
        store.adding = true;
        render();
        // I want the start page buttons to stay up when the new page loads
    })
};


// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO ADD NEW CONTENT TO LIST 
//- watch for click of sumbit - to get info on input
function addNewBookmark() {
    $('body').on('click', '#save', function (event) {
        event.preventDefault();
        console.log('addNewBookmark ran')
        let newTitle = $('#bookmark-title').val();
        let newUrl = $('#url').val();
        let newDescription = $('#description').val();
      
    
        
        let newBookmark = {
            title: newTitle,
            url: newUrl,
            desc: newDescription,
            rating: 2,
        };
        console.log(newBookmark);
        
        api.createItem(newBookmark)
            .then(res => {
                if (res.ok) return res.json()
                throw new Error(res.statusText)
                
            })
            .then((newBookmark) => {
                store.addItem(newBookmark)
                store.adding = false;
                render();

            })
        .catch(error => console.log(error))

        
    });
};

////// FUNCTION 
function getBookmarkId(bookmark) {
    return $(bookmark)
        .closest('.bookmark-section')
        .data('item-id');
}


/// function to show expanded view
 function expandBookmark() {
    $('body').on('click', '#expand', function (event) {
        const id = getBookmarkId(event.currentTarget);
        console.log('expandBookmark ran')
        console.log(id)
    
        store.findById(id).expanded = !store.findById(id).expanded;
        render();      
    })
 }

function collapseBookmark() {
    $('body').on('click', '#collapse', function (event) {
        const id = getBookmarkId(event.currentTarget);
        console.log('collapseBookmark ran');
        console.log(event.currentTarget)
        console.log(id)
        store.findById(id).expanded = !store.findById(id).expanded;
        render();   
    })
}

///// have to delete right item, possibly by finding the id for it - function runs, just does not delete item.
//////////// Delete Button Event Listener
function deleteBookmark() {
    $('body').on('click', '#delete', function (event) {
        event.preventDefault();
        console.log('deleteBookmark ran')
        const id = getBookmarkId(event.currentTarget);
        console.log(id)
    
            api.deleteItem(id)
             .then(()=> {
                 store.findAndDelete(id);
                 console.log(id);
                 render();
              })
            //  .catch((error) => {
            //      console.log(error);
            //      store.setError(error.message);
            //      renderError();
            //  });
        });
    }


export default {
    whenAddButtonIsClicked,
    addNewBookmark,
    getBookmarkId,
    expandBookmark,
    collapseBookmark,
    deleteBookmark,
}