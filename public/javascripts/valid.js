////////////////////////////// 
////////////////////////////// 		STYLE
////////////////////////////// 
////////////////////////////// 

//	category(menu) on selected
const doStyleOnSingleSelected = () => {
	const validMultiBtn = document.getElementById('validMultiBtn');
	validMultiBtn.style.opacity = 0.3;
	validMultiBtn.style.borderTop = 'none';
	validMultiBtn.style.borderLeft = 'none';
	const validSingleBtn = document.getElementById('validSingleBtn');
	validSingleBtn.style.opacity = 1.0;
	validSingleBtn.style.borderTop = 'solid 2px black';
	validSingleBtn.style.borderRight = 'solid 2px black';
	document.getElementById('validMultiBtn_').style.visibility = 'hidden';
	document.getElementById('validSingleBtn_').style.visibility = 'visible';

	document.getElementById('validSingleSearch').style.visibility = 'visible';
	document.getElementById('validMultiSearch').style.visibility = 'hidden';
}

const doStyleOnMultiSelected = () => {
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
	doStyleOnSingleSelected(); 	//	styling
	requestForm.action = "/apiRequest/single";
	requestForm.encoding = ""
})
document.getElementById('validMultiBtn').addEventListener('click', () => {
	doStyleOnMultiSelected();	//	styling
	requestForm.action = "/apiRequest/multi";
	requestForm.encoding = "multipart/form-data"
})


////////////////////////////// 
////////////////////////////// 		API REQUEST BUTTONS CLICK
////////////////////////////// 
////////////////////////////// 

const reqAPIBtn = document.getElementById('reqAPIBtn');
reqAPIBtn.addEventListener('click', () => {
	//	클라이언트에서 해 줄 일은 
	//	1. validating, sanitizing
	//	2. form.post를 submit (서버단에서 처리하고 res할 수 있도록)

	const baseUrl = "http://localhost:3000"

	switch(requestForm.action) {
		case baseUrl + '/apiRequest/single':
			if(requestForm.businessNumber.value === '' || requestForm.representative.value === '' || requestForm.startDate.value === '') {
				if(requestForm.businessNumber.value === '')
					alert('사업자 번호를 입력 해 주세요.')
				else if(requestForm.representative.value === '')
					alert('대표명을 입력 해 주세요.')
				else if(requestForm.startDate.value === '')
					alert('사업 개시일을 입력 해 주세요.')
			} else {
				requestForm.submit();
			}
			break;

		case baseUrl + '/apiRequest/multi':
			requestForm.submit();
			break;
		default:
			console.log('action href is NOT defined')
			console.log('form: ', requestForm)
	}
})