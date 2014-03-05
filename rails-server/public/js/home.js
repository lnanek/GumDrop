  var purchaseHoldFingerPosition = 0;
  var loadMoreHoldFingerPosition = 0;
  var mySwiper = new Swiper('.swiper-container',{
    slidesPerView:'1',
    watchActiveIndex: true,
    onSlideChangeStart: function(){
    	//alert('slide changed: ' + mySwiper.activeIndex );

			// If this is the last slide, don't remove it. Let pull to load more trigger.
			if ( 0 == mySwiper.activeIndex ) {
				return;
			}

			// Otherwise remove any previous slides.
			for(var i = 0; i < mySwiper.activeIndex; i++) {
	    	mySwiper.removeSlide(i);			
			}
    	
    	// Adjust index so we stay on the new slide we just swiped to.
    	mySwiper.swipeTo(0, 0, false);
    },
    onTouchStart: function() {
      purchaseHoldFingerPosition = 0;
      loadMoreHoldFingerPosition = 0;
    },
    onResistanceBefore: function(s, pos){
      purchaseHoldFingerPosition = pos;
    },
    onResistanceAfter: function(s, pos){
      loadMoreHoldFingerPosition = pos;
    },
    onTouchEnd: function(){
    
    	// If user swiped right past cards and held.
      if (purchaseHoldFingerPosition>100) {
        // Hold Swiper in required position
        mySwiper.setWrapperTranslate(0,100,0)

        //Dissalow futher interactions
        mySwiper.params.onlyExternal=true

        //Show loader
        $('.preloader').addClass('visible');

				// Navigate to buy link.
				var activeSlide = mySwiper.activeSlide();
				var activeSlideBuyHref = $(activeSlide).find('a').attr('href');
        window.location.href = activeSlideBuyHref;
        return;
      }

			// If user swiped left past cards and held.      
      if (loadMoreHoldFingerPosition>100) {
      	//TODO: load more if we have separate pages
      	alert(' Nothing more for sale. Try back later! ');
      }
      
    }
  });
