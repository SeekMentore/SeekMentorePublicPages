// Placing Dev Server Path
var serverPath = 'http://13.127.139.107:8080';
var ctxPath = '/seekmentore';
var screenType = '';
var output;
var successMessage ='';

// Function to identify screen type based on CSS file loading
function identifyScreenType() {
	var styleSheets = document.styleSheets;
	for (var i = 0; i < styleSheets.length; i++) {
		var styleSheet = styleSheets[i];
		var href = styleSheet.href;
		if (null != href && href.indexOf('style-narrower.css') != -1) {
			screenType = 'small-screen';
			return;
		}
	}
	screenType = 'big-screen';
}

identifyScreenType();

commonErrorHandler = function(error) {
	showNotificationModal('Connection lost.<br/>Please check your network connection and refresh the page.', false);
}
commmonSuccessHandler = function(response) {
	var failure = response.FAILURE;
	if (failure) {
		showNotificationModal(response.FAILURE_MESSAGE, false);
		return;
	}
	showNotificationModal(successMessage, true);
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
	if (null != $('#loader-popup-modal')) {
		$('#loader-popup-modal').removeClass('noscreen');
	}
	$.ajax({
        url			: serverPath + ctxPath + url,
        type		: ((null != method) ? method : 'POST'),
        data		: data,
        contentType	: ((null != contentType) ? contentType : 'application/json'),
        cache		: false,
        dataType	: 'json',
        success		: function(data) {
        				if (null != $('#loader-popup-modal')) {
        					$('#loader-popup-modal').addClass('noscreen');
        				}
        				output = data;
        				var response = decodeObjectFromJSON(data.response)
			        	if (null != success) {
			        		success(response);
			        	} else {
			        		commmonSuccessHandler(response);
			        	}
		},
		error		: function(error) {
						if (null != $('#loader-popup-modal')) {
							$('#loader-popup-modal').addClass('noscreen');
						}
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
			emailId 			: getAttributeValue('email', true),
			queryDetails 		: getAttributeValue('query-details', false),
			captchaResponse		: captchaResponseToken
		};
	return application;
}

function getApplicationToFindTutor() {
	var application = {
			name 				: getAttributeValue('name', false),
			contactNumber 		: getAttributeValue('contact-number', false),
			emailId 			: getAttributeValue('email', false),
			studentGrade 		: getAttributeValue('student-grade', true),
			subjects 			: getAttributeValue('subjects', true, true),
			preferredTimeToCall : getAttributeValue('preferred-time', true, true),
			additionalDetails 	: getAttributeValue('additional-details', false),
			captchaResponse		: captchaResponseToken
		};
	return application;
}

function getApplicationToBecomeTutor() {
	var form = {
			firstName 					: getAttributeValue('first-name', false),
			lastName 					: getAttributeValue('last-name', false),
			dateOfBirth 				: getDateValue(getAttributeValue('date-of-birth', true)),
			contactNumber				: getAttributeValue('contact-number', false),
			emailId 					: getAttributeValue('email', false),
			gender 						: getAttributeValue('gender', true),
			qualification 				: getAttributeValue('qualification', true),
			primaryProfession 			: getAttributeValue('primary-profession', true),
			transportMode 				: getAttributeValue('transport-mode', true),
			teachingExp 				: getAttributeValue('teaching-experience', false),
			subjects					: getAttributeValue('subjects', true, true),
			locations 					: getAttributeValue('locations', true, true),
			preferredTimeToCall 		: getAttributeValue('preferred-time', true, true),
			additionalDetails 			: getAttributeValue('additional-details', false),
			captchaResponse				: captchaResponseToken
		};
	return form;
}

function getDateValue(value) {
	if (null != value && value.trim() != '') {
		return new Date(value);
	}
	return null;
}

function getAttributeValue(id, checkScreens, isArray) {
	var element;
	if (!checkScreens) {
		element = $('#'+id);
	} else {
		element = $('#'+id+'-'+screenType);
	}
	var value;
	if (null != element) {
		if (isArray) {
			if (element.val().length > 0) {
				value = '';
			}
			for (var i = 0; i < element.val().length; i++) {
				value += element.val()[i];
				if (i != element.val().length - 1) {
					value += ';';
				}
			}
		} else {
			value = element.val().trim();
		}
		if (null != value && value.trim() != '') {
			return value;
		}
		return null;
	} 
	return null;
}

function submitFormBecomeTutor() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for registering with us.<br/>Someone from Tutor Support team will contact you shortly.';
	callWebservice('/rest/publicaccess/becomeTutor', encodeObjectAsJSON(getApplicationToBecomeTutor()));
}

function submitFormFindTutor() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for your enquiry.<br/>Someone from Customer Support team will contact you shortly.';
	callWebservice('/rest/publicaccess/findTutor', encodeObjectAsJSON(getApplicationToFindTutor()));
}

function submitFormSubscribe() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	//callWebservice('/rest/publicaccess/becomeTutor', encodeObjectAsJSON(getApplicationToBecomeTutor()));
}

function submitQuery() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for your query.<br/>Someone from Systems Support team will contact you shortly.';
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
		$('#alert-title').html('Success');
		
		$('#alert-title').addClass('successMessage');
		$('#alert-title').removeClass('failureMessage');
		
		$('#notification-popup-model-content-section').addClass('successMessage');
		$('#notification-popup-model-content-section').removeClass('failureMessage');
	} else {
		$('#alert-title').html('Error');
		
		$('#alert-title').addClass('failureMessage');
		$('#alert-title').removeClass('successMessage');
		
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