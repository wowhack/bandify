$(document).on('click', 'button', function(evt) {
	if($(evt.target).data('name') == 'user-search') {
		$.get("/user/username/" + document.getElementById('username').value, function(data) {
			console.log('data', data);
			if(data.users.length == 0) {
				$("#search-results").empty();
				$("#search-results").append('<p>No Users found</p>');
			}
			else {
				data.users.forEach(function(user) {
					$("#search-results").append('<li><p>' + user.username + '</p><button id="' + user._id + '"class="btn btn-default" data-name="add-user">Add User</button></li>')
				});
			}
		});
	}
	if($(evt.target).data('name') == 'add-user') {
		$.ajax({
			url: '/band/' + $('#band-id').html() + '/addmember/' + this.id,
			type: 'PUT',
			success: function(result) {
				window.location.reload(true);
    	}
		});
	}
});