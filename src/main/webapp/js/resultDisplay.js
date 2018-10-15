var studentJSON = "[ {\"firstName\":\"Shantanu\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },{\"firstName\":\"Jigyasa\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" },	{\"firstName\":\"Silky\", \"lastName\":\"Mukherjee\", \"className\":\"VII\", \"phoneNo\":\"1234567890\", \"marks\":\"3\", \"learningStyle\":\"sdgashdgsahdsd\", \"suggestions\":\"dfdfdsfds\" } ]";


function submitFormResult() {	
	
	var JSON_Object = JSON.parse(studentJSON);
	var i;
	var innerHTML='';
	var firstName = document.getElementById('firstname');
	var lastName = document.getElementById('lastname');
	var classNo = document.getElementById('student-grade-big-screen');
	var contact = document.getElementById('contact-number');
    var studentMatch = false;  
	/*var id_name = 'Shantanu';
	var id_class = 'VII';
	var id_contact = 1234567890;*/
	
	for(i=0; i<JSON_Object.length; i++)
	{
		if(firstName == JSON_Object[i].firstName && classNo == JSON_Object[i].className && contact ==  JSON_Object[i].phoneNo  )
			{
			  innerHTML += '<tr><td> Marks </td><td>'+ JSON_Object[i].marks +'</td></tr>';
			  innerHTML += '<tr><td> Learning Style </td><td>'+ JSON_Object[i].learningStyle +'</td></tr>';
			  innerHTML += '<tr><td> Suggestions </td><td>'+ JSON_Object[i].suggestions +'</td></tr>';
			  studentMatch = true;
			}
		
	}
	if(studentMatch)
	{
		document.getElementById('display-result').innerHTML = innerHTML;
	}
	else
	{
		alert("Please check your details.One or more details entered is incorrect!!")
	}
}
	


