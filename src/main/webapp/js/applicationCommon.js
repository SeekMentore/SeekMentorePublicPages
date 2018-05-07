// Placing Dev Server Path
//var serverPath = 'http://13.127.139.107:8080';
var serverPath = 'http://localhost:8080';
var ctxPath = '/seekmentore';
var screenType = '';
var output;
var successMessage = '';
var testimonials = null;
var currentTestimonialDisplay = 0;

loadTestimonialContent();

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
	resetForm(resetButton);
	resetButton = null;
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

var resetCaptcha = false;
var resetButton = null;

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
	// Show Pop up loader 
	if (null != $('#loader-popup-modal')) {
		$('#loader-popup-modal').removeClass('noscreen');
	}
	if (resetCaptcha) {
		// Reset Captcha
		grecaptcha.reset();
		resetCaptcha = false;
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
	identifyScreenType();
	var application = {
			emailId 			: getAttributeValue('email', true),
			queryDetails 		: getAttributeValue('query-details', false),
			captchaResponse		: captchaResponseToken
		};
	return application;
}

function getApplicationToSubscribeWithUs() {
	identifyScreenType();
	var application = {
			firstName 			: getAttributeValue('first-name', false),
			lastName 			: getAttributeValue('last-name', false),
			contactNumber 		: getAttributeValue('contact-number', false),
			emailId 			: getAttributeValue('email', false),
			studentGrade 		: getAttributeValue('student-grade', true, true),
			subjects 			: getAttributeValue('subjects', true, true),
			preferredTimeToCall : getAttributeValue('preferred-time', true, true),
			additionalDetails 	: getAttributeValue('additional-details', false),
			addressDetails 	    : getAttributeValue('address-details', false),
			reference 	        : getAttributeValue('reference', true),
			location     	    : getAttributeValue('location', true),
			captchaResponse		: captchaResponseToken
		};
	return application;
}

function getApplicationToFindTutor() {
	identifyScreenType();
	var application = {
			name 				: getAttributeValue('name', false),
			contactNumber 		: getAttributeValue('contact-number', false),
			emailId 			: getAttributeValue('email', false),
			studentGrade 		: getAttributeValue('student-grade', true),
			subjects 			: getAttributeValue('subjects', true),
			preferredTimeToCall : getAttributeValue('preferred-time', true, true),
			additionalDetails 	: getAttributeValue('additional-details', false),
			addressDetails 	    : getAttributeValue('address-details', false),
			reference 	        : getAttributeValue('reference', true),
			location     	    : getAttributeValue('location', true),
			captchaResponse		: captchaResponseToken
		};
	return application;
}

function getApplicationToBecomeTutor() {
	identifyScreenType();
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
			studentGrade 				: getAttributeValue('student-grade', true, true),
			subjects					: getAttributeValue('subjects', true, true),
			locations 					: getAttributeValue('locations', true, true),
			preferredTimeToCall 		: getAttributeValue('preferred-time', true, true),
			additionalDetails 			: getAttributeValue('additional-details', false),
			preferredTeachingType       : getAttributeValue('preferred-teaching-type', true, true),
			reference                   : getAttributeValue('reference', true),
			captchaResponse				: captchaResponseToken,
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
	if (!document.getElementById('agree-with-terms').checked) {
		showNotificationModal('Please agree to Terms and Conditions.', false);
		return;
	}
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for registering with us.<br/>Someone from Tutor Support team will contact you shortly.';
	resetCaptcha = true;
	resetButton = 'become-tutor-form-reset';
	callWebservice('/rest/publicaccess/becomeTutor', encodeObjectAsJSON(getApplicationToBecomeTutor()));
}

function submitFormFindTutor() {
	if (!document.getElementById('agree-with-terms').checked) {
		showNotificationModal('Please agree to Terms and Conditions.', false);
		return;
	}
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for your enquiry.<br/>Someone from Customer Support team will contact you shortly.';
	resetCaptcha = true;
	resetButton = 'find-tutor-form-reset';
	callWebservice('/rest/publicaccess/findTutor', encodeObjectAsJSON(getApplicationToFindTutor()));
}

