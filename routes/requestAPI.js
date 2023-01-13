const express = require('express');
const router = express.Router();
require('dotenv').config();
const Excel = require('exceljs');
const stream = require('stream');
const axios = require('axios');
const multer = require('multer');
const upload = multer({ 
	//dest: 'userUpload'
	storage: multer.memoryStorage(),		//	no need to use server storage so set it using buffer
	limits: {fileSize: Number(process.env.MAX_UPLOAD_LIMIT)}
})

const { isValid, isEmpty } = require('./myModules/validator');

const url = `https://api.odcloud.kr/api/nts-businessman/v1/`;
const auth = `?serviceKey=${process.env.API_KEY}`;
const headerOptions = {
	headers: {
		"Content-Type": "application/json",
	}
}
let path, method, postData;

router.post('/valid_single', async (req, res) => {
	method = 'validate';
	path = url + method + auth;
	let {businessNumber: b_no, representative: p_nm, startDate: start_dt} = req.body;

	//	valiate
	!isValid(b_no, 2) && (b_no = '10자리 숫자가 아닙니다.')
	!isValid(p_nm, 3) && (p_nm = '이름을 써 주세요.')
	!isValid(start_dt, 4) && (start_dt = '8자리 숫자가 아닙니다.')

	postData = {
		businesses: [
			{
				b_no: b_no,
				p_nm: p_nm,
				start_dt: start_dt
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
			end_dt: result[0].status?.end_dt,
			utcc_yn: result[0].status?.utcc_yn,
		}

	}

	res.render('valid/validApiResult', props)
})

router.post('/valid_multi', upload.single('selectedFile'), async (req, res) => {
	method = 'validate';
	path = url + method + auth;
	postData = {
		businesses: [
		]
	}

	const readingWB = await new Excel.Workbook().xlsx.load(req.file.buffer);
	const readingSheet = readingWB.getWorksheet(1);	//	it gets first sheet

	//	read each row, validate & sanitize to set arguments for api call
	//	if something wrong then save them to feed back to user
	const wrongArgvRowNumberArr = [];
	let emptyRow = 0;
	readingSheet.eachRow((row, rowNumber) => {
		emptyRow++;
		if(rowNumber === 1) return;	//	it refer header column
		//	get net proper arguments after sanitizing and validating
		if(!isValid(row.values[2], 2)
			|| !isValid(row.values[3], 3)
			|| !isValid(row.values[4], 4)
		) wrongArgvRowNumberArr.push(rowNumber)

		//	빈 열은 rowNumber로 카운트 되지 않는다. 
		while(rowNumber !== emptyRow) {
			postData.businesses.push(
				{
					b_no: 'undefined',
					p_nm: 'undefined',
					start_dt: 'undefined',
				}
			)
			wrongArgvRowNumberArr.push(emptyRow++);
		}

		postData.businesses.push(
			{
				b_no:  isEmpty(row.values[2]) ? 'undefined' : String(row.values[2]),
				p_nm:  isEmpty(row.values[3]) ? 'undefined' : String(row.values[3]),
				start_dt: isEmpty(row.values[4]) ? 'undefined' : String(row.values[4]),
			}
		)
	})

	const writingWB = new Excel.Workbook();
	const writingSheet = writingWB.addWorksheet('result');
	//	set header columns
	writingSheet.columns = [
		//	these headers below get data from reading sheet
		{header: 'No.', key: 'number'},
		{header: '사업자 번호', key: 'businessNumber', width: 15, style: {alignment: {horizontal: 'center'}}},
		{header: '대표명', key: 'representative', style: {alignment: {horizontal: 'center'}}},
		{header: '사업 개시일', key: 'startDate', width: 12, style: {alignment: {horizontal: 'center'}}},
		//	these headers below get data from API call
		{header: '진위여부', key: 'valid', style: {alignment: {horizontal: 'center'}}},
		{header: '납세자 상태', key: 'b_stt', width: 12, style: {alignment: {horizontal: 'center'}}},
		{header: '과세 유형', key: 'tax_type', width: 21, style: {alignment: {horizontal: 'center'}}},
		{header: '과세유형 코드', key: 'tax_type_cd', width: 13, style: {alignment: {horizontal: 'center'}}},
		{header: '최근 과세유형 전환 일자', key: 'tax_type_change_dt', width: 22, style: {alignment: {horizontal: 'center'}}},
		{header: '세금계산서 적용일자', key: 'invoice_apply_dt', width: 20, style: {alignment: {horizontal: 'center'}}},
		{header: '폐업일', key: 'end_dt', style: {alignment: {horizontal: 'center'}}},
		{header: '단위과세전환 폐업 여부(Y,N)', key: 'utcc_yn', width: 25, style: {alignment: {horizontal: 'center'}}},
	]

	let result;
	if(postData.businesses.length <= 100) {
		result = await axios.post(path, postData, headerOptions);
		result = result.data.data
	}
	else 	//	API RULE : less than 100 args at a time
	{
		result = [];
		const postDataArray = [];
		//	slice post data
		for(let i = 0; i < postData.businesses.length; i += 100) {
			postDataArray.push(postData.businesses.slice(i, i +100))
		}

		//	async api call and gather results
		for await (const box of postDataArray) {
			postData.businesses = box;
			const apiResult = await axios.post(path, postData, headerOptions);
			result.push(...apiResult.data.data);
		}
	}

	const rows = [];	//	rows that are added into final result file
	readingSheet.eachRow((row, rowNumber) => {
		if(rowNumber === 1) return;	//	it refers header column

		//	from reading sheet
		const newRow = [row.values[0], row.values[1], row.values[2], row.values[3], row.values[4]];
		newRow.shift();	//	remove trash value

		//	from API call
		newRow.push(
			result[rowNumber-2].valid === '01' ? '확인' : '미확인',
			result[rowNumber-2].status?.b_stt,
			result[rowNumber-2].status?.tax_type,
			result[rowNumber-2].status?.tax_type_cd,
			result[rowNumber-2].status?.tax_type_change_dt,
			result[rowNumber-2].status?.invoice_apply_dt,
			result[rowNumber-2].status?.end_dt,
			result[rowNumber-2].status?.utcc_yn,
		)

		rows.push(newRow);
	})

	writingSheet.addRows(rows)

	//	styling to feed back to user what were wrong
	writingSheet.eachRow((row, rowNumber) => {
		if(wrongArgvRowNumberArr.includes(rowNumber))
			for(let i = 2; i<=4; i++) {
				row.getCell(i).fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: {argb:'F08080'},
				}
				row.getCell(i).border = {
					top: {style:'hair', color: {argb: 'd3d3d3'}},
					left: {style:'hair', color: {argb: 'd3d3d3'}},
					bottom: {style:'hair', color: {argb: 'd3d3d3'}},
					right: {style:'hair', color: {argb: 'd3d3d3'}}
				}
			}
	})

	const fileBuffer = await writingWB.xlsx.writeBuffer();
	const readStream = new stream.PassThrough();
	readStream.end(fileBuffer)

	res.set('Content-disposition', 'attachment; filename=' + encodeURI('사업자_진위_여부_조회결과.xlsx'));
	res.set('Content-Type', 'text/plain');

	readStream.pipe(res);
})

router.post('/state_single', async (req, res) => {
	method = 'status';
	path = url + method + auth;
	let {businessNumber_state: b_no} = req.body;

	//	valiate
	!isValid(b_no, 2) && (b_no = '10자리 숫자가 아닙니다.')

	postData = {
		b_no: [
			b_no
		]
	}
	let result = await axios.post(path, postData, headerOptions);

	result = result.data.data
	const props = {
		params: result[0].b_no,
		isRegistered: result[0].tax_type_cd === '' ? result[0].tax_type : '등록 된 사업자입니다.',
		result: {
			b_stt: result[0]?.b_stt,
			tax_type: result[0].tax_type_cd === '' ? '' : result[0]?.tax_type,
			tax_type_cd: result[0]?.tax_type_cd,
			tax_type_change_dt: result[0]?.tax_type_change_dt,
			invoice_apply_dt: result[0]?.invoice_apply_dt,
			end_dt: result[0]?.end_dt,
			utcc_yn: result[0]?.utcc_yn,
		}

	}
	res.render('state/stateApiResult', props)
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
