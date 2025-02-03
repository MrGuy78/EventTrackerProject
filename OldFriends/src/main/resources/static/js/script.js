console.log('script.js loaded');

window.addEventListener('load', function(e) {
	console.log('Document loaded.')
	init();
});

function init() {
	console.log('In init.');
	loadFriendList();
	document.getElementById('toggleForm').addEventListener('click', toggleForm);
	document.getElementById('addFriendDiv').style.display = 'none';
	
document.addFriendForm.submitFriendButton.addEventListener('click', function(e){
	e.preventDefault();
	
	let friendObject = {
		name: document.addFriendForm.name.value,
		type: document.addFriendForm.type.value,
		description: document.addFriendForm.description.value,
		arrivalYear: document.addFriendForm.arrivalYear.value,
		departYear: document.addFriendForm.departYear.value,
		imageUrl: document.addFriendForm.imageUrl.value
	};
	
	addFriend(friendObject);
});

}

function loadFriendList() {
	// XHR to hit my list API endpoint
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/oldFriends', true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let friends = JSON.parse(xhr.responseText);
				displayFriendList(friends);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	xhr.send();
}

function displayFriendList(friends) {
	// DOM to build table rows
	let tbody = document.getElementById('friendListTbody');
	tbody.textContent = '';

	for (let friend of friends) {

		let tr = document.createElement('tr');
		let td = document.createElement('td');

		//		let img = document.createElement('img');
		//		img.src = friend.imageUrl;
		//		img.alt = 'Image of ' + friend.name;

		td = document.createElement('td');
		td.textContent = friend.id;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.name;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.type;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.description;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.arrivalYear;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.departYear;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.imageUrl;
		tr.appendChild(td);

		tr.friendId = friend.id;

		tr.addEventListener('click', function(e) {
			console.log(e.target.parentElement);
			let friendId = e.target.parentElement.friendId;
			console.log(friendId);
			getFriend(friendId);
		});

		tbody.appendChild(tr);
	}
}

