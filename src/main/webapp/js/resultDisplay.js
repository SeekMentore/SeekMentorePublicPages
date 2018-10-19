function submitFormResult() {	
	var innerHTML='';
	var questionsInnerHTML='';
	var firstName = $('#firstname');
	var lastName = $('#lastname');
	var classNo = $('#student-grade-result');
	var contact = $('#contact-number');
	var dataValidated = true;  
	var studentMatch = false; 	

	if (contact.val() != "") {
    	// Verify contact info if it is entered
    	if(!contact.val().trim().match(/^[0-9]+$/)) {
    		$('#display-result').html('Please enter proper 10 digit "Contact Number".').css('color', 'red');
    		contact.focus();
    		dataValidated=false;
    	}
    }
	if(!lastName.val().trim().match(/^[A-Za-z]+$/)) {
    	$('#display-result').html('Please enter proper "Last Name".').css('color', 'red');
        lastName.focus();
        dataValidated=false;
    }
    if(!firstName.val().trim().match(/^[A-Za-z]+$/)) {
    	$('#display-result').html('Please enter proper "First Name".').css('color', 'red');
        firstName.focus();
        dataValidated=false;
    }
    
    if(
    		firstName.val() == "" 
			//|| contact.val() == "" 
			|| lastName.val() == "" 
			|| classNo.val() == ""
	) {
    	$('#result-unavailable-message-box').html('One or more fields are empty. Please enter all the details.');
    	$('#result-unavailable-message').removeClass('noscreen');
    	dataValidated=false;
    }

    if(dataValidated) {
    	for(i=0; i<studentDataList.length; i++) {    		  		
    		if (
    				firstName.val().toLowerCase().trim() == studentDataList[i].firstName.toLowerCase()
    				&& lastName.val().toLowerCase().trim() == studentDataList[i].lastName.toLowerCase()
    				&& classNo.val().toLowerCase().trim() == studentDataList[i].className.toLowerCase() 
    				//&& contact.val().toLowerCase().trim() ==  studentDataList[i].phoneNo.toLowerCase()  
			) {
    			innerHTML += '<tr><td> Name </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+studentDataList[i].firstName +'  '+ studentDataList[i].lastName + '"disabled> </td></tr>';
    			innerHTML += '<tr><td> Class </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ studentDataList[i].className +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Vocal Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ studentDataList[i].visualPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Auditory Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ studentDataList[i].auditoryPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Tactical Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ studentDataList[i].tacticalPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Consolidated </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ studentDataList[i].marks +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Your Learning Style </td><td>'+ '<input type="text" style="font-family: cursive" value ="' + studentDataList[i].learningStyle + '"disabled></td></tr>';
    			//innerHTML += '<tr><td> Suggestions </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="2" cols="15"  readonly>'+ studentDataList[i].suggestions + '</textarea>' +'</td></tr>';
    			for(j=0; j<studentDataList[i].questions.length; j++) {
    				var style = '';
    				if (studentDataList[i].questions[j].answerResponse == 'OFTEN') {
    					style = 'style="color:green;"';
    				} else if (studentDataList[i].questions[j].answerResponse == 'SOMETIMES') {
    					style = 'style="color:blue;"';
    				} else if (studentDataList[i].questions[j].answerResponse == 'SELDOM') {
    					style = 'style="color:red;"';
    				} 
    				questionsInnerHTML += '<tr><td>Q'+(j+1)+']</td><td>'+studentDataList[i].questions[j].question+'</td><td '+style+'>'+studentDataList[i].questions[j].answerResponse+'</td></tr>';
    			}
    			studentMatch=true;

    		}
    	}
    	alert(studentMatch);
    	if(studentMatch) {
			$('#details-form').addClass('noscreen');
			$('#back-to-form-div').removeClass('noscreen');
			$('#display-result').html(innerHTML);
			$('#display-result-resposnes').html(questionsInnerHTML);
			$('#display-result-table').removeClass('noscreen');
			$('#display-result-resposnes-table').removeClass('noscreen');
			$('#result-unavailable-message-box').html('');
			$('#result-unavailable-message').addClass('noscreen');
		} else {
			$('#details-form').removeClass('noscreen');
			$('#back-to-form-div').addClass('noscreen');
			$('#display-result').html('');
			$('#display-result-resposnes').html('');
			$('#display-result-table').addClass('noscreen');
			$('#display-result-resposnes-table').addClass('noscreen');
			$('#result-unavailable-message-box').html('Please check your details. One or more details entered is incorrect!!!');
			$('#result-unavailable-message').removeClass('noscreen');
		}
    } 
}

function showBackForm() {
	$('#details-form').removeClass('noscreen');
	$('#back-to-form-div').addClass('noscreen');
	$('#display-result').html('');
	$('#display-result-resposnes').html('');
	$('#display-result-table').addClass('noscreen');
	$('#display-result-resposnes-table').addClass('noscreen');
	$('#result-unavailable-message-box').html('');
	$('#result-unavailable-message').removeClass('noscreen');
}

function resetForm(resetBtnId) {
	var resetBtn = document.getElementById(resetBtnId);
	if (null !=  resetBtn) {
		resetBtn.click()
	}
	$('#display-result').html('');
}

	


