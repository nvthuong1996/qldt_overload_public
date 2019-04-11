/* Note: jquery script is assumed to be loaded prior to this script */


// Global config
var config = {
	bingWebSearchUrl			:	'http://www.bing.com/search',
	bingSearchPlaceholderText	:	'Search Microsoft.com'
};




// Set onready events
$(document).ready(function() {

	$('#webSearchButton').click(function() {
		var form = $(this).parents('form:first');
		form.attr('action', config.bingWebSearchUrl);
		form.submit();
	});


	// If the user clicks the 'back' button in their browser after searching
	// the search field is still populated with their search term,
	// but the javascript runs again, so we need to make sure the field is
	// styled correctly.
	if ($('#searchField').attr('value') != config.bingSearchPlaceholderText) {
		$('#searchField').attr('class', 'active');
	}

	// Blank out text value on select and change class
	$('#searchField').focus(function() {
		if ($(this).attr('value') == config.bingSearchPlaceholderText) {
			$(this).attr('value', '')
						.addClass('active')
						.removeClass('inactive');
		}
	});

	// Replace placeholder text in search field at top of page
	// if they didn't type anything
	$('#searchField').blur(function() {
		if ($(this).attr('value') == '') {
			$(this).addClass('inactive')
						.removeClass('active')
						.attr('value', config.bingSearchPlaceholderText);
		}
	});


	// Set column heights programatically
	$('.twoColWrapper_40_60, .twoColWrapper_50_50, .twoColWrapper_70_30, .twoColWrapper_30_70, .twoColWrapper_80_20, .threeColWrapper, .fourColWrapper').each(function() {
		// Subtract margins/padding from height
		var wrapperHeight = $(this).height();
		var height = 0;

		$(this).children('.col01, .col02, .col03, .col04, .vr').each(function() {
			// Only get height of first column and apply to all columns
			if (height == 0) {
				height = wrapperHeight;
				height -= $(this).css('marginTop').replace("px", "");
				height -= $(this).css('marginBottom').replace("px", "");
				height -= $(this).css('paddingTop').replace("px", "");
				height -= $(this).css('paddingBottom').replace("px", "");
			}
			$(this).css('height', height + 'px');
		});
	});



	$('ul.AspNet-Menu > li > ul').each(function() {

		// If user hovers over subnav, parent button should still be active
		$(this).hover(
			function() {
				$(this).parent().addClass('childHover');
			},
			function() {
				$(this).parent().removeClass('childHover');
			});
	});



}); // end of onready




// Convert negative or positive param to positive
function abs(n) {
	return n < 0 ? n / -1 : n;
}



// Builds the offer details popups
function popup(width, height, url) {
	// For centering popup window, but gives unpredictable results on dual monitor
	/* 
	var winX = width != null ? (window.screen.width / 2) - (width / 2) : null;
	var winY = height != null ? (window.screen.height / 2) - (height / 2) : null;

	newwindow = window.open(url, 'popupWindow', "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + winX + ",top=" + winY + ",screenX=" + winX + ",screenY=" + winY + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
	*/

	newwindow = window.open(url, 'popupWindow', "status=no,height=" + height + ",width=" + width + ",resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");

	if (window.focus) newwindow.focus();
	return false;
}




/*
* We're passing GUIDs in a vanity URL as query params so instead of
* using a standard anchor link/hash in the url, parse the GUID
* from the URL and scroll to it to emulate an anchor link
*/
function scrollToAnchorLink() {
	var guid = '';

	// Is there a guid in the query string?
	if ($.query.get('guid') != '') {
		guid = $.query.get('guid');
	}
	else {
		// IIS rewrites the GUID in the URL as "?guid=", but
		// Javascript doesn't see that on the client side so
		// we need to parse the GUID from the vanity URL
		var urlPieces = location.href.split("/");
		
		if (urlPieces[urlPieces.length - 1].length > 0) {
			guid = urlPieces[urlPieces.length - 1];
		}
	}

	// Find position of anchor link object that matches GUID
	// and scroll to its top			
	if (guid.length) {
		var target = $('#' + guid);
		var targetOffset = target.offset().top;

		$('html,body').animate({ scrollTop: targetOffset }, 1000);
	}
}


// Set column heights programatically
function setColumnHeights() {
	$('.twoColWrapper_40_60, .twoColWrapper_50_50, .twoColWrapper_70_30, .twoColWrapper_30_70, .twoColWrapper_80_20, .threeColWrapper, .fourColWrapper').each(function() {
		// Clear any explicit heights set
		$(this).find('.col01, .col02, .col03, .col04, .vr').css('height', '');

		// Subtract margins/padding from height
		var wrapperHeight = $(this).height();
		var height = 0;

		$(this).children('.col01, .col02, .col03, .col04, .vr').each(function() {
			// Only get height of first column and apply to all columns
			if (height == 0) {
				height = wrapperHeight;
				height -= $(this).css('marginTop').replace("px", "");
				height -= $(this).css('marginBottom').replace("px", "");
				height -= $(this).css('paddingTop').replace("px", "");
				height -= $(this).css('paddingBottom').replace("px", "");
			}
			$(this).css('height', height + 'px');
		});
	});

}



// Builds the offer details popups
function offerPopup(offerId, params) {

	// Make sure all req'd params are passed
	if (!params.url || !params.width || !params.height || offerId == '') return false;

	var winX = (window.screen.width / 2) - (params.width / 2);
	var winY = (window.screen.height / 2) - (params.height / 2);

	// Build URL
	var url = params.url;

	// separate lang-country value (as they are not necessarily real locales if language is not supported)
	url += '?lang=' + $('.currencyDropdown option:selected').val().substring(0, 2);
	url += '&locale=' + $('.currencyDropdown option:selected').val();
	url += '&offer=' + offerId;

	var windowName = 'offer_' + offerId.toString().replace(/-/g, '');

	var newwindow = window.open(url, windowName, "status=no,height=" + params.height + ",width=" + params.width + ",resizable=yes,left=" + winX + ",top=" + winY + ",screenX=" + winX + ",screenY=" + winY + ",toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");

	if (window.focus) newwindow.focus();
	return false;
}


// Popup window for video player on product overview pages
function videoPlayerPopup(w, h, vidName) {

	var winX = (window.screen.width / 2) - (w / 2);
	var winY = (window.screen.height / 2) - (h / 2);

	// Build query string
	var url = "/windowsazure/videoPlayerPopup.aspx";
	url += '?w=' + w;
	url += '&h=' + h;
	url += '&vid=' + vidName;

	var windowName = "videoPopupWindow";

	var newwindow = window.open(url, windowName, "status=no,height=" + (h + 20) + ",width=" + (w + 20) + ",resizable=yes,toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");

	if (window.focus) newwindow.focus();
	return false;
}