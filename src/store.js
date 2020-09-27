import $ from 'jquery';

// // //PAGE TO HOUSE GLOBAL STORE /////////////////////

//create bookmarkList as empty array
let bookmarks = [];
let error = null;
let filter = false;
let adding = false;
let bookmarkRating = 0;


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


const findAndDelete = function (id) {
    const localBookmarkId = bookmarks.findIndex(bookmark => bookmark.id === id);
    return bookmarks.splice(localBookmarkId, 1);
}

  //update item
  const findAndUpdate = function (id, newItem){
    let currentBookmark = findById(id);
    Object.assign(currentBookmark, newItem);
  };


  // filter 
  const changeFilter = function (num){
    if (filter === parseInt(num)) {
        return;
    }
    return filter = num;
  };


 //for filtering the ratings dropdown
const filterBookmarksByStars = function (value) {
    bookmarkRating = value;
} 

const setError = function (error) {
    error = error;
  };

export default {
    bookmarks,
    error,
    filter,
    adding,
    findById,
    addItem,
    addItems,
    findAndDelete,
    findAndUpdate,
    changeFilter,
    filterBookmarksByStars,
    setError,

}
