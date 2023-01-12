//	여러 요소들 중 기본값으로 보여줄 것들을 여기에서 통제 한다.
globalThis.onload = () => {
	const hideElements = ['validMultiSearch', 'validMultiBtn_', 'stateMultiSearch', 'stateMultiBtn_'];
	hideElements.forEach(ele => document.getElementById(ele).style.visibility = 'hidden')

	const notSelectedElements = ['validMultiBtn', 'stateBtn', 'stateMultiBtn'];
	notSelectedElements.forEach(ele => document.getElementById(ele).className = 'notSelected')

	const notDisplayed = ['state'];
	notDisplayed.forEach(ele => document.getElementById(ele).style.display = 'none')
}
