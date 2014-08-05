

function printList(data) {
	data.jams.forEach(function(jam) {
		$(".jam-list").append('<li class="jam-list-item"><p>'+jam.title+'<a href="/jam/'+jam._id+'" class="btn btn-default">View Jam</a><a href="/jam/delete/'+jam._id+'" class="btn btn-danger">Delete</a></li>')
	});
	
}


$(document).on('click', 'button', function(evt) {
	
	if($(evt.target).data('name') == 'jam-search') {
		if(document.getElementById('jam-search-field').value == "") {
			$.get('/jam/getall', function(data) {
				$(".jam-list").empty();
				printList(data);
			});
		}
		else {
			$.get('/jam/search/jams/' + document.getElementById('jam-search-field').value, function(data) {
				$(".jam-list").empty();
				printList(data);
			});
		}
	}
});