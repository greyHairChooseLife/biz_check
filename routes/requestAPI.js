const express = require('express');
const router = express.Router();
require('dotenv').config();
const Excel = require('exceljs');
const stream = require('stream');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ 
	//dest: 'userUpload'
	storage: multer.memoryStorage()		//	no need to use server storage
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

	const readingWB = await new Excel.Workbook().xlsx.load(req.file.buffer);
	const readingSheet = readingWB.getWorksheet(1);	//	it gets first sheet

	//	read each row, sanitize & validate to set arguments for api call
	readingSheet.eachRow((row, rowNumber) => {
		if(rowNumber === 1) return;	//	it refer header column
		//	get net proper arguments after sanitizing and validating
		postData.businesses.push(
			{
				b_no: String(row.values[2]).replaceAll(' ', '').length < 1 ? 'undefined' : String(row.values[2]).replaceAll(' ', ''),
				p_nm: String(row.values[3]).replaceAll(' ', '').length < 1 ? 'undefined' : String(row.values[3]).replaceAll(' ', ''),
				start_dt: String(row.values[4]).replaceAll(' ', '').length < 1 ? 'undefined' : String(row.values[4]).replaceAll(' ', ''),
			}
		)
	})

	let result;
	if(postData.businesses.length <= 100) {
		result = await axios.post(path, postData, headerOptions);
		result = result.data.data
	}
	else 	//	API RULE : less than 100 args at a time
	{
		result = [];
		const postDataArray = [];
		for(let i = 0; i < postData.businesses.length; i += 100) {
			postDataArray.push(postData.businesses.slice(i, i +100))
		}

		for await (const box of postDataArray) {
			postData.businesses = box;
			result.push(await axios.post(path, postData, headerOptions));
		}

		const writingWB = new Excel.Workbook();
		const writingSheet = writingWB.addWorksheet('result');

		//	now iterate result to set each result : meaning from jsonData to exceljs file making

		console.log(result[0].data.data)
		console.log(result[2].data.data)
	}


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
