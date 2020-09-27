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
    $('body').on('change', '#filter', function (event) {
        const bookmarkRating = parseInt($('#filter').val());
        // console.log('rating', bookmarkRating)
        store.filterBookmarksByStars(bookmarkRating)
        store.filter = true;
        render();
    })
}



//////////////////////////////////////////////////////
// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO SHOW THE BOOKMARK LIST PAGE
//////////////////////////////////////////////////////

function whenAddButtonIsClicked() {
    $('body').on('click', '#add-new-button', function (event) {
        event.preventDefault();
        console.log('whenAddButtonIsClicked ran')
        store.adding = true;
        render();
        // I want the start page buttons to stay up when the new page loads
    })
};

//////////////////////////////////////////////////////
// EVENT LIST. FOR WHEN ADD NEW BUTTON IS CLICKED TO ADD NEW CONTENT TO LIST 
//- watch for click of sumbit - to get info on input
//////////////////////////////////////////////////////

function addNewBookmark() {
    $('body').on('click', '#save', function (event) {
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
            .catch(error => console.log(error))


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


//////////////////////////////////////////////////////
// Delete Button Event Listener
//////////////////////////////////////////////////////

function deleteBookmark() {
    $('body').on('click', '#delete-button', function (event) {
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
    $('.js-filter-by-rating').on('change', (e) => {
        store.changeFilter(e.currentTarget.value);
        console.log('event binder working')
        return render();
    })
    filterSavedBookmarks();
    whenAddButtonIsClicked();
    addNewBookmark();
    getBookmarkId();
    expandBookmark();
    collapseBookmark();
    deleteBookmark();
}



export default {
    eventBinder
}