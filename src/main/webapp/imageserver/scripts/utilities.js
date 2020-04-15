function showNotificationModal(header, message, isSuccess) {
	$('#notification-popup-modal').removeClass('noscreen');
	$('#notification-popup-model-content-section').html(message);
	if (isSuccess) {
		$('#alert-title').html(header);
		
		$('#alert-title').addClass('successMessage');
		$('#alert-title').removeClass('failureMessage');
		
		$('#notification-popup-model-content-section').addClass('successMessage');
		$('#notification-popup-model-content-section').removeClass('failureMessage');
	} else {
		$('#alert-title').html(header);
		
		$('#alert-title').addClass('failureMessage');
		$('#alert-title').removeClass('successMessage');
		
		$('#notification-popup-model-content-section').addClass('failureMessage');
		$('#notification-popup-model-content-section').removeClass('successMessage');
	}
}

//Configure notification popup modal and register events
function closeNotificationPopUpModal() {
	$('#notification-popup-modal').addClass('noscreen');
}

window.onclick = function(event) {
	var modal = document.getElementById('notification-popup-modal');
	if (event.target == modal) {
		$('#notification-popup-modal').addClass('noscreen');
	}
}