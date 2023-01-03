//	여러 요소들 중 기본값으로 보여줄 것들을 여기에서 통제 한다.
globalThis.onload = () => {
	const hiddenElements = ['validMultiSearch', 'validMultiBtn_'];
	hiddenElements.forEach(ele => document.getElementById(ele).style.visibility = 'hidden')

	document.getElementById('validMultiBtn').style.opacity = 0.3;
	document.getElementById('whatToDo').value = 'valid_single';
}
