import $ from 'jquery';

// // //PAGE TO HOUSE GLOBAL STORE /////////////////////

//create bookmarkList as empty array
const bookmarks = [];
let error = null;
let filter = false;
let adding = false;
let filteredBookmarks = [];

// function to find by id
const findById = function (id) {
    return bookmarks.find(bookmark => bookmark.id === id);
};
 
//add item 
const addItem = function (item) {
    item.expanded = false;
    bookmarks.push(item);
};

const addItems = function (items) {
    bookmarks.push(...items);
};
  
//delete item
const findAndDelete = function (id) {
    bookmarks = bookmark.filter(currentBookmark => currentBookmark.id !== id);
  };


  //update item
  const findAndUpdate = function (id, newItem) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newItem);
  };


  // filter 
  const filterBookmarks = function (rating){
    filter = true;
    bookmarks.forEach(bookmark => {
        if(bookmark.rating >= rating) {
            bookmarks.push(bookmark);
        } 
    })
  };

//expand/collapse
// const expandCollapse = function (id) {
//     let bookmark = bookmarks.find(bookmark => bookmark.id === id)
//     return bookmark.expanded = !bookmark.expanded;
//     }


// const toggleExpandBookmark = function (id) {
//     const item = this.bookmarks.find(currentItem => currentItem.id === id);
//     item.expanded = !item.expanded;
//   };

//  for ratings 
const ratingfilter = function (value) {
    ratingfilter = value;
} 

const setError = function (error) {
    error = error;
  };

export default {
    bookmarks,
    error,
    filter,
    adding,
    filteredBookmarks,
    findById,
    addItem,
    addItems,
    findAndDelete,
    findAndUpdate,
    filterBookmarks,
    //toggleExpandBookmark,
  // expandCollapse,
    ratingfilter,
    setError,

}
