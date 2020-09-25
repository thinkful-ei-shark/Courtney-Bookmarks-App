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
    })
};





// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO ADD NEW CONTENT TO LIST 




//WATCH FORM 
//- watch for click of sumbit - to get info on input
function addNewBookmark() {
    $('#js-bookmark-form').on('submit', function (event) {
        event.preventDefault();
        let userWebsite = $(".js-url").val();
        let userDescription = $('.js-description').val();
        console.log(userDescription, userWebsite)
    })
}


export default {
   //watchForm,
    whenAddButtonIsClicked
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

