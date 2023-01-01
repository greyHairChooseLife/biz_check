const express = require('express');
const router = express.Router();
require('dotenv').config();
const axios = require('axios');

router.get('/', async (req, res) => {
	const method = 'validate';
	const path = `https://api.odcloud.kr/api/nts-businessman/v1/${method}?serviceKey=${process.env.API_KEY}`;

	const postData = {
		businesses: [
			{
			  "b_no": "6130557454",
			  "start_dt": "20000331",
			  "p_nm": "오춘근",
			},
			{
			  "b_no": "8828102525",
			  "start_dt": "20220418",
			  "p_nm": "박민정",
			}
		]
	}

	const headerOptions = {
		headers: {
			"Content-Type": "application/json",
			"Accept": "image/png"
		}
	}

	const result = await axios.post(path, postData, headerOptions);

	console.log(result)
		

	class validParams {
		constructor(businessNumber, representativeName, startDate) {
			this.b_no = businessNumber;
			this.p_nm = representativeName;
			this.start_dt = startDate;
		}
	}

	const firstC = new validParams('1230', 'abc', '20230101')
	res.send(Object.entries(result.data))
})

module.exports = router; 
