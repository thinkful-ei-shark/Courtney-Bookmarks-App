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
    return this.items.find(bookmarks => currentBookmark.id === id);
};
 
//add item 
const addItem = function (item) {
    this.bookmarks.push(item);
};

const addItems = function (items) {
    this.bookmarks.push(...items);
};
  
//delete item
const findAndDelete = function (id) {
    this.bookmarks = this.bookmark.filter(currentBookmark => currentBookmark.id !== id);
  };


  //update item
  const findAndUpdate = function (id, newItem) {
    const currentBookmark = this.findById(id);
    Object.assign(currentBookmark, newItem);
  };


  // filter 
  const filterBookmarks = function (rating){
    this.filter = true;
    this.bookmarks.forEach(bookmark => {
        if(bookmark.rating >= rating) {
            this.filterBookmarks.push(bookmark);
        } 
    })
};

//  for ratings 
const ratingfilter = function (value) {
    this.ratingfilter = value;
} 

const setError = function (error) {
    this.error = error;
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
    ratingfilter,
    setError,

}
