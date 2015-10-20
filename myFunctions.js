/*
 * DESCRIPTION: custom javascript & jquery functions
 * 	
 * AUTHOR: 	David Slusser
 * 
 * REVISION: 0.0.1
 */


function hidePanels(){
	//This function uses jquery to hide by class
	$(".infopanel").hide();
}

function showPanels(id){
	//This function uses jquery to show by ID
	$('#'+id).show();
}


function showElement(id){
	//This function uses jquery to show an element by ID
	$('#'+id).show();
}

function hideElement(id){
	//This function uses jquery to hide an element by ID
	$('#'+id).hide();
}


function makeNavTabActive(id){
	//Set a navtab active by ID
	$(".infonavpill" ).removeClass( "active" );
	$("#"+id).addClass( "active" );
}


function setQuickLinks(quick_link_id){
	// set the quicklinks on the Navbar
	document.getElementById('quickLinks').innerHTML = '';
	var text = "<font color='gray'>Quick links: </font>";
	var text = text + document.getElementById(quick_link_id).innerHTML
	document.getElementById('quickLinks').innerHTML = text;
}

function getValuesFrom(from_id, to_id, url, token){
	/*
	Description:
		gets a list of values based on a dropbox selection, and populates another dropdown
	
	Parameters:
		from_id	= id of the source selection box
		to_id	= id of the destination selection box
		url 	= django url that provides the values
	*/
	alert('in function');
    var content = document.getElementById(from_id).value;
    var token = String(token)
    $.ajax({
        url : url,
        type : "POST",
        dataType: "json", 
        data : {
            client_response : content,
            //csrfmiddlewaretoken: '{{ csrf_token }}'
            csrfmiddlewaretoken: token
            },
            success : function(json) {
                $('#result').append( 'Server Response: ' + json.server_response);
                buildDropDown(json.server_response, to_id);                       
            },
            error : function(xhr,errmsg,err) {
                alert(xhr.status + ": " + xhr.responseText);
            }
    });
    return false;
}


function getValuesFrom2(from_id, to_id, url, token, data_fields, selected){
	/*
	Description:
		gets a list of values based on a dropbox selection, and populates another dropdown
	
	Parameters:
		from_id	= id of the source selection box
		to_id	= id of the destination selection box
		url 	= django url that provides the values
		token   = cfrs token
		data_fields = additional data to send
		selected = dropdown item to mark as selected
	*/
	var content = document.getElementById(from_id).value;
    var token = String(token)
    $.ajax({
        url : url,
        type : "GET",
        dataType: "json", 
        data : {
            client_response : content,
            csrfmiddlewaretoken: token,
            data_fields: data_fields, 
            },
            success : function(json) {
                $('#result').append( 'Server Response: ' + json.server_response);
                buildDropDown(json.server_response, to_id, selected);                       
            },
            error : function(xhr,errmsg,err) {
            	alert(xhr.status + ": " + xhr.responseText);
            }
    });
    return false;
}


function buildDropDown(values, obj_id, selected){
	/* 
	Description:
		put a list of values into a dropdown box
	
	Parameters:
		values = list of comma-separated values
		obj_id = id of the selection box
		selected = list item to be selected
	*/
	//alert("in buildDropDown");
	var values = String(values);
	//alert(values);
	var obj_id = String(obj_id);
	var selected = String(selected);
	document.getElementById(obj_id).innerHTML = "";
    var myarray = values.split(",");
	var option = document.createElement("option");
	option.text = "---";
	document.getElementById(obj_id).add(option);
    for (var i = 0; i < myarray.length; i++)
	{
    	var option = document.createElement("option");
    	option.text = myarray[i];
    	document.getElementById(obj_id).add(option);
    	if (selected){
    		if (option.text == selected) {
    			document.getElementById(obj_id).selectedIndex = i+1;
    		}
    	}
	}
}

function sanityTest(){
	alert('testing!');
}


function setSelected(obj_id, item){
	/*
	Set an item in a dropdown list to selected by value
	 */
	var textToFind = item;
	var dd = document.getElementById(obj_id);
	for (var i = 0; i < dd.options.length; i++) {
	    if (dd.options[i].text === textToFind) {
	        dd.selectedIndex = i;
	        break;
	    }
	}	
}


function getSelectedText(id){
	/* Get the selected text from a listbox/dropdown */
	var text = $("#"+id+" option:selected").text();
	return text;
}

function getSelectedValue(id){
	/* Get the selected value from a listbox/dropdown */
	val = $("#"+id).val();
	return val;
}


function setValue(obj_id, value){
	// populate form field value 
	document.getElementById(obj_id).defaultValue = value
}


function addToList(obj_id, value) {
	// add a value to the top of a dropdown
    var x = document.getElementById(obj_id);
    var option = document.createElement("option");
    if (! value){
    	var value = "---"
    }
    option.text = value;
    x.add(option, x[0]);
    setSelected(obj_id, value);
}


function showModal(id) {
	/* show modal */
	$('#'+id).modal('show');
}

function hideModal(id) {
	/* hide modal */
	$('#'+id).modal('hide');
}

function toggleModal(id) {
	/* toggle modal */
	$('#'+id).modal('toggle');
}

