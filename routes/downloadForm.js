var express = require('express');
const fs = require('fs');

var router = express.Router();

router.post('/', async function(req, res, next) {
	const ExcelJS = require('exceljs');
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet('1');

	switch(req.body.case) {
		case 'valid_multi':

			if(!fs.existsSync('downloadDirectory/사업자_진위_여부_양식.xlsx')) {
				sheet.columns = [
					{header: 'No.', key: 'number'},
					{header: '사업자 번호', key: 'businessNumber', width: 15, style: {alignment: {horizontal: 'center'}}},
					{header: '대표명', key: 'representative', style: {alignment: {horizontal: 'center'}}},
					{header: '사업 개시일', key: 'startDate', width: 12, style: {alignment: {horizontal: 'center'}}},
				]

				sheet.addRow({number: 1, businessNumber: '111223333', representative: '홍길동', startDate: '20230101'})

				await workbook.xlsx.writeFile('downloadDirectory/사업자_진위_여부_양식.xlsx')
			}

			res.download('downloadDirectory/사업자_진위_여부_양식.xlsx');
			break;
		case 'state_multi':
			break;
	}
});

module.exports = router;
