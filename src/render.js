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
    
        <label id="filter-dropdown"> Filter By Rating:</label>
        <select name="filterby" class="js-filter-by-rating" id="filter">
          <option value="1">1 star</option>
          <option value="2">2 star</option>
          <option value="3">3 star</option>
          <option value="4">4 star</option>
          <option value="5">5 star</option>
        </select>
        </form>
        </div>`
    if (store.bookmarks.length === 0) {
        startPage += `<h1>No Bookmarks Found</h1>`
    } else {
        for (let i = 0; i < bookmarks.length; i++) {
            startPage += renderBookmark(bookmarks[i])
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
        <label id = "bookmark-name"> Bookmark Name:</label>
        <input type="text" name= "title" placeholder="Bookmark goes here"
        id="bookmark-title" required>
    </div> 

    <div class='new-bookmark'>
        <label id="url-label">URL:</label>
        <input type="text" name="url" placeholder="https://google.com" id="url" required>
    </div>


    <div>
        <label id="filter-dropdown"> Filter By Rating:</label>
        <select name="js-add-rating-dropdown">
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
        <input type="text" name="Description" placeholder="Google" id="description">
     </div>

    <div class="toggle-button" hide> 
        <button type='submit' id='save'>Add</button>
    </div> 
    </form>`
    return bookMarkList;
}

function generateError(message) {
    const temp = `
        <section>
            <p>${message}</p>
        </section>
    `;
    return temp;
}

////////////////////////////////////////////////////////
// RENDER FUNCTION
////////////////////////////////////////////////////////
function render() {
    generateError();

    $('body').html(loadStartPage(store.bookmarks, 1));
    if (store.adding) {
        $('body').html(addingBookMark())
    } else if (store.filter) {
        $('body').html(loadStartPage(store.bookmarks, store.bookmarkRating))
    }
}


// function render() {
//     console.log('render is working')
//     $('body').html(loadStartPage());

//     if (store.error) {
//         const erElement = generateError(store.error);
//         $('.error-ctr').html(erElement);  
//     }

//     if (store.adding === true) {
//         $('body').html(addingBookMark());
//     }
//     return;
// };



export default render;