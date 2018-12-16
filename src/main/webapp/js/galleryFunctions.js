function loadClass( className,  totalpics)
{	$('#total-grades').addClass('noscreen');
	for(var i=1;i<=totalpics;i++ )
	 { 
		 var columnNo = 3;
		 var row = document.createElement("tr");
		 while(columnNo > 0)
		   {
			  var column = document.createElement("td");
			 
			  var img = document.createElement("IMG");
			  img.setAttribute("src", "C:/Users/jigya/Documents/GitHub/SeekMentorePublicPages/src/main/webapp/images/nirmala-results/"+className+"/"+i+".jpg");
			  img.setAttribute("width", "304");
			  img.setAttribute("height", "228");
			  column.appendChild(img);
			  row.appendChild(column);
			  columnNo --;		
			  totalpics--;
		   }
		 document.getElementById("gallery-section").appendChild(row);
	 }
	
}

function loadTotalGrades(totalGrades)
{
	$('#gallery-section').addClass('noscreen');
	for(var i=1;i<=totalGrades;i++ )
	 {
		 var columnNo = 3;
		 var row = document.createElement("tr");
		 while(columnNo > 0)	
		 {
		  var column = document.createElement("td");
		  var img = document.createElement("IMG");
		  img.setAttribute("src", "C:/Users/jigya/Documents/GitHub/SeekMentorePublicPages/src/main/webapp/images/nirmala-results/"+i+"/1.jpg");
		  img.setAttribute("width", "304");
		  img.setAttribute("height", "228");
		  column.appendChild(img);
		  row.appendChild(column);
		  columnNo --;		
		  totalGrades--;
	   }
		 document.getElementById("total-grades").appendChild(row);
	 }
	
}