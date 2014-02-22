
var currentNeighborhood = 'Bernal Heights';

// Setup Swipe library to swipe through options.
var elem = document.getElementById('mySwipe');
window.mySwipe = Swipe(elem, {
  callback: function(index, element) {
		currentNeighborhood = $(element).find('b').text();
		//alert('currentNeighborhood = ' + currentNeighborhood);
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

function findHotels() {
	window.location = 'http://www.travelnow.com/templates/454616/hotels/list?targetId=AREA-83820DD3-51C3-4B10-B044-A4D92B40AC1C%7Ccities';
	
}