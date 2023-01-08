//	빈 칸은 아닌지
//	길이가 맞는지
//	숫자만 있어야 할 곳에 숫자만 있는지
//	띄어쓰기 모두 제거하고 나면 빈 칸은 아닌지

/**
 * Returns whether it is proper argument or not to judge to capture into wrongArgv array.
 *
 * @param {any} it comes from user own file
 * @param {number} each column has different condition.
 * @return {Boolean}
 */
function isValid(arg, colN) {
	if(arg === undefined) return false;
	arg = String(arg);
	switch(colN) {
		case 2:		//	사업자 번호
			if(arg.length !== 10) return false
			if(arg.split('').find(ele => isNaN(ele) || ele === ' ')) return false		// 	형변환 알아서 해 준다. 공백은 못 잡아낸다.
			break;
		case 3:		//	대표명
			if(arg.replaceAll(' ', '').length < 1) return false 
			break;
		case 4:		//	사업 개시일
			if(arg.length !== 8) return false
			if(arg.split('').find(ele => isNaN(ele) || ele === ' ')) return false		// 	형변환 알아서 해 준다. 공백은 못 잡아낸다.
			break;
		default:
			throw new Error('validator.js')
	}
	return true
}

/**
 * Returns whether it is empty or not because API throws error with empty arguments.
 *
 * @param {any} it comes from user own file
 * @return {Boolean}
 */
function isEmpty(arg) {
	if(arg === undefined) return true
	if(String(arg).replaceAll(' ', '').length < 1) return true
	return false
}

module.exports = { isValid, isEmpty };
