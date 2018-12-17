var maxNumberOfColumns = 4;
var totalPicsArray = [2, 6, 1, 1, 7];
var classArray = ['Nursery', 'Ist', 'IInd', 'IIIrd', 'IVth'];

// Configure gallery-image popup modal and register events
function closeGalleryImagePopUpModal() {
	$('#gallery-image-popup-modal').addClass('noscreen');
}

window.onclick = function(event) {
	var modalN = document.getElementById('notification-popup-modal');
	if (event.target == modalN) {
		$('#notification-popup-modal').addClass('noscreen');
	}
	var modalG = document.getElementById('gallery-image-popup-modal');
	if (event.target == modalG) {
		$('#gallery-image-popup-modal').addClass('noscreen');
	}
}

function showGalleryImageModal(src) {
	$('#gallery-image-popup-modal').removeClass('noscreen');
	var image = document.getElementById('gallery-image-popup-modal-image-pic');
	image.setAttribute('src', src);
}

function loadPics(tileNumber) {
	$('#gallery-tiles').addClass('noscreen');
	$('#gallery-pics').html('');
	var galleryPicsDiv = document.getElementById('gallery-pics');
	var createNewRow = true;
	var columnCount = 1;
	var rowDiv = null;
	var totalPics = totalPicsArray[tileNumber];
	for(var i = 1 ; i <= totalPics; i++) {
		if (columnCount > maxNumberOfColumns) {
			columnCount = 1;
			createNewRow = true;
		}
		if (createNewRow) {
			rowDiv = document.createElement('DIV');
			rowDiv.setAttribute('class','row');
		}
		var columnDiv = document.createElement('DIV');
		columnDiv.setAttribute('class','3u');
		var image = document.createElement('IMG');
		var src = './images/nirmala-results/'+classArray[tileNumber]+'/'+i+'.jpg';
		image.setAttribute('src', src);
		image.setAttribute('class','full-container-responsive-element gallery-images');
		image.setAttribute('width', '304');
		image.setAttribute('height', '228');
		image.setAttribute('onClick', 'showGalleryImageModal(\''+src+'\')');
		columnDiv.appendChild(image);
		rowDiv.appendChild(columnDiv);
		columnCount += 1;
		if (createNewRow) {
			galleryPicsDiv.appendChild(rowDiv);
			createNewRow = false;
		}
	}
	$('#gallery-pics').removeClass('noscreen');
	$('#back-to-class-button').removeClass('visibilityHidden');
}

function showTiles() {
	$('#gallery-pics').addClass('noscreen');
	$('#back-to-class-button').addClass('visibilityHidden');
	$('#gallery-tiles').removeClass('noscreen');
}

function loadTiles() {
	$('#gallery-pics').addClass('noscreen');
	$('#back-to-class-button').addClass('visibilityHidden');
	var galleryTilesDiv = document.getElementById('gallery-tiles');
	var createNewRow = true;
	var columnCount = 1;
	var rowDiv = null;
	for(var i = 0 ; i < classArray.length; i++) {
		if (columnCount > maxNumberOfColumns) {
			columnCount = 1;
			createNewRow = true;
		}
		if (createNewRow) {
			rowDiv = document.createElement('DIV');
			rowDiv.setAttribute('class','row');
		}
		var columnDiv = document.createElement('DIV');
		columnDiv.setAttribute('class','3u text-image-container');
		var image = document.createElement('IMG');
		image.setAttribute('src', './images/nirmala-results/'+classArray[i]+'/1.jpg');
		image.setAttribute('class','full-container-responsive-element gallery-images');
		image.setAttribute('width', '304');
		image.setAttribute('height', '228');
		image.setAttribute('onClick', 'loadPics('+i+')');
		columnDiv.appendChild(image);
		var textDiv = document.createElement('DIV');
		textDiv.setAttribute('class','text-image-centered');
		textDiv.setAttribute('onClick', 'loadPics('+i+')');
		if (i == 0) {
			textDiv.innerHTML = classArray[i];
		} else {
			textDiv.innerHTML = 'Class ' + classArray[i];
		}
		columnDiv.appendChild(textDiv);
		rowDiv.appendChild(columnDiv);
		columnCount += 1;
		if (createNewRow) {
			galleryTilesDiv.appendChild(rowDiv);
			createNewRow = false;
		}
	}
	$('#gallery-tiles').removeClass('noscreen');
}