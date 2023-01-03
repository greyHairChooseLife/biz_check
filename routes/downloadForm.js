var express = require('express');
const stream = require('stream');
const fs = require('fs');

var router = express.Router();

router.post('/', async function(req, res, next) {
	const ExcelJS = require('exceljs');
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet('1');

	switch(req.body.case) {
		case 'valid_multi':

			//	make file buffer
			let fileBuffer;
			sheet.columns = [
				{header: 'No.', key: 'number'},
				{header: '사업자 번호', key: 'businessNumber', width: 15, style: {alignment: {horizontal: 'center'}}},
				{header: '대표명', key: 'representative', style: {alignment: {horizontal: 'center'}}},
				{header: '사업 개시일', key: 'startDate', width: 12, style: {alignment: {horizontal: 'center'}}},
			]
			sheet.addRow({number: 1, businessNumber: '111223333', representative: '홍길동', startDate: '20230101'})
			fileBuffer = await workbook.xlsx.writeBuffer();

			const readStream = new stream.PassThrough();
			readStream.end(fileBuffer)

			res.set('Content-disposition', 'attachment; filename=' + '사업자_진위_여부_양식.xlsx');
			res.set('Content-Type', 'text/plain');

			readStream.pipe(res);
			break;
		case 'state_multi':
			break;
	}
});

module.exports = router;
