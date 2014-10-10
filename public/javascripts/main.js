;
(function() {

	$(document).ready(function() {

		$('.find-standards').on('click', function() {
			var q = $(".standards-query").val();
			console.log('Searching... ' + q);
			$( ".find-standards-results" ).empty();
			$.getJSON( "/api/rest/v0.1/statements/search?description=" + q, function( data ) {
				var items = [];
				$.each( data, function( key, val ) {
					items.push( "<li id='" + JSON.stringify(key) + "'>" + "<a href='" + val.uri + "'>[" + val.subject + "] " + val.description + "</a></li>" );
				});

				$( "<ul/>", {
					"class": "my-new-list",
					html: items.join( "" )
				}).appendTo( ".find-standards-results" );
			});
			
		});

		$(".standards-query").keyup(function (e) {
			if (e.which == 13) {
				$('.find-standards').trigger('click');
			}
		});
	});

})(jQuery)