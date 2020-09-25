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
      
        // let newRating = 
        
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

//////////////////////////////////
//EVENT LISTENER FOR SHOWING BOOKMARKS COLLAPSED VIEW 
/////////////////////////////////
// function collapsedView() {
//     $('main').on('click', '#save', function (event) {
//         event.preventDefault();
//         console.log('collapsedView ran');
//         return $('.toggle-button').toggleClass('hide');
//         render()
//     })
// }


export default {
    whenAddButtonIsClicked,
    addNewBookmark,
   // collapsedView
}





// // PAGE FOR INPUT TO GO 

























// // const generateBookmarkItemsString = function (bookmarkList) {
// //     const items = bookmarkList.map((item) => generateItemElement(item));
// //     return items.join('');
// // };


// // const render = function () {
// //     // Filter item list if store prop is true by item.checked === false
// //     let items = [...store.bookmarks];
// //     if (store.adding) {
// //       items = items.filter(item => !item.adding);
// //     }
// //     // render the shopping list in the DOM
// //     const bookmarkItemsString = generateBookmarkItemsString(items);
// //     // insert that HTML into the DOM
// //     $('.js-bookmark-list').html(bookmarkItemsString);
// //   };  





// //submit button + when they input into text field ///

// // const handleNewItemSubmit = function () {
// //     $('#js-bookmark-form').submit(function (event) {
// //       event.preventDefault();
// //       const newItemName = $('.js-bookmark-entry').val();
// //       $('.js-bookmark-entry').val('');


// //       api.createItem(newItemName)
// //         .then(res => res.json())
// //         .then((newItem) => {
// //           store.addItem(newItem)
// //           render();
// //         })
// //     });
// //     console.log(newItemName)
// // };

