//	do style on selected
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

document.getElementById('validMultiBtn').addEventListener('click', doStyleOnMultiSelected)
