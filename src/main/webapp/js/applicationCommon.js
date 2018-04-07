var serverPath = 'http://localhost:8080'
var ctxPath = '/seekmentore';
var output;

commonErrorHandler = function(error) {
	output = error;
}
commmonSuccessHandler = function(response) {
	output = response;
}

function encodeObjectAsJSON(object) {
	return null != object ? JSON.stringify(object) : null;
}

function decodeObjectFromJSON(json) {
	return null != json ? JSON.parse(json) : null;
}

// Configure Captcha settings and functions
var captchaAuthFulfilled = false;
var captchaResponseToken = null; 
  
var captchaResponseCallback = function(recaptchaResponseToken) {
    captchaResponseToken = recaptchaResponseToken;
    captchaAuthFulfilled = true;
}
  
var captchaExpiredCallback = function() {
    grecaptcha.reset();
    captchaResponseToken = null;
    captchaAuthFulfilled = false;
}
  
var captchaErrorCallback = function() {
    grecaptcha.reset();
    captchaResponseToken = null;
    captchaAuthFulfilled = false;
}


// Configure notification popup modal and register events
function closeNotificationPopUpModal() {
	$('#notification-popup-modal').addClass('noscreen');
}

window.onclick = function(event) {
	var modal = document.getElementById('notification-popup-modal');
	if (event.target == modal) {
		$('#notification-popup-modal').addClass('noscreen');
	}
}

function callWebservice(url, data, success, failure, method, contentType) {
	$.ajax({
        url			: serverPath + ctxPath + url,
        type		: ((null != method) ? method : 'POST'),
        data		: data,
        contentType	: ((null != contentType) ? contentType : 'application/json'),
        cache		: false,
        dataType	: 'json',
        success		: function(response) {
			        	if (null != success) {
			        		success(response);
			        	} else {
			        		commmonSuccessHandler(response);
			        	}
		},
		error		: function(error) {
			        	if (null != failure) {
			        		failure(response);
			        	} else {
			        		commonErrorHandler(response);
			        	}
		}
    });
}

function getApplicationToSubmitQuery() {
	var application = {
			emailId 			: $('#submitQueryEmail').val(),
			queryDetails 		: 'This is just a simple query.',
			captchaResponse		: 'Dummy Captcha'
		};
	return application;
}

function getApplicationToFindTutor() {
	var application = {
			name 				: 'Dummy Parent',
			contactNumber 		: $('#findTutorContact').val(),
			emailId 			: $('#findTutorEmail').val(),
			studentGrade 		: 'MS-7',
			subjects 			: '12-P;11-C;10-B',
			preferredTimeToCall : 'T2;T4',
			additionalDetails 	: 'Nothing much to provide.',
			captchaResponse		: 'Dummy Captcha'
		};
	return application;
}

function getApplicationToBecomeTutor() {
	var form = {
			firstName 					: 'Shantanu',
			lastName 					: 'Mukherjee',
			dateOfBirth 				: new Date(),
			contactNumber				: $('#becomeTutorContact').val(),
			emailId 					: $('#becomeTutorEmail').val(),
			gender 						: 'M',
			qualification 				: 'B-Tech',
			primaryProfession 			: 'Software Expert1',
			transportMode 				: '4-W',
			teachingExp 				: '3',
			subjects					: '12-P;11-C;10-B',
			locations 					: 'Z1-L2;Z1-L9;Z3-L34',
			preferredTimeToCall 		: 'T2;T4',
			additionalDetails 			: 'I am awesome!!!',
			captchaResponse				: 'Dummy Captcha'
		};
	return form;
}

function submitFormBecomeTutor() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	callWebservice('/rest/publicaccess/becomeTutor', encodeObjectAsJSON(getApplicationToBecomeTutor()));
}

function submitFormFindTutor() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	callWebservice('/rest/publicaccess/findTutor', encodeObjectAsJSON(getApplicationToFindTutor()));
}

function submitFormSubscribe() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	//callWebservice('/rest/publicaccess/becomeTutor', encodeObjectAsJSON(getApplicationToBecomeTutor()));
}

function submitFormQuery() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	callWebservice('/rest/publicaccess/submitQuery', encodeObjectAsJSON(getApplicationToSubmitQuery()));
}

function showNotificationModal(message, isSuccess) {
	$('#notification-popup-modal').removeClass('noscreen');
	$('#notification-popup-model-content-section').html(message);
	if (isSuccess) {
		$('#notification-popup-model-content-section').addClass('successMessage');
		$('#notification-popup-model-content-section').removeClass('failureMessage');
	} else {
		$('#notification-popup-model-content-section').addClass('failureMessage');
		$('#notification-popup-model-content-section').removeClass('successMessage');
	}
}
