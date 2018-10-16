var studentJSON = "[ {\"firstName\":\"Shantanu\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },{\"firstName\":\"Jigyasa\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },	{\"firstName\":\"Silky\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" } ]";


function submitFormResult() {	
	
	var JSON_Object = JSON.parse(studentJSON);
	var i;
	var innerHTML='';
	var firstName = document.getElementById('firstname');
	var lastName = document.getElementById('lastname');
	var classNo = document.getElementById('student-grade');
	var contact = document.getElementById('contact-number');
    var studentMatch = false;  
/*	var firstName = 'Shantanu';
	var lastName = 'Shntanu';
	var classNo = 'VII';
	var contact = 1234567890;*/
	
    /*if(firstName.match(/^[A-Za-z]+$/) == false)
    {
    	alert("First Name must contains only Letters.")
    }
    if(lastName.match(/^[A-Za-z]+$/) == false)
    {
    	document.getElementById('display-result').innerHTML = 'Last Name must contains only Letters.'
    }
    if(contact.match(/^\d{10}$/) == false)
    {
    	document.getElementById('display-result').innerHTML = 'Please enter correct Contact No.'
    }
    if(classNo != 'VII' && classNo != 'VIII' && classNo != 'IX' )
    {
    	document.getElementById('display-result').innerHTML = 'Please enter correct Standard.'
    }
*/
	for(i=0; i<JSON_Object.length; i++)
	{
		if(firstName == JSON_Object[i].firstName && classNo == JSON_Object[i].className && contact ==  JSON_Object[i].phoneNo  )
			{
			  innerHTML += '<tr ><td> Name </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+JSON_Object[i].firstName +'  '+ JSON_Object[i].lastName + '"disabled> </td></tr>';
			  innerHTML += '<tr><td> Gender </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ JSON_Object[i].className +'"disabled></td></tr>';
			  innerHTML += '<tr><td> Class </td><td>'+ '<input type="text" style="font-family: cursive" value ="'+ JSON_Object[i].className +'"disabled></td></tr>';
			  innerHTML += '<tr><td> Marks </td><td>'+ '<input type="text"  style="font-family: cursive" value ="'+ JSON_Object[i].marks +'"disabled></td></tr>';
			  innerHTML += '<tr><td> Learning Style </td><td>'+ '<input type="text" style="font-family: cursive" value ="' + JSON_Object[i].learningStyle + '"disabled></td></tr>';
			  innerHTML += '<tr><td> Suggestions </td><td>'+ '<textarea  style="font-family: cursive  overflow: scroll "rows="2" cols="15"  readonly>'+ JSON_Object[i].suggestions + '</textarea>' +'</td></tr>';
			  studentMatch = true;
			}
		
	}
	if(studentMatch)
	{   $('#details-form').addClass('noscreen');
		$('#display-result').html(innerHTML);
	}
	else
	{
		alert("Please check your details.One or more details entered is incorrect!!")
	}
	
	
}
	