function submitFormSubscribe() {
	if (!document.getElementById('agree-with-terms').checked) {
		showNotificationModal('Please agree to Terms and Conditions.', false);
		return;
	}
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for your enquiry.<br/>Someone from Customer Support team will contact you shortly.';
	resetCaptcha = true;
	resetButton = 'subscribe-form-reset';
	callWebservice('/rest/publicaccess/subscribe', encodeObjectAsJSON(getApplicationToSubscribeWithUs()));
}

function submitQuery() {
	if (!captchaAuthFulfilled) {
		showNotificationModal('Please fill captcha.', false);
		return;
	}
	successMessage = 'Thanks for your query.<br/>Someone from Systems Support team will contact you shortly.';
	resetCaptcha = true;
	resetButton = 'submit-query-form-reset';
	callWebservice('/rest/publicaccess/submitQuery', encodeObjectAsJSON(getApplicationToSubmitQuery()));
}

function loadDropdowns(page) {
	if (page == 'TUTOR_REGISTRATION') {
		callWebservice('/rest/publicaccess/getDropdownListDataBecomeTutor', null, loadBecomeTutorDropdowns);
	} else if (page == 'TUTOR_ENQUIRY') {
		callWebservice('/rest/publicaccess/getDropdownListDataFindTutor', null, loadFindTutorDropdowns);
	} else if (page == 'CUSTOMER_SUBSCRIBE') {
		callWebservice('/rest/publicaccess/getDropdownListDataSubscribeWithUs', null, loadSubscribeDropdowns);
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
	
	var studentGradeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.studentGradeLookUp);
	$('#student-grade-big-screen').html($('#student-grade-big-screen').html() + studentGradeSelectHTML);
	$('#student-grade-small-screen').html($('#student-grade-small-screen').html() + studentGradeSelectHTML);
	
	var subjectsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.subjectsLookUp);
	$('#subjects-big-screen').html($('#subjects-big-screen').html() + subjectsSelectHTML);
	$('#subjects-small-screen').html($('#subjects-small-screen').html() + subjectsSelectHTML);
	
	var locationsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.locationsLookUp);
	$('#locations-big-screen').html($('#locations-big-screen').html() + locationsSelectHTML);
	$('#locations-small-screen').html($('#locations-small-screen').html() + locationsSelectHTML);
	
	var preferredTimeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.preferredTimeLookUp);
	$('#preferred-time-big-screen').html($('#preferred-time-big-screen').html() + preferredTimeSelectHTML);
	$('#preferred-time-small-screen').html($('#preferred-time-small-screen').html() + preferredTimeSelectHTML);
	
	var referenceSelectHTML = createSelectOptionOutOfSelectLookupArray(response.referenceLookUp);
	$('#reference-big-screen').html($('#reference-big-screen').html() + referenceSelectHTML);
	$('#reference-small-screen').html($('#reference-small-screen').html() + referenceSelectHTML);
	
	var preferredTeachingTypeHTML = createSelectOptionOutOfSelectLookupArray(response.preferredTeachingTypeLookUp);
	$('#preferred-teaching-type-big-screen').html($('#preferred-teaching-type-big-screen').html() + preferredTeachingTypeHTML);
	$('#preferred-teaching-type-small-screen').html($('#preferred-teaching-type-small-screen').html() + preferredTeachingTypeHTML);
	
	instantiateChosen();
}

