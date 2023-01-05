const express = require('express');
const router = express.Router();
require('dotenv').config();
const Excel = require('exceljs');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ 
	//dest: 'userUpload'
	storage: multer.memoryStorage()
})

const url = `https://api.odcloud.kr/api/nts-businessman/v1/`;
const auth = `?serviceKey=${process.env.API_KEY}`;
const headerOptions = {
	headers: {
		"Content-Type": "application/json",
	}
}
let path, method, postData;

router.post('/single', async (req, res) => {
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
})

router.post('/multi', upload.single('selectedFile'), async (req, res) => {
	method = 'validate';
	path = url + method + auth;
	postData = {
		businesses: [
		]
	}

	const wb = await new Excel.Workbook().xlsx.load(req.file.buffer);
	const sheet = wb.getWorksheet('1');

	//	read reach row, sanitize & validate to set arguments for api call
	sheet.eachRow((row, rowNumber) => {
		if(rowNumber === 1) return;	//	it refer header column
		//	sanitize and validate
		if(String(row.values[2]).replaceAll(' ', '').length < 1) return
		if(String(row.values[3]).replaceAll(' ', '').length < 1) return
		if(String(row.values[4]).replaceAll(' ', '').length < 1) return

		//	net proper arguments 
		postData.businesses.push(
			{
				b_no: String(row.values[2]).replaceAll(' ', ''),
				p_nm: String(row.values[3]).replaceAll(' ', ''),
				start_dt: String(row.values[4]).replaceAll(' ', ''),
			}
		)
	})


	let result;
	try{
		result = await axios.post(path, postData, headerOptions);
	}catch(err){
	}
	result = result.data.data

	res.send(result)
})

//		case 'valid_multi':
//			console.log('ppp: ', req.body)
//			break;
//		case 'state_single':
//			method = 'status';
//			path = url + method + auth;
//			break;
//		case 'state_multi':
//			method = 'status';
//			path = url + method + auth;
//			break;
//		default :
//			console.error('requestAPI 분기가 잘못되었습니다.')
//			console.log(': ', req.body.whatToDo)


module.exports = router; 
