import $ from 'jquery';
import store from './store'
import api from './api'
import index from './index'
import render from './render'


/// PAGE FOR EVENT LISTENERS
//////////////////////////////////////////////////////
///// Event Listener to filter bookmarks by star rating
//////////////////////////////////////////////////////

function filterSavedBookmarks() {
    $('main').on('change', '#filter', function (event) {
        const bookmarkRating = parseInt($('#filter').val());
      store.filter = bookmarkRating;
      console.log(store.filter)
        render();
    })
}



//////////////////////////////////////////////////////
// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO SHOW THE BOOKMARK LIST PAGE
//////////////////////////////////////////////////////

function whenAddButtonIsClicked() {
    $('main').on('click', '#add-new-button', function (event) {
        event.preventDefault();
        console.log('whenAddButtonIsClicked ran')
        store.adding = true;
        render();
    })
};

//////////////////////////////////////////////////////
// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO ADD NEW CONTENT TO LIST 
//- watch for click of sumbit - to get info on input
//////////////////////////////////////////////////////

function addNewBookmark() {
    $('main').on('click', '#save', function (event) {
        event.preventDefault();
        console.log('addNewBookmark ran')
        let newTitle = $('#bookmark-title').val();
        let newUrl = $('#url').val();
        let newDescription = $('#description').val();
        let newRating = $(this).parent().parent().find('select');
        store.adding = false;


        let newBookmark = {
            title: newTitle,
            url: newUrl,
            desc: newDescription,
            rating: parseInt(newRating.val()),
        };
        console.log(newBookmark);

        api.createItem(newBookmark)
            .then(res => {
                if (res.ok) return res.json()
                throw new Error(res.statusText)

            })
            .then((newBookmark) => {
                store.addItem(newBookmark)
                render();

            })
            .catch(error =>console.log(error))
    });
};
//////////////////////////////////////////////////////
////// FUNCTION to get id
//////////////////////////////////////////////////////

function getBookmarkId(bookmark) {
    return $(bookmark)
        .closest('.bookmark-section')
        .data('item-id');
}

//////////////////////////////////////////////////////
/// function to show expanded view
//////////////////////////////////////////////////////

function expandBookmark() {
    $('main').on('click', '#expand', function (event) {
        const id = getBookmarkId(event.currentTarget);
        console.log('expandBookmark ran')
        console.log(id)

        store.findById(id).expanded = !store.findById(id).expanded;
        render();
    })
}

function collapseBookmark() {
    $('main').on('click', '#collapse', function (event) {
        const id = getBookmarkId(event.currentTarget);
        console.log('collapseBookmark ran');
        console.log(event.currentTarget)
        console.log(id)
        store.findById(id).expanded = !store.findById(id).expanded;
        render();
    })
}


//////////////////////////////////////////////////////
// Delete Button Event Listener
//////////////////////////////////////////////////////

function deleteBookmark() {
    $('main').on('click', '#delete-button', function (event) {
        const id = getBookmarkId(event.currentTarget);
        console.log(id)
        api.deleteItem(id)
            .then(() => {
               return store.findAndDelete(id);
                // console.log('this is delete bookmark', store.bookmarks);
              //  store.adding = false;
                // render();
            }).then(() => render())
            .catch((error) => {
                store.setError(error.message);
            });
    });
};

//////////////////////////////////////////////////////
//Event Binder
//////////////////////////////////////////////////////

function eventBinder() {
    filterSavedBookmarks();
    whenAddButtonIsClicked();
    addNewBookmark();
    expandBookmark();
    collapseBookmark();
    deleteBookmark();
}

export default {
    eventBinder
}
