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
	if(!lastName.val().trim().match(/^[A-Za-z ]+$/)) {
    	$('#display-result').html('Please enter proper "Last Name".').css('color', 'red');
        lastName.focus();
        dataValidated=false;
    }
    if(!firstName.val().trim().match(/^[A-Za-z ]+$/)) {
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
    var numberOfStudents = 0;
    var studentIndex = -1;

    if(dataValidated) {
    	var completeName = firstName.val().toLowerCase().trim() + ' ' + lastName.val().toLowerCase().trim();
    	for(i=0; i<studentDataList.length; i++) {
    		var fullname = studentDataList[i].firstName.toLowerCase() + ' ' + studentDataList[i].lastName.toLowerCase();
    		if (
    				completeName == fullname
    				&& classNo.val().toLowerCase().trim() == studentDataList[i].className.toLowerCase() 
			) {
    			if (contact.val().trim() != "") {
    				if (contact.val().toLowerCase().trim() ==  studentDataList[i].phoneNo.toLowerCase()) {
    					numberOfStudents++;
    	    			studentIndex = i;
    	    			studentMatch=true;
    				}
    			} else {
    				numberOfStudents++;
        			studentIndex = i;
        			studentMatch=true;
    			}
    		}
    	}
    	
    	if(studentMatch) {
    		var shouldProcced = false;
    		if (numberOfStudents == 1) {
    			var student = studentDataList[studentIndex];
        		innerHTML += '<tr><td> Name </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+student.firstName +'  '+ student.lastName + '"disabled> </td></tr>';
    			innerHTML += '<tr><td> Class </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ student.className +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Vocal Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ student.visualPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Auditory Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ student.auditoryPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Tactical Score </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ student.tacticalPrefScore +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Consolidated </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ student.marks +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Your Learning Style </td><td>'+ '<input type="text" style="font-family: cursive" value ="' + student.learningStyle + '"disabled></td></tr>';
    			innerHTML += '<tr><td> Preferred Learning Method </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="10" cols="20"  readonly>'+ student.learningMethod + '</textarea>'+'</td></tr>';
    			innerHTML += '<tr><td> Suggestions </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="10" cols="20"  readonly>'+ student.suggestions + '</textarea>' +'</td></tr>';
    			for(j=0; j<student.questions.length; j++) {
    				var style = '';
    				if (student.questions[j].answerResponse == 'OFTEN') {
    					style = 'style="color:green;"';
    				} else if (student.questions[j].answerResponse == 'SOMETIMES') {
    					style = 'style="color:blue;"';
    				} else if (student.questions[j].answerResponse == 'SELDOM') {
    					style = 'style="color:red;"';
    				} 
    				questionsInnerHTML += '<tr><td>Q'+(j+1)+']</td><td>'+student.questions[j].question+'</td><td '+style+'>'+student.questions[j].answerResponse+'</td></tr>';
    			}
    			shouldProcced = true;
        	} else {
        		if (contact.val().trim() == "") {
        			$('#details-form').removeClass('noscreen');
        			$('#back-to-form-div').addClass('noscreen');
        			$('#display-result').html('');
        			$('#display-result-resposnes').html('');
        			$('#display-result-table').addClass('noscreen');
        			$('#display-result-resposnes-table').addClass('noscreen');
        			$('#result-unavailable-message-box').html('Multiple entries found for your Name in same Grade. Please enter your "Contact Number".');
        			$('#result-unavailable-message').removeClass('noscreen');
        		} else {
        			$('#details-form').removeClass('noscreen');
        			$('#back-to-form-div').addClass('noscreen');
        			$('#display-result').html('');
        			$('#display-result-resposnes').html('');
        			$('#display-result-table').addClass('noscreen');
        			$('#display-result-resposnes-table').addClass('noscreen');
        			$('#result-unavailable-message-box').html('Multiple entries found for your Name in same Grade and Contact Number. Please contact "Seek Mentore".');
        			$('#result-unavailable-message').removeClass('noscreen');
        		}
        	}
    		if (shouldProcced) {    			
    			$('#details-form').addClass('noscreen');
    			$('#back-to-form-div').removeClass('noscreen');
    			$('#display-result').html(innerHTML);
    			$('#display-result-resposnes').html(questionsInnerHTML);
    			$('#display-result-table').removeClass('noscreen');
    			$('#display-result-resposnes-table').removeClass('noscreen');
    			$('#result-unavailable-message-box').html('');
    			$('#result-unavailable-message').addClass('noscreen');
    		}
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

	


