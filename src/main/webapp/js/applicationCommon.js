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
        success		: function(data) {
        				var response = decodeObjectFromJSON(data.response)
			        	if (null != success) {
			        		success(response);
			        	} else {
			        		commmonSuccessHandler(response);
			        	}
		},
		error		: function(error) {
			output = error;
			        	if (null != failure) {
			        		failure(error);
			        	} else {
			        		commonErrorHandler(error);
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

function loadDropdowns(page) {
	if (page == 'TUTOR_REGISTRATION') {
		callWebservice('/rest/publicaccess/getDropdownListDataBecomeTutor', null, loadBecomeTutorDropdowns);
	} else if (page == 'TUTOR_ENQUIRY') {
		callWebservice('/rest/publicaccess/getDropdownListDataFindTutor', null, loadFindTutorDropdowns);
	} else if (page == 'CUSTOMER_SUBSCRIBE') {
		loadSubscribeDropdowns();
		//callWebservice('/rest/publicaccess/getDropdownListDataSubscribe', null, loadSubscribeDropdowns);
	} 
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

function loadBecomeTutorDropdowns(response) {
	var genderSelectHTML = createSelectOptionOutOfSelectLookupArray(response.genderLookUp);
	$('#gender-big-screen').html($('#gender-big-screen').html() + genderSelectHTML);
	$('#gender-small-screen').html($('#gender-small-screen').html() + genderSelectHTML);
	
	var qualificationSelectHTML = createSelectOptionOutOfSelectLookupArray(response.qualificationLookUp);
	$('#qualification-big-screen').html($('#qualification-big-screen').html() + qualificationSelectHTML);
	$('#qualification-small-screen').html($('#qualification-small-screen').html() + qualificationSelectHTML);
	
	var primaryProfessionSelectHTML = createSelectOptionOutOfSelectLookupArray(response.professionLookUp);
	$('#primary-profession-big-screen').html($('#primary-profession-big-screen').html() + primaryProfessionSelectHTML);
	$('#primary-profession-small-screen').html($('#primary-profession-small-screen').html() + primaryProfessionSelectHTML);
	
	var transportModeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.transportModeLookUp);
	$('#transport-mode-big-screen').html($('#transport-mode-big-screen').html() + transportModeSelectHTML);
	$('#transport-mode-small-screen').html($('#transport-mode-small-screen').html() + transportModeSelectHTML);
	
	var subjectsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.subjectsLookUp);
	$('#subjects-big-screen').html($('#subjects-big-screen').html() + subjectsSelectHTML);
	$('#subjects-small-screen').html($('#subjects-small-screen').html() + subjectsSelectHTML);
	
	var locationsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.locationsLookUp);
	$('#locations-big-screen').html($('#locations-big-screen').html() + locationsSelectHTML);
	$('#locations-small-screen').html($('#locations-small-screen').html() + locationsSelectHTML);
	
	var preferredTimeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.preferredTimeLookUp);
	$('#preferred-time-big-screen').html($('#preferred-time-big-screen').html() + preferredTimeSelectHTML);
	$('#preferred-time-small-screen').html($('#preferred-time-small-screen').html() + preferredTimeSelectHTML);
	
	instantiateChosen();
}

function loadSubscribeDropdowns(response) {
	instantiateChosen();
}

function loadFindTutorDropdowns(response) {
	var studentGradeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.studentGradeLookUp);
	$('#student-grade-big-screen').html($('#student-grade-big-screen').html() + studentGradeSelectHTML);
	$('#student-grade-small-screen').html($('#student-grade-small-screen').html() + studentGradeSelectHTML);
	
	var subjectsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.subjectsLookUp);
	$('#subjects-big-screen').html($('#subjects-big-screen').html() + subjectsSelectHTML);
	$('#subjects-small-screen').html($('#subjects-small-screen').html() + subjectsSelectHTML);
	
	var preferredTimeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.preferredTimeLookUp);
	$('#preferred-time-big-screen').html($('#preferred-time-big-screen').html() + preferredTimeSelectHTML);
	$('#preferred-time-small-screen').html($('#preferred-time-small-screen').html() + preferredTimeSelectHTML);
	
	instantiateChosen();
}

function createSelectOptionOutOfSelectLookupArray(lookupArray) {
	var html = '';
	var previousCategory = null;
	var categoryOpen = false;
	for(var i = 0; i < lookupArray.length; i++) {		
		var selectLookupItem = lookupArray[i];
		var currentCategory = selectLookupItem.category;
		if (previousCategory != currentCategory) {
			if (null != previousCategory) {
				categoryOpen = false;
				html += '</optgroup>';
			}
			if (null != currentCategory) {
				categoryOpen = true;
				html += '<optgroup label="' + currentCategory + '">';
			}
		}
		html += '<option value="' + selectLookupItem.value + '">' + selectLookupItem.label + '</option>';
		previousCategory = currentCategory;
	}
	if (categoryOpen) {
		html += '</optgroup>';
	}
	return html;
}