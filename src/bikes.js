import $ from 'jquery';

export function getResults(pageNumber, perPage, location, distance, stolenness, bikeInfo, updatePrevSearchShowColumns, showError) {
  $.get(`https://bikeindex.org:443/api/v3/search?page=${pageNumber}&per_page=${perPage}&location=${location}&distance=${distance}&stolenness=${stolenness}`).then(function(response){
    console.log(response);
    updatePrevSearchShowColumns(response.bikes.length);

    for(let i=0; i < response.bikes.length; i++)
    {
      bikeInfo(response.bikes[i]);
    }
  }).fail(function(error) {
    showError(`There was an error with your request: ${error.responseText}. Please try again.`);
  });
}
