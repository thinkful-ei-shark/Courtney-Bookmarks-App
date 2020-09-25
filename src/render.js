import $ from 'jquery';

import store from './store'


////// FUNCTIONS TO RENDER THE DIFFERENT STATES OF THE PAGE & THE MAIN/RENDER FUNCTIONS ////////

// Starting Page 
function loadStartPage() {
    let startPage = `
    <div class="new-button>
    <form  class = "button">
        <button type="submit" id="add-new-button">Add Bookmark</button>
      

        <label id="filter-dropdown"> Filter By Rating:</label>
        <select name="filterby" id="filter">
          <option value="1star">1 star</option>
          <option value="2star">2 star</option>
          <option value="3star">3 star</option>
          <option value="4star">4 star</option>
          <option value="5star">5 star</option>
        </select>
        </form>
        </div>`
    return startPage ;
}

// Bookmark List - 1. a text box for adding new bookmark name - 2. URL text box - 3. description text box 4. submit button
function addingBookMark() {
    let bookMarkList = `
    <form id="new-bookmark>
    < div class = 'bookmark'>
        <label id = "bookmark-name"> Bookmark Name:</label>
        <input type="text" name= "title" placeholder="Bookmark goes here"
        id="bookmark-title" required>
    </div> 

    <div class='new-bookmark'>
        <label id="url">URL:</label>
        <input type="text" name="url" placeholder="https://google.com" id="url">
    </div>

    <div class='new-bookmark'>
         <label id="descripton">Description:</label>
        <input type="text" name="Description" placeholder="Google" id="description">
     </div>

    <div class ="save"> 
        <button type='submit' id='save'>Add</button>
    </div> 
    </form>`
    return bookMarkList;
}

// Editing Bookmark (text box & button)
// function editingBookmarkList(bookmark,rating) {
//     let editBookmark = `
//     `<div class="bookmark-expand" id=
// }

// render function
function render() {
    console.log('is render workin?')
    if (!store.adding) {
        $('body').html(loadStartPage());
    } else {
        $('body').html(addingBookMark());
    }
};

export default render;
