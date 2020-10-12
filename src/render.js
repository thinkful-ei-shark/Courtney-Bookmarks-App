import $ from 'jquery';
import store from './store'
////// FUNCTIONS TO RENDER THE DIFFERENT STATES OF THE PAGE & THE MAIN/RENDER FUNCTIONS ////////


////////////////////////////////////////////////////////
// STARTING VIEW/TEMPLATE
////////////////////////////////////////////////////////

function loadStartPage() {
    const bookmarks = store.bookmarks;

    let startPage = `
    <div class="new-button>
    <form  class = "button">
        <button type="submit" id="add-new-button">Add Bookmark</button>
    
        <label for="filter"> Filter By Rating:</label>
        <select name="filterby" class="js-filter-by-rating" id="filter" >
       
          <option value="1" ${ store.filter === 1 ? 'selected' : '' }>1+ stars</option>
          <option value="2" ${ store.filter === 2 ? 'selected' : '' }>2+ stars</option>
          <option value="3" ${ store.filter === 3 ? 'selected' : '' }>3+ stars</option>
          <option value="4" ${ store.filter === 4 ? 'selected' : '' }>4+ stars</option>
          <option value="5" ${ store.filter === 5 ? 'selected' : '' }>5+ stars</option>
        </select>
        </form>
        </div>`
  let filteredBookmarks = store.bookmarks.filter(bookmark => bookmark.rating >= store.filter)
    if (filteredBookmarks.length === 0) {
        startPage += `<h1>No Bookmarks Found</h1>`
    } else {
        for (let i = 0; i < filteredBookmarks.length; i++) {
            startPage += renderBookmark(filteredBookmarks[i])
        }
    }
    return startPage;
}

////////////////////////////////////////////////////////
//FUNCTION FOR FILTERING WITH THE DROPDOWN
////////////////////////////////////////////////////////
function filterDropdown(bookmarkRating) {
    let options = ''
    for (let i = 1; i <= 5; i++) {
        if (bookmarkRating === i) {
            options += `<option class ="rating-drop-down" 
            selected="selected" value="${i}"+ stars/</option>`
        } else {
            options += `<option class="rating-drop-down" value="${i}">${i}+ stars</option>`
        }
    };
    return options;
};



////////////////////////////////////////////////////////
// FUNCTION FOR A COLLAPSED VIEW / EXPANDED VIEW
////////////////////////////////////////////////////////

function renderBookmark(bookmark) {
    // console.log(bookmark)
    if (!bookmark.expanded) {
        return `<div class="bookmark-section" data-item-id="${bookmark.id}">
                <h3>${bookmark.title} ${bookmark.rating ? bookmark.rating : 'No Rating'}               
                 <button id='expand'>Expand</button>
                </h3>
                 </div>`
    } else {
        return ` <div class= "bookmark-section" data-item-id="${bookmark.id}">
             <h3>${bookmark.title} ${bookmark.rating ? bookmark.rating : 'No Rating'}</h3>
             <button id='collapse'>Collapse</button>
                <p><a href="${bookmark.url}">${bookmark.title}</a></p>
                <p>${bookmark.desc}</p>
                <button class= "delete" id='delete-button'>Delete</button>
        </div>`
    };
};


/////////////////////////////////////////////////
// Bookmark List View - 1. a text box for adding new bookmark name - 2. URL text box - 3. description text box 4. submit button
/////////////////////////////////////////////////
function addingBookMark() {
    let bookMarkList = `
    <div class "error-ctr"></div>
    <form id="new-bookmark>
    <div class='bookmark'>
        <label for="bookmark-name">Name:</label>
        <input type="text" name= "title" placeholder="Bookmark goes here"
        id="bookmark-title" required>
    </div> 

    <div class='new-bookmark'>
        <label for="url-label">URL:</label>
        <input type="text" name="url" placeholder="https://google.com" id="url" required>
    </div>


    <div>
        <label for="filter-dropdown">Rating:</label>
        <select name="js-add-rating-dropdown" required>
            <option value="" disabled selected hidden></option>
            <option value="1">1 star</option>
            <option value="2">2 star</option>
            <option value="3">3 star</option>
            <option value="4">4 star</option>
            <option value="5">5 star</option>
        </select>
    </div>

    <div class='new-bookmark'>
        <label id="description-box">Description:</label>
        <input type="text" name="Description" placeholder="Google" id="description" required>
     </div>

    <div class="toggle-button" hide> 
        <button type='submit' id='save'>Add</button>
    </div> 
    </form>`
    return bookMarkList;
}

// function generateError(message) {
//     const temp = `
//         <section>
//             <p>${message}</p>
//         </section>
//     `;
//     return temp;
// }

////////////////////////////////////////////////////////
// RENDER FUNCTION
////////////////////////////////////////////////////////
function render() {
    // generateError();

    $('main').html(loadStartPage(store.bookmarks, 1));
    if (store.adding) {
        $('main').html(addingBookMark())
   
    }
}






export default render;
