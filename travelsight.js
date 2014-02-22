
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

$('.hoverOnOffSrc').hover(
	function() {
		var onsrc = $( this ).attr('onsrc');
		$( this ).attr('src', onsrc);
	},
	function() {
		var offsrc = $( this ).attr('offsrc');
		$( this ).attr('src', offsrc);	
	}
);

function findSchools() {

	// TODO use ESRI in future?

	var queryValue = 'schools near ' + currentNeighborhood + ', San Francisco, CA, USA';

	window.location = 'http://maps.google.com/?q=' + encodeURIComponent(queryValue);

}

function findHotels() {

	// TODO flights too?
	
	// TODO expedia also has points of interest

	window.location = 'http://www.travelnow.com/templates/454616/hotels/list?targetId=AREA-83820DD3-51C3-4B10-B044-A4D92B40AC1C%7Ccities';
	
}

function reserveTour() {
	alert('TODO with bitpay');
}

function furnish() {
	alert('TODO with macys');
}

function findApartments() {
	alert('TODO');
}

function like() {
	$('#mySwipe').hide();
	$('#likeOptions').show();
}

function closeLikeOptions() {
	$('#mySwipe').show();
	$('#likeOptions').hide();
}