// GET
function getFriend(friendId) {
	let xhr = new XMLHttpRequest();

	xhr.open('GET', 'api/oldFriends/' + friendId, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let friends = JSON.parse(xhr.responseText);
				displayFriend(friends);
			} else {
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	xhr.send();
}

function displayFriend(friend) {
	let friendDiv = document.getElementById('friendDetailsDiv');
	friendDiv.textContent = '';

	let h3 = document.createElement('h3');
	h3.textContent = friend.name;
	friendDiv.appendChild(h3);

	h3 = document.createElement('h3');
	h3.textContent = friend.type;
	friendDiv.appendChild(h3);

	let h4 = document.createElement('h4');
	h4.textContent = friend.description;
	friendDiv.appendChild(h4);

	let h5 = document.createElement('h5');
	h5.textContent = friend.arrivalDate;
	friendDiv.appendChild(h5);

	h5 = document.createElement('h5');
	h5.textContent = friend.departDate;
	friendDiv.appendChild(h5);

	h5 = document.createElement('h5');
	h5.textContent = friend.imageUrl;
	friendDiv.appendChild(h5);

	let backButton = document.createElement('button');
	backButton.textContent = 'Back to List';
	backButton.classList.add('btn', 'btn-primary');
	backButton.addEventListener('click', function(e) {
		showList();
	})
	friendDiv.appendChild(backButton);
	
	let editButton = document.createElement('button');
	editButton.textContent = 'Update friend';
	editButton.classList.add('btn', 'btn-primary');
	editButton.addEventListener('click', function(e) {
		showUpdateForm(friend);
	});
	friendDiv.appendChild(editButton);

	showDetails();
}

function showList() {
	let friendDiv = document.getElementById('friendListDiv');
	let detailsDiv = document.getElementById('friendDetailsDiv');
	friendDiv.style.display = 'block';
	detailsDiv.style.display = 'none';
}

function showDetails() {
	let friendDiv = document.getElementById('friendListDiv');
	let detailsDiv = document.getElementById('friendDetailsDiv');
	friendDiv.style.display = 'none';
	detailsDiv.style.display = 'block';
}

function toggleForm() {
	let formDiv = document.getElementById('addFriendDiv');
	let currentDisplayStatus = formDiv.style.display;
	console.log(formDiv.style);
	if (currentDisplayStatus === 'block') {
		formDiv.style.display = 'none';
	} else if (currentDisplayStatus === 'none') {
		formDiv.style.display = 'block';
	}
}

// UPDATE
function showUpdateForm(friend) {
	console.log(updateFriend);
	let form = document.createElement('form');
	form.name = "updateFriendForm";
	
	let hiddenInput = document.createElement('input');
	hiddenInput.type = 'hidden';
	hiddenInput.value = friend.id;
	hiddenInput.name = "id";
	form.appendChild(hiddenInput);
	
	let nameInput = document.createElement('input');
	nameInput.type = 'text';
	nameInput.value = friend.name;
	nameInput.name = "name";
	form.appendChild(nameInput);
	
	let typeInput = document.createElement('input');
	typeInput.type = 'text';
	typeInput.value = friend.type;
	typeInput.name = 'type';
	form.appendChild(typeInput);
	
	let descriptionInput = document.createElement('input');
	descriptionInput.type = 'text';
	descriptionInput.value = friend.description;
	descriptionInput.name = 'description';
	form.appendChild(descriptionInput);
	
	let arrivalYearInput = document.createElement('input');
	arrivalYearInput.type = 'number';
	arrivalYearInput.value = friend.arrivalYear;
	arrivalYearInput.name = 'arrivalYear';
	form.appendChild(arrivalYearInput);
	
	let departYearInput = document.createElement('input');
	departYearInput.type = 'number';
	departYearInput.value = friend.departYear;
	departYearInput.name = 'departYear';
	form.appendChild(departYearInput);
	
	let imageUrlInput = document.createElement('input');
	imageUrlInput.type = 'text';
	imageUrlInput.value = friend.imageUrl;
	imageUrlInput.name = 'imageUrl';
	form.appendChild(imageUrlInput);
	
	let submitButton = document.createElement('button');
	submitButton.type = 'submit';
	submitButton.textContent = 'Update Friend';
	form.appendChild(submitButton);
	
	document.body.appendChild(form);
	
	form.addEventListener('submit', function(event) {
	    event.preventDefault();
	
		let friend = {
		    id: hiddenInput.value,
		    name: nameInput.value,
		    type: typeInput.value,
		    description: descriptionInput.value,
		    arrivalYear: arrivalYearInput.value,
		    departYear: departYearInput.value,
		    imageUrl: imageUrlInput.value
		}
		updateFriend(friend);
});
}

// DELETE
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('deleteFriendForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let friendId = document.getElementById('friendId').value.trim();
    if (friendId === '') {
        displayMessage('Friend ID is required.');
        return;
    }
	
    deleteFriend(friendId);
});
});

// ADD function
function addFriend(friendObject) {
	console.log(friendObject);
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/oldFriends');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 201) {
				let data = JSON.parse(xhr.responseText);
				displayFriend(data);
			} else {
				console.log('POST request failed');
				console.log(xhr.status + ': ' + xhr.responseText);
			}
		}
	};

	xhr.setRequestHeader('Content-type', 'application/json');
	let friendObjectJson = JSON.stringify(friendObject);
	xhr.send(friendObjectJson);
}

// UPDATE function
function updateFriend(friend) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/oldFriends/' + friend.id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
				let newData = JSON.parse(xhr.responseText);
				displayFriend(newData);
				// document.body.removeChild(document.updateFriendForm);
				// console.log(document.forms['friend']);
				document.body.removeChild(document.forms['updateFriendForm']);
			}
		} else {
			console.log('PUT request failed.');
			console.log(xhr.status + ': ' + xhr.responseText)
		}
	};
	xhr.setRequestHeader('Content-type', 'application/json');
	let friendObjectJson = JSON.stringify(friend);
	console.log(friendObjectJson);
	xhr.send(friendObjectJson);
}

// DELETE function
function deleteFriend(friendId) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/oldFriends/' + friendId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let thisFriend = document.getElementById(friendId);
				if (thisFriend) {
					thisFriend.remove();
				}
				let data = JSON.parse(xhr.responseText);
				displayFriend(data);
			} else {
				console.log('DELETE request failed.');
				console.log(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	
	xhr.send();
}




