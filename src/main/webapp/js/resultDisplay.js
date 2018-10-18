var studentJSON = "[ {\"firstName\":\"Shantanu\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },{\"firstName\":\"Jigyasa\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },	{\"firstName\":\"Silky\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" } ]";

function submitFormResult() {	
	
	var JSON_Object = JSON.parse(studentJSON);
	var innerHTML='';
	var firstName = $('#firstname');
	var lastName = $('#lastname');
	var classNo = $('#student-grade-result');
	var contact = $('#contact-number');
	var dataValidated = true;  
	

    if(!firstName.val().match(/^[A-Za-z]+$/))
    {
    	$('#display-result').html('Please enter valid Details.').css('color', 'red');
        firstName.focus();
        dataValidated=false;
    }
    if(!lastName.val().match(/^[A-Za-z]+$/))
    {
    	$('#display-result').html('Please enter valid Details.').css('color', 'red');
        lastName.focus();
        dataValidated=false;
    }    
    if(!contact.val().match(/^[0-9]+$/))
    {
    	$('#display-result').html('Please enter valid Details.').css('color', 'red');
    	contact.focus();
    	dataValidated=false;
    }
    if(firstName.val()==""||contact.val()==""|| lastName.val()==""||classNo.val()=="")
    {
    	$('#display-result').html('One or more fields are empty. Please enter all the details.').css('color', 'red');
    	dataValidated=false;
    }

    if(dataValidated)
    {

    	for(i=0; i<JSON_Object.length; i++)
    	{

    		if(firstName.value == JSON_Object[i].firstName && classNo.value == JSON_Object[i].className && contact.value ==  JSON_Object[i].phoneNo  )
    		{
    			$('#display-result').html('');
    			innerHTML += '<tr ><td> Name </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+JSON_Object[i].firstName +'  '+ JSON_Object[i].lastName + '"disabled> </td></tr>';
    			innerHTML += '<tr><td> Class </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ JSON_Object[i].className +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Marks </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ JSON_Object[i].marks +'"disabled></td></tr>';
    			innerHTML += '<tr><td> Learning Style </td><td>'+ '<input type="text" style="font-family: cursive" value ="' + JSON_Object[i].learningStyle + '"disabled></td></tr>';
    			innerHTML += '<tr><td> Suggestions </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="2" cols="15"  readonly>'+ JSON_Object[i].suggestions + '</textarea>' +'</td></tr>';

    			$('#details-form').addClass('noscreen');
    			$('#display-result').html(innerHTML);
    		}

    		else
    		{
    			$('#display-result').html('Please check your details.One or more details entered is incorrect!!').css('color', 'red');
    		}
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

	


