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

	// TODO: event listeners for HTML form buttons, etc

console.log(document);
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
		td.textContent = friend.arrivalDate;
		tr.appendChild(td);

		td = document.createElement('td');
		td.textContent = friend.departDate;
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

function addFriend(friendObject) {
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

function updateFriend(friend) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/oldFriends/' + friend.Id);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 201) {
				let newData = JSON.parse(xhr.responseText);
				displayFriend(newData);
			}
		} else {
			console.log('PUT request failed.');
			console.log(xhr.status + ': ' + xhr.responseText)
		}
	};
	xhr.setRequestHeader('Content-type', 'application/json');
	let friendObjectJson = JSON.stringify(friend);
	xhr.send(friendObjectJson);
}








