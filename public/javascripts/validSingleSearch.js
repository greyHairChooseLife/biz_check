//	do style on selected
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

document.getElementById('validSingleBtn').addEventListener('click', doStyleOnSingleSelected)

const reqAPIBtn = document.getElementById('reqAPIBtn');
reqAPIBtn.addEventListener('click', () => {
	const form = document.getElementById('reqAPIForm');

	if(form.businessNumber.value === '' || form.representative.value === '' || form.startDate.value === '') {
		if(form.businessNumber.value === '')
			alert('사업자 번호를 입력 해 주세요.')
		else if(form.representative.value === '')
			alert('대표명을 입력 해 주세요.')
		else if(form.startDate.value === '')
			alert('사업 개시일을 입력 해 주세요.')
	} else {
		form.submit();
	}
})
