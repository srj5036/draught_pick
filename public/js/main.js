$(document).ready(function(){

	$('#search_button').click(function(e){
		var text_field = $('#beer_search');
		var beer_search = text_field.val();

		e.preventDefault();

		if (beer_search != "") {

			// GET request to search for beer
			$.get("/search?q=" + beer_search, function(data){
				displaySearchResults(data);
			});

			// Clear the text field
			text_field.val("");
		}
	});
});

var displaySearchResults = function(beer_search_results) {
	var search_results = $('#search_results_container');
	var list_element;

	// Clear out previous search results
	search_results.html("");

	beer_search_results = JSON.parse(beer_search_results);

	console.log(beer_search_results.data);

	// Add all results to the DOM
	$.each(beer_search_results.data, function(index, beer) {
		list_element = '<div class="col-md-2" id="search_result_item" style="text-align: center;"><h5>' + beer.name + '</h5>'


		if (beer.hasOwnProperty('labels')) {
			var labels_obj = beer.labels;

			if (labels_obj.hasOwnProperty('icon')) {
				list_element = list_element + '<img src=' + beer.labels.icon + '>';
			}
		}

		list_element = list_element + '</div>';
		search_results.append(list_element);
	});
}