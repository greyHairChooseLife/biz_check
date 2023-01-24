const validBtn = document.getElementById('validBtn');
const stateBtn = document.getElementById('stateBtn');

validBtn.addEventListener('click', () => {
	stateBtn.className = 'notSelected'
	validBtn.className = ''

	document.getElementById('valid').style.display = 'block';
	document.getElementById('state').style.display = 'none';

	document.getElementById('validSingleBtn').click();
})

stateBtn.addEventListener('click', () => {
	validBtn.className = 'notSelected'
	stateBtn.className = ''

	document.getElementById('state').style.display = 'block';
	document.getElementById('valid').style.display = 'none';

	document.getElementById('stateSingleBtn').click();
})


//	show filename
document.getElementById('fileInput_valid').addEventListener('change', () => {
	document.getElementById('filename_valid').value = document.getElementById('fileInput_valid').value;
})

//	show filename
document.getElementById('fileInput_state').addEventListener('change', () => {
	document.getElementById('filename_state').value = document.getElementById('fileInput_state').value;
})


////////////////////////////// 
////////////////////////////// 		API REQUEST BUTTONS CLICK
////////////////////////////// 
////////////////////////////// 

const reqAPIBtn = document.getElementById('reqAPIBtn');

reqAPIBtn.addEventListener('click', () => {
	//	클라이언트에서 해 줄 일은 
	//	1. stateating, sanitizing
	//	2. form.post를 submit (서버단에서 처리하고 res할 수 있도록)
	const parsedURL = requestForm.action.split('/');

	switch(parsedURL[parsedURL.length -1]) {
		case 'valid_single':
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

		case 'valid_multi':
			if(!isOverLimit) requestForm.submit();
			break;

		case 'state_single':
			if(requestForm.businessNumber_state.value === '') {
				alert('사업자 번호를 입력 해 주세요.')
			} else {
				requestForm.submit();
			}
			break;

		case 'state_multi':
			if(!isOverLimit) requestForm.submit();
			break;

		default:
			console.log(parsedURL[parsedURL.length -1])
			console.log('action href is NOT defined')
			console.log('form: ', requestForm)
	}
})

let isOverLimit = false;	// check file size limit
