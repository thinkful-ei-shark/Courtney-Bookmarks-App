import $ from 'jquery';
import render from './render'
import bookmark from './bookmark'
import store from './store' 
import './style.css'


//// PAGE TO HOUSE MAIN FUNCTION ////////


// main function - pass in all event listeners + render

function main() {
  console.log('is main working?')
  bookmark.whenAddButtonIsClicked();
  render();
  // watchForm()
}


$(main)

