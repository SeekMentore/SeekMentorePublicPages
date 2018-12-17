var maxNumberOfColumns = 4;
var totalPicsArray = [-1, 6, 1, 1];
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
		var section = document.createElement('SECTION');
		var image = document.createElement('IMG');
		image.setAttribute('src', './images/nirmala-results/'+tileNumber+'/'+i+'.jpg');
		image.setAttribute('class','full-container-responsive-element gallery-images');
		image.setAttribute('width', '304');
		image.setAttribute('height', '228');
		//image.setAttribute('onClick', 'loadPics('+i+')');
		section.appendChild(image);
		columnDiv.appendChild(section);
		rowDiv.appendChild(columnDiv);
		columnCount += 1;
		if (createNewRow) {
			galleryPicsDiv.appendChild(rowDiv);
			createNewRow = false;
		}
	}
	$('#gallery-pics').removeClass('noscreen');
}

function loadTiles(totalTiles) {
	$('#gallery-pics').addClass('noscreen');
	var galleryTilesDiv = document.getElementById('gallery-tiles');
	var createNewRow = true;
	var columnCount = 1;
	var rowDiv = null;
	for(var i = 1 ; i <= totalTiles; i++) {
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
		var section = document.createElement('SECTION');
		var image = document.createElement('IMG');
		image.setAttribute('src', './images/nirmala-results/'+i+'/1.jpg');
		image.setAttribute('class','full-container-responsive-element gallery-images');
		image.setAttribute('width', '304');
		image.setAttribute('height', '228');
		image.setAttribute('onClick', 'loadPics('+i+')');
		section.appendChild(image);
		columnDiv.appendChild(section);
		rowDiv.appendChild(columnDiv);
		columnCount += 1;
		if (createNewRow) {
			galleryTilesDiv.appendChild(rowDiv);
			createNewRow = false;
		}
	}
}