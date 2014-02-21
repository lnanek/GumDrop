
var currentNeighborhood;

// Setup Swipe library to swipe through options.
var elem = document.getElementById('mySwipe');
window.mySwipe = Swipe(elem, {
  callback: function(index, element) {
		currentNeighborhood = $(element).find('b').text();
		alert('currentNeighborhood = ' + currentNeighborhood);
  }
  // startSlide: 4,
  // auto: 3000,
  // continuous: true,
  // disableScroll: true,
  // stopPropagation: true,
  // transitionEnd: function(index, element) {}
});

// alternate way with jQuery
// window.mySwipe = $('#mySwipe').Swipe().data('Swipe');

function findSchools() {

	var queryValue = 'schools near ' + currentNeighborhood;

	window.location = 'http://maps.google.com/?q=' + encodeURIComponent(queryValue);

}