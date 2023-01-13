////////////////////////////// 
////////////////////////////// 		STYLE
////////////////////////////// 
////////////////////////////// 

//	category(menu) on selected
const doStyleOnSingleSelected_valid = () => {
	const validMultiBtn = document.getElementById('validMultiBtn');
	validMultiBtn.style.opacity = 0.3;
	validMultiBtn.style.borderTop = 'none';
	validMultiBtn.style.borderLeft = 'none';
	const validSingleBtn = document.getElementById('validSingleBtn');
	validSingleBtn.style.opacity = 1.0;
	validSingleBtn.style.borderTop = 'solid 2px black';
	validSingleBtn.style.borderRight = 'solid 2px black';
	document.getElementById('validSingleBtn_').style.visibility = 'visible';
	document.getElementById('validMultiBtn_').style.visibility = 'hidden';

	document.getElementById('validSingleSearch').style.visibility = 'visible';
	document.getElementById('validMultiSearch').style.visibility = 'hidden';
}

const doStyleOnMultiSelected_valid = () => {
	const validSingleBtn = document.getElementById('validSingleBtn');
	validSingleBtn.style.opacity = 0.3;
	validSingleBtn.style.borderTop = 'none';
	validSingleBtn.style.borderRight = 'none';
	const validMultiBtn = document.getElementById('validMultiBtn');
	validMultiBtn.style.opacity = 1.0;
	validMultiBtn.style.borderTop = 'solid 2px black';
	validMultiBtn.style.borderLeft = 'solid 2px black';
	document.getElementById('validSingleBtn_').style.visibility = 'hidden';
	document.getElementById('validMultiBtn_').style.visibility = 'visible';

	document.getElementById('validMultiSearch').style.visibility = 'visible';
	document.getElementById('validSingleSearch').style.visibility = 'hidden';
}

////////////////////////////// 
////////////////////////////// 		CATEGORY(MENU) CLICK
////////////////////////////// 
////////////////////////////// 

let requestForm = document.getElementById('reqAPIForm');

document.getElementById('validSingleBtn').addEventListener('click', () => {
	doStyleOnSingleSelected_valid(); 	//	styling
	requestForm.action = "/apiRequest/valid_single";
	requestForm.encoding = ""
})
document.getElementById('validMultiBtn').addEventListener('click', () => {
	doStyleOnMultiSelected_valid();	//	styling
	requestForm.action = "/apiRequest/valid_multi";
	requestForm.encoding = "multipart/form-data"
})


//////////////////////////////
////////////////////////////// 		LIMIT UPLOAD SIZE : TO AVOID ERROR(OUT OF MEMORY) SINCE IT IS USING BUFFER
//////////////////////////////
//////////////////////////////

document.getElementById('fileInput_valid').addEventListener('change', function() {
	if(this.files[0].size > 1_048_576){
		alert("파일 크기는 최대 1MB 입니다.");
		this.value = "";
		isOverLimit = true;
	};
});
