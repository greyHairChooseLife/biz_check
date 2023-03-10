////////////////////////////// 
////////////////////////////// 		STYLE
////////////////////////////// 
////////////////////////////// 

//	category(menu) on selected
const doStyleOnSingleSelected_state = () => {
	const stateMultiBtn = document.getElementById('stateMultiBtn');
	stateMultiBtn.style.opacity = 0.3;
	stateMultiBtn.style.borderTop = 'none';
	stateMultiBtn.style.borderLeft = 'none';
	const stateSingleBtn = document.getElementById('stateSingleBtn');
	stateSingleBtn.style.opacity = 1.0;
	stateSingleBtn.style.borderTop = 'solid 2px black';
	stateSingleBtn.style.borderRight = 'solid 2px black';
	document.getElementById('stateMultiBtn_').style.visibility = 'hidden';
	document.getElementById('stateSingleBtn_').style.visibility = 'visible';

	document.getElementById('stateSingleSearch').style.visibility = 'visible';
	document.getElementById('stateMultiSearch').style.visibility = 'hidden';
}

const doStyleOnMultiSelected_state = () => {
	const stateSingleBtn = document.getElementById('stateSingleBtn');
	stateSingleBtn.style.opacity = 0.3;
	stateSingleBtn.style.borderTop = 'none';
	stateSingleBtn.style.borderRight = 'none';
	const stateMultiBtn = document.getElementById('stateMultiBtn');
	stateMultiBtn.style.opacity = 1.0;
	stateMultiBtn.style.borderTop = 'solid 2px black';
	stateMultiBtn.style.borderLeft = 'solid 2px black';
	document.getElementById('stateSingleBtn_').style.visibility = 'hidden';
	document.getElementById('stateMultiBtn_').style.visibility = 'visible';

	document.getElementById('stateMultiSearch').style.visibility = 'visible';
	document.getElementById('stateSingleSearch').style.visibility = 'hidden';
}

////////////////////////////// 
////////////////////////////// 		CATEGORY(MENU) CLICK
////////////////////////////// 
////////////////////////////// 

document.getElementById('stateSingleBtn').addEventListener('click', () => {
	doStyleOnSingleSelected_state(); 	//	styling
	requestForm.action = "/apiRequest/state_single";
	requestForm.encoding = ""
})
document.getElementById('stateMultiBtn').addEventListener('click', () => {
	doStyleOnMultiSelected_state();	//	styling
	requestForm.action = "/apiRequest/state_multi";
	requestForm.encoding = "multipart/form-data"
})


//////////////////////////////
////////////////////////////// 		LIMIT UPLOAD SIZE : TO AVOID ERROR(OUT OF MEMORY) SINCE IT IS USING BUFFER
//////////////////////////////
//////////////////////////////

document.getElementById('fileInput_state').addEventListener('change', function() {
	if(this.files[0].size > 1_048_576){
		alert("?????? ????????? ?????? 1MB ?????????.");
		this.value = "";
		isOverLimit = true;
	};
});
