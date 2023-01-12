const validBtn = document.getElementById('validBtn');
const stateBtn = document.getElementById('stateBtn');

validBtn.addEventListener('click', () => {
	stateBtn.className = 'notSelected'
	validBtn.className = ''

	document.getElementById('valid').style.display = 'block';
	document.getElementById('state').style.display = 'none';
})

stateBtn.addEventListener('click', () => {
	validBtn.className = 'notSelected'
	stateBtn.className = ''

	document.getElementById('state').style.display = 'block';
	document.getElementById('valid').style.display = 'none';
})


document.getElementById('fileInput_valid').addEventListener('change', () => {
	document.getElementById('filename_valid').value = document.getElementById('fileInput_valid').value;
})

document.getElementById('fileInput_state').addEventListener('change', () => {
	document.getElementById('filename_state').value = document.getElementById('fileInput_state').value;
})
