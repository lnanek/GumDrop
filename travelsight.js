
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

// Change buttons images when mouse rolls over them.
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

	$.ajax({
			headers: { 
					Accept : "application/json",
					"X-Macys-Webservice-Client-Id" : "hackathon"
			},
			type:"GET",
			url: "http://api.macys.com/v3/catalog/category/29391/browseproducts",
			error: onMacysError,
			success: onMacysResults
	});
    
function onMacysError() {
		// TODO offer retry
    $('#macysResults').empty();    
    var seeMoreLink = 
    	$('<a>', { className: 'macysSeeMoreUrl' } )
          .text("Sorry, there was a problem loading Macy's data!");          
    $('#macysResults').append(seeMoreLink);
    
}    
    
function onMacysResults(data, status) {

		//var str = JSON.stringify(data, undefined, 2);
    //alert("data: " + data + ", status: " + status);
    //$('#results').text(str);
            
    $('#macysResults').empty();
            
    // Add button each product returned
    var productArray = data.category[0].product.product;    
    for( var i=0; i < productArray.length && i < 6 ; i++ ) {
        var product = productArray[i];
        
		    var productLink = $('<a>', { className: 'macysProductUrl', href: product.summary.producturl } );

        var productImage = $('<img>', { className: 'macysProductImage', src: product.image[0].imageurl } );
        productLink.append(productImage);
        
        var productText = $('<p>');
        productText.text(product.summary.name);        
        productLink.append(productText);
        
        productLink.append( $( '<div style="clear:both" ></div>' ) );
        	            
    		$('#macysResults').append(productLink);
    		//$('#macysResults').append( $('<br />') );
        
    		//alert(product.summary.name);
    }
    
    // Add link to more items in category
    var seeMoreUrl = data.category[0].summary.categorypageurl;
    var seeMoreLink = 
    	$('<a>', { className: 'macysSeeMoreUrl', href: seeMoreUrl } )
          .text('See More');          
    $('#macysResults').append(seeMoreLink);
}

function findSchools() {

	// TODO use ESRI in future?

	var queryValue = 'schools near ' + currentNeighborhood + ', San Francisco, CA, USA';

	window.location = 'http://maps.google.com/?q=' + encodeURIComponent(queryValue);

}

function findHotels() {

	// TODO flights from expedia
	
	// TODO points of interest and photos from expedia

	window.location = 'http://www.travelnow.com/templates/454616/hotels/list?targetId=AREA-83820DD3-51C3-4B10-B044-A4D92B40AC1C%7Ccities';
	
}

function reserveTour() {

	// TODO use server API to qualify for better prize?

	window.location = 'https://bitpay.com/cart/add?itemId=LGYdVphHQ4XJacR2kms4tQ';
}

function furnish() {
	$('.page').hide();
	$('#macysPage').show();
}

function findApartments() {
	window.location = 'http://sfbay.craigslist.org/apa/';
}

function showLikeOptions() {
	$('.page').hide();
	$('#likeOptions').show();
}

function closeLikeOptions() {
	$('.page').hide();
	$('#mySwipe').show();
}
