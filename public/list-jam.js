

function printList(data) {
	data.jams.forEach(function(jam) {
		$(".jam-list").append('<li class="jam-list-item" id="' + jam._id +'" ><p data-name="jam-list-item">'+jam.title+'</p></li>')
	});
	
}

$(document).on('click', 'p', function(evt) {
	if($(evt.target).data('name') == 'jam-list-item') {
		window.location.assign("/jam/" + evt.target.parentNode.id);
	}
})


$(document).on('click', 'button', function(evt) {
	console.log('evt', $(evt.target).data('name'));
	if($(evt.target).data('name') == 'jam-search') {
		if(document.getElementById('jam-search-field').value == "") {
			$.get('/jam/getall', function(data) {
				$(".jam-results").show();
				$(".jam-list").empty();
				printList(data);
			});
		}
		else {
			$.get('/jam/search/jams/' + document.getElementById('jam-search-field').value, function(data) {
				$(".jam-results").show();
				if(data.jams.length > 0) {
					$(".jam-list").empty();
					printList(data);
				}
			});
		}
	}
	if($(evt.target).data('name') == 'spotify') {
		window.location.assign("/jam/search");
	}
});