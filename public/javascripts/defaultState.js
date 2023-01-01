globalThis.onload = () => {
	const displayNoneElement = ['quote', 'validMultiSearch', 'validMultiBtn_'];
	displayNoneElement.forEach(ele => document.getElementById(ele).style.display = 'none')

	document.getElementById('validMultiBtn').style.opacity = 0.3;
}
