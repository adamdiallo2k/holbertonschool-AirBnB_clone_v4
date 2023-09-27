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
     // Make a GET request to the given URL
     $.get('http://0.0.0.0:5001/api/v1/status/', function(data, status) {
        let apiStatusDiv = $('#api_status'); // Get the div#api_status element
        if (status === 'success' && data.status === 'OK') {
            // If the status is “OK”, add the class available to the div#api_status
            apiStatusDiv.addClass('available');
        } else {
            // Otherwise, remove the class available to the div#api_status
            apiStatusDiv.removeClass('available');
        }
    });
});
