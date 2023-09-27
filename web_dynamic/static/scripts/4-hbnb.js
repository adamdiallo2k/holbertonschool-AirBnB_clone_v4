$(document).ready(function() {
    let selectedAmenities = {}; // Dictionary to store the selected amenities
    
    $('input[type="checkbox"]').change(function() {
        let amenityId = $(this).data('id'); // Get the data-id attribute value
        let amenityName = $(this).data('name'); // Get the data-name attribute value
        
        if ($(this).is(':checked')) {
            // If the checkbox is checked, add the amenity to the selectedAmenities dictionary
            selectedAmenities[amenityId] = amenityName;
        } else {
            // If the checkbox is unchecked, remove the amenity from the selectedAmenities dictionary
            delete selectedAmenities[amenityId];
        }
        
        // Update the h4 tag inside the div Amenities with the list of Amenities checked
        let amenitiesList = Object.values(selectedAmenities).join(', ');
        $('.amenities h4').text(amenitiesList);
    });
    
    // Make a GET request to check the API status
    $.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {
        let apiStatusDiv = $('#api_status');
        if (status === 'success' && data.status === 'OK') {
            apiStatusDiv.addClass('available');
        } else {
            apiStatusDiv.removeClass('available');
        }
    });
    
    // Function to make a POST request to get places
    function fetchPlaces(data) {
        $.post('http://0.0.0.0:5001/api/v1/places_search/', JSON.stringify(data), function(places) {
            $('section.places').empty(); // Clear the places section before appending new places
            $.each(places, function(index, place) {
                // Create and append the article for each place as before
                // ...
            });
        }, 'json').fail(function() {
            console.error('Failed to fetch places');
        });
    }
    
    // Initial fetch of places with empty data
    fetchPlaces({});
    
    // When the button is clicked, make a new POST request with the list of Amenities checked
    $('button').click(function() {
        let amenitiesIds = Object.keys(selectedAmenities);
        fetchPlaces({amenities: amenitiesIds});
    });
});
