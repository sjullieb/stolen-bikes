import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';
import { getResults } from './bikes.js';

$(document).ready(function() {

  let perPage = 0;
  let location = "";
  let distance = "";
  let pageNumber = 1;
  let stolenness = "proximity";
  let previousSearchLength = 0;
  let weeksToSearch = 1;

  $('#search-form').submit(function(event) {
    event.preventDefault();
    perPage = $("#perPage").val();
    location = $("#location").val();
    distance = $('#distance').val();
    weeksToSearch = $('#weeksToSearch').val();
    pageNumber = 1;
    stolenness = "proximity";
    if (location === ""){
      stolenness = "stolen";
    }

    showResults();
  });

  $('#next').click(function() {
    console.log("next:" + previousSearchLength);
    if(previousSearchLength == perPage){
      pageNumber++;
      showResults();
    }
  });

  $('#previous').click(function() {
    if(pageNumber > 1){
      pageNumber--;
      showResults();
    }
  });

  function showResults(){
    // $("#tableHeader").show();
    // $("#resultTable").empty();
    // $(".showErrors").empty();
    //console.log(new Date());
    let secondsToSearch = Math.floor((new Date())/1000 - weeksToSearch * 604800);
    console.log("seconds to search " + secondsToSearch);
    getResults(pageNumber, perPage, location, distance, stolenness, secondsToSearch, bikeInfo, updatePrevSearchLength, clearPrev, showError);
  }
  // function getResults(){
  //   $.get(`https://bikeindex.org:443/api/v3/search?page=${pageNumber}&per_page=${perPage}&location=${location}&distance=${distance}&stolenness=${stolenness}`).then(function(response){
  //     console.log(response);
  //     previousSearchLength = response.bikes.length;
  //     $("#resultTable").empty();
  //     for(let i=0; i < response.bikes.length; i++)
  //     {
  //       bikeInfo(response.bikes[i]);
  //     }
  //   }).fail(function(error) {
  //     $(".showErrors").text(`There was an error with your request: ${error.responseText}. Please try again.`);
  //   });
  // }

  let updatePrevSearchLength = function(prevLength){
    previousSearchLength = prevLength;
  }

  let clearPrev = function(){
    $("#tableHeader").show();
    $("#resultTable").empty();
    $(".showErrors").empty();
  }

  let bikeInfo = function(bike){
    console.log("info");
    let bikeString = "";
    bikeString += '<div class="row">';
    bikeString += `<div class="col-md-2"><p>${bike.title}</p></div>`;
    bikeString += `<div class="col-md-3"><p>${bike.serial}</p></div>`;
    bikeString += `<div class="col-md-2"><p>${bike.manufacturer_name}</p></div>`;
    bikeString += `<div class="col-md-1"><p>${bike.year}</p></div>`;
    let colorString = "";
    bike.frame_colors.forEach(function(color){
      colorString += `${color} `
    });
    let dateStolen = (new Date(bike.date_stolen * 1000)).toLocaleTimeString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric',  hour: '2-digit', minute: '2-digit', hour12: true});
    bikeString += `<div class="col-md-2"><p>${colorString}</p></div>`;
    bikeString += `<div class="col-md-2"><p>${dateStolen}</p></div>`;
    //console.log(bikeString);
    $("#resultTable").append(bikeString);
  }

  let showError = function(errorText){
    $(".showErrors").text(errorText);
  }

});
