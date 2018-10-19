function submitFormResult() {	
	var innerHTML='';
	var firstName = $('#firstname');
	var lastName = $('#lastname');
	var classNo = $('#student-grade-result');
	var contact = $('#contact-number');
	var dataValidated = true;  
	var studentMatch = false; 	

    if(!firstName.val().trim().match(/^[A-Za-z]+$/)) {
    	$('#display-result').html('Please enter proper "First Name".').css('color', 'red');
        firstName.focus();
        dataValidated=false;
    }
    if(!lastName.val().trim().match(/^[A-Za-z]+$/)) {
    	$('#display-result').html('Please enter proper "Last Name".').css('color', 'red');
        lastName.focus();
        dataValidated=false;
    }    
    if(!contact.val().trim().match(/^[0-9]+$/)) {
    	$('#display-result').html('Please enter proper 10 digit "Contact Number".').css('color', 'red');
    	contact.focus();
    	dataValidated=false;
    }
    if(firstName.val()==""||contact.val()==""|| lastName.val()==""||classNo.val()=="") {
    	$('#display-result').html('One or more fields are empty. Please enter all the details.').css('color', 'red');
    	dataValidated=false;
    }

    if(dataValidated) {
    	for(i=0; i<studentDataList.length; i++) {    		  		
    		if (
    				firstName.val().toLowerCase().trim() == studentDataList[i].firstName.toLowerCase()
    				&& classNo.val().toLowerCase().trim() == studentDataList[i].className.toLowerCase() 
    				&& contact.val().toLowerCase().trim() ==  studentDataList[i].phoneNo.toLowerCase()  
			) {
    			innerHTML += '<tr ><td> Name </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+studentDataList[i].firstName +'  '+ studentDataList[i].lastName + '"disabled> </td></tr>';
    			innerHTML += '<tr><td> Class </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ studentDataList[i].className +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Marks </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ studentDataList[i].marks +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Learning Style </td><td>'+ '<input type="text" style="font-family: cursive" value ="' + studentDataList[i].learningStyle + '"disabled></td></tr>';
    			innerHTML += '<tr><td> Suggestions </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="2" cols="15"  readonly>'+ studentDataList[i].suggestions + '</textarea>' +'</td></tr>';
    			studentMatch=true;

    		}
    	}
    	if(studentMatch) {
			$('#details-form').addClass('noscreen');
			$('#display-result').html(innerHTML);
		} else {
			$('#display-result').html('Please check your details. One or more details entered is incorrect!!!').css('color', 'red');
		}
    } 
}

function resetForm(resetBtnId) {
	var resetBtn = document.getElementById(resetBtnId);
	if (null !=  resetBtn) {
		resetBtn.click()
	}
	$('#display-result').html('');
}

	


