import $ from 'jquery';
import render from './render'
import bookmark from './bookmark'
import store from './store' 
import './style.css'
import api from './api';


//// PAGE TO HOUSE MAIN FUNCTION ////////


// main function - pass in all event listeners + render

function main() {
  console.log('main is working')
  bookmark.whenAddButtonIsClicked();
  bookmark.addNewBookmark();
  api.getItems().then(items => {
    store.addItems(items)
    render();
  })
  //bookmark.collapsedView();
}


$(main)