function loadSubscribeDropdowns(response) {
	var studentGradeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.studentGradeLookUp);
	$('#student-grade-big-screen').html($('#student-grade-big-screen').html() + studentGradeSelectHTML);
	$('#student-grade-small-screen').html($('#student-grade-small-screen').html() + studentGradeSelectHTML);
	
	var subjectsSelectHTML = createSelectOptionOutOfSelectLookupArray(response.subjectsLookUp);
	$('#subjects-big-screen').html($('#subjects-big-screen').html() + subjectsSelectHTML);
	$('#subjects-small-screen').html($('#subjects-small-screen').html() + subjectsSelectHTML);
	
	var preferredTimeSelectHTML = createSelectOptionOutOfSelectLookupArray(response.preferredTimeLookUp);
	$('#preferred-time-big-screen').html($('#preferred-time-big-screen').html() + preferredTimeSelectHTML);
	$('#preferred-time-small-screen').html($('#preferred-time-small-screen').html() + preferredTimeSelectHTML);
	
	var locationSelectHTML = createSelectOptionOutOfSelectLookupArray(response.locationsLookUp);
	$('#location-big-screen').html($('#location-big-screen').html() + locationSelectHTML);
	$('#location-small-screen').html($('#location-small-screen').html() + locationSelectHTML);

	var referenceSelectHTML = createSelectOptionOutOfSelectLookupArray(response.referenceLookUp);
	$('#reference-big-screen').html($('#reference-big-screen').html() + referenceSelectHTML);
	$('#reference-small-screen').html($('#reference-small-screen').html() + referenceSelectHTML);
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
	
	var locationSelectHTML = createSelectOptionOutOfSelectLookupArray(response.locationsLookUp);
	$('#location-big-screen').html($('#location-big-screen').html() + locationSelectHTML);
	$('#location-small-screen').html($('#location-small-screen').html() + locationSelectHTML);

	var referenceSelectHTML = createSelectOptionOutOfSelectLookupArray(response.referenceLookUp);
	$('#reference-big-screen').html($('#reference-big-screen').html() + referenceSelectHTML);
	$('#reference-small-screen').html($('#reference-small-screen').html() + referenceSelectHTML);

	
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

function resetForm(resetBtnId) {
	var resetBtn = document.getElementById(resetBtnId);
	if (null !=  resetBtn) {
		resetBtn.click()
	}
	if (screenType == 'big-screen') {
		resetChosenDropdowns();
	}
}

function loadTestimonialContent() {
	testimonials = [{
		content : '&#34;&#32;Seek Mentore did everything – with almost no time or effort from me! The best part was that I could completely trust their team to find the best tutor of Physics for my son.&#34;',
		author : '- R S Trivedi (Parent)'
	}, {
		content : '&#34;&#32;When it comes to digital marketing there are loads of commentators that talk a good game, but Seek Mentore help you make it happen. They have enabled me, and given me the confidence to share my knowledge widely. It’s engaging students and bringing education to a new horizon.&#34;',
		author : '- Akhil Manik (Tutor)'
	}, {
		content : '&#34;&#32;You made it so simple. The assistance here is so much faster and easier. I just queried for a tutor; filled the form and clicked save. Found a experienced tutor within no time…Thanks, guys!.&#34;',
		author : '- Shubhashni Pachouri (Student)'
	}];
}

function nextTestimonialArrowClicked() {
	currentTestimonialDisplay += 1;
	if (currentTestimonialDisplay >= testimonials.length) {
		currentTestimonialDisplay = 0;
	}
	setTestimonialContentOnUI();
}

function prevTestimonialArrowClicked() {
	currentTestimonialDisplay -= 1;
	if (currentTestimonialDisplay < 0) {
		currentTestimonialDisplay = testimonials.length - 1;
	}
	setTestimonialContentOnUI();
}

function testimonialDotClicked(contentNumber) {
	if (null != contentNumber) {
		if (contentNumber > 0 && contentNumber <= testimonials.length) {
			currentTestimonialDisplay = contentNumber - 1;
		} else {
			currentTestimonialDisplay = 0;
		}
		setTestimonialContentOnUI();
	}
}

function setTestimonialContentOnUI() {
	var testimonial = testimonials[currentTestimonialDisplay];
	$('#testimonial-slide-content').html(testimonial.content);
	$('#testimonial-slide-author').html(testimonial.author);
}

toggleAnswer = function(id) {
	id = '#' + 'answer-panel-' + id;
	if ($(id).hasClass('noscreen')) {
		$(id).removeClass('noscreen');
	} else {
		$(id).addClass('noscreen');
	}
}