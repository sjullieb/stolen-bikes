import $ from 'jquery';

export function getResults(pageNumber, perPage, location, distance, stolenness, secondsToSearch, bikeInfo, updatePrevSearchLength, clearPrev, showError) {
  $.get(`https://bikeindex.org:443/api/v3/search?page=${pageNumber}&per_page=${perPage}&location=${location}&distance=${distance}&stolenness=${stolenness}`).then(function(response){
    console.log(response);
    let amountBikes = 0;
    console.log(secondsToSearch);
    clearPrev();
    for(let i=0; i < response.bikes.length; i++)
    {
      console.log("seconds stolen " + response.bikes[i].date_stolen);
      console.log(parseInt(response.bikes[i].date_stolen) > secondsToSearch);
      if(parseInt(response.bikes[i].date_stolen) > secondsToSearch){
        console.log("in");
        bikeInfo(response.bikes[i]);
        amountBikes++;
      }
    }
    updatePrevSearchLength(amountBikes);
  }).fail(function(error) {
    showError(`There was an error with your request: ${error.responseText}. Please try again.`);
  });
}
