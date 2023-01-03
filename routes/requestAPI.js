const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.post('/', async (req, res) => {
	const url = `https://api.odcloud.kr/api/nts-businessman/v1/`;
	const auth = `?serviceKey=${process.env.API_KEY}`;
	const headerOptions = {
		headers: {
			"Content-Type": "application/json",
			"Accept": "image/png"
		}
	}
	let path, method, postData;

//	postData = {
//		businesses: [
//			{
//			  "b_no": "6130557454",
//			  "start_dt": "20000331",
//			  "p_nm": "오춘근",
//			},
//			{
//			  "b_no": "8828102525",
//			  "start_dt": "20220418",
//			  "p_nm": "박민정",
//			}
//		]
//	}
//
	switch(req.body.whatToDo) {
		case 'valid_single':
			method = 'validate';
			path = url + method + auth;
			postData = {
				businesses: [
					{
						b_no: req.body.businessNumber,
						p_nm: req.body.representative,
						start_dt: req.body.startDate
					}
				]
			}
			let result = await axios.post(path, postData, headerOptions);
			result = result.data.data
			const props = {
				params: {
					...result[0].request_param
				},
				isValid: result[0].valid === '01' ? '확인' : '미확인',
				result: {
					b_stt: result[0].status?.b_stt,
					tax_type: result[0].status?.tax_type,
					tax_type_cd: result[0].status?.tax_type_cd,
					tax_type_change_dt: result[0].status?.tax_type_change_dt,
					invoice_apply_dt: result[0].status?.invoice_apply_dt,
					utcc_yn: result[0].status?.utcc_yn,
					end_dt: result[0].status?.end_dt,
				}

			}

			res.render('apiResult', props)
			
			break;
		case 'valid_multi':
			method = 'validate';
			path = url + method + auth;
			break;
		case 'state_single':
			method = 'status';
			path = url + method + auth;
			break;
		case 'state_multi':
			method = 'status';
			path = url + method + auth;
			break;
		default :
			console.error('requestAPI 분기가 잘못되었습니다.')
	}


	class validParams {
		constructor(businessNumber, representativeName, startDate) {
			this.b_no = businessNumber;
			this.p_nm = representativeName;
			this.start_dt = startDate;
		}
	}
	const firstC = new validParams('1230', 'abc', '20230101')

})

module.exports = router; 
