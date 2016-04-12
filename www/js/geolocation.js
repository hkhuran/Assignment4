// Assigning values to window.navigator and window.navigator.geolocation.  
window.navigator = window.navigator || {};
window.navigator.geolocation = window.navigator.geolocation ||
        undefined;
		
// conditional operator to check the device's geolocation. 
if (navigator.geolocation === undefined) {
    document.getElementById('g-unsupported').classList.remove('hidden');
    ['button-get-position'].forEach(function (elementId) {
        document.getElementById(elementId).setAttribute('disabled', 'disabled');
    });
} else {
    var log = document.getElementById('log');
    var watchId = null;
    var positionOptions = {
        enableHighAccuracy: true,
        timeout: 10 * 1000, // 10 seconds
        maximumAge: 30 * 1000 // 30 seconds
    };
	// displaying the device latitude and longitude on right slider on index.html page
    function success(position) {
        document.getElementById('latitude').innerHTML = position.coords.latitude;
        document.getElementById('longitude').innerHTML = position.coords.longitude;
    }
	// Printing the error from API
    function error(positionError) {
        log.innerHTML = 'Error: ' + positionError.message + '<br />' + log.innerHTML;
    }
	// addong event listner on get device location button on index.html
    document.getElementById('button-get-position').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(success, error, positionOptions);
    });
}