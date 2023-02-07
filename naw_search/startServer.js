//startServer.js
const express = require('express');
const fileUpload = require('express-fileupload');
/*
dont forget to:
npm init

npm install express mariadb
* */
var bodyParser = require('body-parser');
const app = express();
const port = 80;
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(fileUpload());
app.use(jsonParser);
app.use(urlencodedParser);
app.use(express.static('web'));

var mysql = require('mysql2');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'naw_draft5'//, rowsAsArray: true
});
app.sessions = {};
app.schema = [ // tbl.n , n is nickname, a reference to a table using a nickname
	{tblNm: 'documents',n:'doc', ar: 'الكتب', cols: [
			{ n: 'eNumber', ar: 'رقم الآلي', t: 'pk' }
			, {n: 'document_type', ar: 'نوع الكتاب', t: 'e',insertNeedsCol:1
				, e: {en: ['parliamentInquiries', 'complaints', 'suggestions', 'committees']
					, ar: ['اسئلة برلمانية', 'شكوى', 'اقتراحات', 'لجان'] }
				, search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}			// has enumber , no corNum hence ,independent:true
	, {tblNm: 'correspondence',n:'cor', ar: 'تراسل', cols: [
			{ n: 'corNum', ar: 'رقم التراسل', t: 'pk' }
			, { n: 'eNumber', ar: 'رقم الآلي', t: 'fk', fk: 'documents',insertNeedsCol:1 }
			, { n: 'user_id', ar: 'رقم المستعمل', t: 'fk', fk: 'users' ,insertNeedsCol:1}
			, { n: 'DOP', ar: 'تاريخ الكتاب', t: 'date', search: { Var: [1] } ,insertNeedsCol:1}
			, { n: 'Subject', ar: 'موضوع', t: 'txt', search: { Var: [2] } ,insertNeedsCol:1}
			, { n: 'Body', ar: 'نص', t: 'txt', search: { Var: [2] } ,insertNeedsCol:1}
			, {n: 'Status', ar: 'الحالة', t: 'e', e: {
					 en: ['no_res', 'done'],ar: ['لا', 'تم'] }
				, search: { Var: [2] } }
			, { n: 'NOP', ar: 'رقم على الكتاب', t: 'txt', search: { Var: [2] } ,insertNeedsCol:1}
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	// has enumber
	, {tblNm: 'users',n:'usr', ar: 'المستعملين', cols: [
			  { n: 'user_id', ar: 'رقم المستعمل', t: 'pk' }
			, { n: 'username', ar: 'اسم المستخدم', t: 'txt', search: { Var: [2] },insertNeedsCol:1 }
			, { n: 'password', ar: 'كلمةالمرور', t: 'password', search: { omit: 1 } ,insertNeedsCol:1}
			, { n: 'profile', ar: 'بيانات', t: 'json', search: { Var: [2] } }
			, { n: 'employee_role', ar: 'دور', t: 'e',
				e: {ar: ['سكرتاريا', 'موظف', 'رئيس قسم', 'مدير'],
					en: ['secretary', 'employee', 'head of department', 'manager']}
				, search: { Var: [2] }}
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}		//,independent:true no corNum
	, {tblNm: 'committeesname', ar: 'اسامي اللجان', cols: [
			{ n: 'CID', ar: 'رقم اللجنة', t: 'pk' }
			, { n: 'CommitteeName', ar: 'اسم اللجنة', t: 'txt', search: { Var: [2] },insertNeedsCol:1 }
			, { n: 'contactInfo', ar: 'بيانات الاتصال', t: 'json', search: { Var: [2] },insertNeedsCol:1 }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	//,independent:true no corNum
	, {
		tblNm: 'InternalDepts',n:'iid', ar: 'الجهات الداخلية', cols: [
			{ n: 'IID', ar: 'رقم الجهة الداخلية', t: 'pk' }
			, { n: 'Dept_name', ar: 'اسم الجهة الداخلية', t: 'txt', search: { Var: [2] } }
			, { n: 'contactInfo', ar: 'بيانات الاتصال', t: 'json', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	//,independent:true
	, {tblNm: 'representatives',n:'rep', ar: 'نواب', cols: [
			{ n: 'RID', ar: 'رقم نائب', t: 'pk' }
			, { n: 'Representatives_name', ar: 'اسم النائب', t: 'txt', search: { Var: [2] } }
			, { n: 'contactInfo', ar: 'بيانات الاتصال', t: 'json', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}			//,independent:true
	, {
		tblNm: 'ThirdParties',n:'tid', ar: 'جهات خارجية', cols: [
			{ n: 'TID', ar: 'رقم الجهة', t: 'pk' }
			, { n: 'ThirdParty_name', ar: 'رقم الجهة', t: 'txt', search: { Var: [2] } }
			, { n: 'contactInfo', ar: 'بيانات الاتصال', t: 'json', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}		//,independent:true
	, {
		tblNm: 'suggestions', ar: 'مقترحات', notImplemented: 1, cols: [
			{ n: 'SuggestionID', ar: 'رقم المقترح', t: 'pk' }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'RID', ar: 'رقم النائب', t: 'fk', fk: 'representatives' }
			, { n: 'Dept', ar: 'قسم', t: 'e', e: { en: ['office', 'direct'], ar: ['مكتبي', 'مباشر'] }, search: { Var: [2] } }
			, { n: 'Type', ar: 'نوع', t: 'e', e: { en: ['law', 'request'], ar: ['قانوني', 'طلب'] }, search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}
	, {
		tblNm: 'committees', ar: 'لجان', notImplemented: 1, cols: [
			{ n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'CID', ar: 'رقم اللجنة', t: 'fk', fk: 'committeesname' }
			, { n: 'Other', ar: 'اخرى', t: 'txt', search: { Var: [2] } }
			, { n: 'bookNo', ar: 'رقم كتاب', t: 'txt', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}		// no pk, instead corNum
	, {
		tblNm: 'complaints', ar: 'شكاوي', notImplemented: 1, cols: [
			{ n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'ComplaintID', ar: 'رقم الشكوى', t: 'txt', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}		// no pk, instead corNum
	, {tblNm: 'parliamentinquiries',n:'pi', ar: 'اسئلة برلمانية', cols: [
			{ n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence',insertNeedsCol:1 }
			, { n: 'RID', ar: 'رقم نائب', t: 'fk', fk: 'representatives',insertNeedsCol:1 }
			, {n: 'Type', ar: ' نوع', t: 'e', e: { ar: ['دستوري', 'غيردستوري']
					,en: ['con', 'uncon']}//  'constitutional, unconstitutional
				,insertNeedsCol:1, search: { Var: [2] }
			}
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	// no pk, instead corNum
	, {tblNm: 'attachments',n:'att', ar: 'مرفقات', cols: [
			{ n: 'fileID', ar: 'رقم المرفق', t: 'pk' }
			, { n: 'content', ar: 'محتوى المرفق', t: 'longblob', search: { omit: 1 } }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'headers', ar: 'بيانات المرفق', t: 'json', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}		// has corNum
	, {tblNm: 'emailed_cor',n:'ec', ar: 'بريدالكتروني', cols: [
			{ n: 'emailPK', ar: 'رقم بريدالكتروني', t: 'pk' }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'recipients', ar: 'مرسل الليهم', t: 'json', search: { Var: [2] } }
			, { n: 'user_id', ar: 'رقم المستعمل', t: 'fk', fk: 'users' }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	// has corNum
	, {
		tblNm: 'employeehistory', ar: 'تغيرات', cols: [
			{ n: 'ActionID', ar: 'رقم التغير', t: 'pk' }
			, { n: 'user_id', ar: 'رقم المستعمل', t: 'fk', fk: 'users' }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'Action', ar: 'التغير', t: 'txt', search: { Var: [2] } }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	// has corNum
	, {
		tblNm: 'internaldepts_cor',n:'idc', ar: 'تراسل الجهات الداخلية', cols: [
			{ n: 'id', ar: 'رقم ربط', t: 'pk' }
			, { n: 'IID', ar: 'رقم الجهة الداخلية', t: 'fk', fk: 'internaldepts' }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}// has corNum
	, {tblNm: 'thirdparties_cor',n:'tic', ar: 'تراسل جهات خارجية', cols: [
			{ n: 'id', ar: 'رقم ربط', t: 'pk' }
			, { n: 'TID', ar: 'رقم الجهة', t: 'fk', fk: 'thirdparties' }
			, { n: 'corNum', ar: 'رقم التراسل', t: 'fk', fk: 'correspondence' }
			, { n: 'createdAt', ar: 'تاريخ الادخال', t: 'date', search: { Var: [1] } }
			, { n: 'updatedAt', ar: 'تاريخ تحديث', t: 'date', search: { Var: [1] } }]
	}	// has corNum
];
app.schema.forEach(t=>t.n?app.schema[t.n]=t:0);//app.schema.pi=app.schema[10];//app.schema.forEach(t => t.cols.forEach((c, i) => t.ci = app.schema[1].cols[0].n == c.n ? i : -1));
function checkAuth(req, res) {
	let k1 = req.headers.cookie || req.headers.Cookie
		, k2 = k1 && k1.split(';')//,o={},a
		, sid = 0
		, ss = 0;
	k2 && k2.map((v, i) => {
		let a = v.split('=');
		//o[a[0]]=a[1];
		if (a[0].trim() == 'sid') {
			sid = a[1].trim();
			ss = sid && app.sessions && app.sessions[sid];
		}
	})//,sid=o.sid
	if (ss)
		return ss;
	else
		console.log('checkAuth:else:k1=', k1,'k2=',k2,',sid=',sid,'ss=',ss);
	res.status(401);
	return new Error('401 Unauthorized');
}

// -----------------------------------------------------PI FSM Endpoints ------------------------------------------------------------------

// State 1--> server is asked for iidList, tidList, ridList
app.get('/formState1', (req, res) => {
	checkAuth(req, res);
	const r = {}; // {internal: rows[], thirdParties: [...rows], representative: [...rows]}
	const tableNames = ['InternalDepts', 'ThirdParties', 'Representatives'];

	function f(tableNameIndex) {
		//fetch the results from the table in tableNames of index tableNameIndex
		let tn = tableNames[tableNameIndex]; //

		pool.query('SELECT * FROM ' + tn, (err, rows, fields) => {
			if (err) {
				res.status(500);
				res.json(err);
				return;
			}
			r[tn] = rows;

			//console.log(tn, JSON.stringify((r[tn] = rows)));
			if (tableNameIndex + 1 < tableNames.length) {
				f(tableNameIndex + 1);
			} else {
				//console.log('Server response:', JSON.stringify(r))
				res.json(r);
			}
		});
	}
	f(0);
}); // EndPoints: app.get('/'

// State 2--> send input forms to the server, insert into DB, get corNum
app.post('/formState2', (req, res) => {
	const usr=checkAuth(req, res)
	,Doc=app.schema.doc,Cor=app.schema.cor,pi=app.schema.pi
	,docColumnNames = Doc.cols.filter(c=>c.insertNeedsCol).map(c=>c.n)
	, corColumnNames = Cor.cols.filter(c=>c.insertNeedsCol).map(c=>c.n)//['eNumber',	'DOP',	'Subject',	'NOP',	'Body',	'user_id',]
	, piColumnNames = pi.cols.filter(c=>c.insertNeedsCol).map(c=>c.n)//['corNum', 'RID', 'Type']
	, TP_COR_column = ['corNum', 'TID']
	, ID_COR_column = ['corNum', 'IID']
	, f = req.body; //form

	const TP_keys = Object.keys(f.TID);
	const ID_keys = Object.keys(f.IID);

	let docVariables = [Doc.cols[1].e.en[0]];//'parliamentInquiries'
	let corVariables = [0,usr.user.user_id, f.DOP, f.Subject, f.Body , f.NOP];
	let piVariables = [0, f.RID, f.Type]; //0 for corNum(pk)

	let TP_COR_value = [0, f.TID];
	let ID_COR_value = [0, f.IID];

	pool.query(
		'INSERT INTO Documents(`' + docColumnNames.join('`,`') + '`) values (?)',
		docVariables,
		(err, rows, fields) => {
			let eNumber = rows.insertId; //getting eNumber
			corVariables[0] = eNumber;
			if (err) {
				res.status(500);
				res.json({ err: err, code: 1, eNumber });

				return; //the function stops
				//can allocate an enumber but not continue to the following insert into the queries
			}

			pool.query(
				'INSERT INTO Correspondence(`' +
				corColumnNames.join('`,`') +
				"`) values (?, ?,STR_TO_DATE( ?, '%Y-%m-%dT%T.%fZ'),?,?,?)",
				corVariables,
				(err, rows, fields) => {
					if (err) {
						res.status(500);
						res.json({ err: err, code: 2, eNumber });

						return; //the function stops
						//There is an eNumber in doc table. Will have to delete if this is the case
					}

					//rows will have insertedId
					console.log(JSON.stringify(rows));
					let corNum = rows.insertId; //getting corNum
					piVariables[0] = corNum;
					TP_COR_value[0] = corNum;
					ID_COR_value[0] = corNum;

					pool.query(
						'INSERT INTO ParliamentInquiries(`' +
						piColumnNames.join('`,`') +
						'`) values (?,?,?)',
						piVariables,
						(err, rows, fields) => {
							if (err) {
								//There is an eNumber in doc table. Have corNum in Correspondence table. Both primary keys are in play
								res.status(500);
								res.json({ err: err, code: 3, eNumber });
								return;
							}
							console.log(JSON.stringify(rows));
							function InsertThirdParties(index) {
								if (TP_keys.length > index) {
									TP_COR_value[1] = TP_keys[index];
									pool.query(
										'INSERT INTO thirdParties_Cor(`' +
										TP_COR_column.join('`,`') +
										'`) values (?,?)',
										TP_COR_value,
										(err, rows, fields) => {
											if (err) {
												res.status(500);
												res.json({ err: err, code: 3, eNumber });
												return;
											}
											console.log(JSON.stringify(rows));
											InsertThirdParties(index + 1);
										}
									);
								} else {
									InsertInternalDept(0);
								}
							}
							function InsertInternalDept(index) {
								if (ID_keys.length > index) {
									ID_COR_value[1] = ID_keys[index];
									pool.query(
										'INSERT INTO InternalDepts_Cor(`' +
										ID_COR_column.join('`,`') +
										'`) values (?,?)',
										ID_COR_value,
										(err, rows, fields) => {
											if (err) {
												res.status(500);
												res.json({ err: err, code: 3, eNumber });
												return;
											}
											console.log(JSON.stringify(rows));
											InsertInternalDept(index + 1);
										}
									);
								} else {
									res.json({ eNumber, corNum });
								}
							}
							InsertThirdParties(0);
						}
					); //End of INSERT IID_Cor and TID_Cor
				}
			); //End of INSERT COR
		}
	); //End of INSERT DOC
}); // EndPoint

// State 3--> send BLOB to the server, insert into DB
app.post('/state3_upload', //
	(req, res) => {
		checkAuth(req, res)
		console.log('Made it into state3_upload: ', req);
		// const retVal = { message: "test", now: new Date() };
		// res.json(retVal);
		// let sampleFile;
		let uploadPath;
		let corNum = req.body.corNum;

		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).send('No files were uploaded.');
		}

		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let fileCount = req.body.fileCount;
		let asyncCount = fileCount; //doing a countdown
		let fileIds = [];
		for (let i = 0; i < fileCount; i++) {
			attachmentProcessing(req.files['file' + i], i); //might be a bug, if so try   req.files[i]
		}

		// sampleFile = req.files.sampleFile;

		function attachmentProcessing(file, fileIndex) {
			let uploadPath = 'tempUpload/' + file.name; //__dirname + '/somewhere/on/your/server/' + sampleFile.name;
			// Use the mv() method to place the file somewhere on your server
			file.mv(uploadPath, function (err) {
				if (err)
					return res.status(500).send(err);
				const headers = {};
				Object.keys(file).forEach((k) => {
					if (k != 'data') {
						headers[k] = file[k];
					}
				});

				let docVariables = [
					Buffer.from(file.data),
					corNum,
					JSON.stringify(headers),
				];

				pool.query(
					'INSERT INTO Attachments(`content`, `corNum`,`headers`) values (BINARY(?),?,?)',
					docVariables,
					(err, rows, fields) => {
						asyncCount--;
						fileIds[fileIndex] = rows.insertId;
						if (asyncCount == 0) {
							res.json(fileIds);
						}
					}
				);
			});
		}
	}
); // EndPoints: app.get('/'

app.get('/state3_download', //
	(req, res) => {
		checkAuth(req, res)
		console.log('Made it into state3_download: ', JSON.stringify(req, 0, '\t'));
		const retVal = { message: 'test', now: new Date() };
		res.json(retVal);
	}
); // EndPoints

// State 4--> send BLOB to the server, insert into DB
app.post('/formState4', //
	(req, res) => {
		checkAuth(req, res)
		const retVal = { message: 'test', now: new Date() };
		res.json(retVal);
	}
); // EndPoints: app.get('/'

// State 6--> send email to the server, insert into DB
app.get('/formState6', //
	(req, res) => {
		checkAuth(req, res)
		const retVal = { message: 'test', now: new Date() };
		res.json(retVal);
	}
); // EndPoints: app.get('/'



//		---------------		screen:	piEdit		---------------
/*
load all:
	representatives
	thirdparties
	InternalDepts
and-then
load documents.enumber & 1toMany:
	corNum & 1toMany:
		user where users.user_id in cor.user_id
		, parliamentinquiries where pi.corNum in corNumList
		, thirdparties_cor(id) where pi.corNum in corNumList
		, InternalDepts_cors(id & IID) where pi.corNum in corNumList
		, emailed_cor(emailPK) where pi.corNum in corNumList
		, attachments(fileId) where pi.corNum in corNumList

*/
app.get('/loadPiEdit/:enumber', (req, res) => {
	checkAuth(req, res);
	const r = {} ,s=app.schema// {internal: rows[], thirdParties: [...rows], representative: [...rows]}//function tblIndx(tn){let r=-1;tn=tn&&tn.toLowerCase?tn.toLowerCase():tn;app.schema.some((t,i)=>t.tblNm.toLowerCase()==tn?r=i:0)return r;}
		, TableNames = [s.iid,s.tid,s.rep]//'InternalDepts', 'ThirdParties', 'Representatives'
		, CorrManyTbls = [s.pi//tblIndx('parliamentinquiries')
			, s.tic//tblIndx('thirdparties_cor')
			, s.idc//tblIndx( 'InternalDepts_cor')
			, s.ec//tblIndx('emailed_cor')
			, s.att]//tblIndx('attachments')
		, enumber=req.params.enumber;
	function queryCorrToMany(tIx,corNumList) {
		const tb=CorrManyTbls[tIx],tn=tb.tblNm
		,cols=tb.cols.filter(c=>!c.search||!c.search.omit).map(c=>c.n)
		pool.query('SELECT `'+cols.join('`,`')
			+'` FROM `' + tn+'` where `corNum` in (?)',[corNumList]
			, (err, rows, fields) => {
				if (err) {
					//res.status(500);res.json(err);return;
					let a=r[tn] ={err:err};
					a=r.err;if(!a)a=r.err={};
					a[tn]=err;
				}else
				r[tn] = rows;
				if(tIx<CorrManyTbls.length-1)
					queryCorrToMany(tIx+1,corNumList);
				else{console.log('/loadPiEdit/:enumber(',enumber,'):response:',JSON.stringify(r))
					res.json(r);}
			})}
	function queryCorrsUsers(corrs) {
		const Usr=app.schema.usr //[2]
			,tn=Usr.tblNm
			,cols=Usr.cols.filter(c=>!c.search||!c.search.omit).map(c=>c.n)
			,corNumList=corrs.map(row=>row.corNum)
			,usrList=corrs.map(row=>row[Usr.cols[0].n])
			,sql='SELECT `'+cols.join('`,`') +'` FROM `' + tn+'` where `'+Usr.cols[0].n+'` in (?)'
		pool.query(sql,[usrList]
			, (err, rows, fields) => {
				if (err) {
					//res.status(500);res.json(err);return;
					let a=r[tn] ={err:err};
					a=r.err;if(!a)a=r.err={};
					a[tn]=err;
				}else
				r[tn] = rows;
				queryCorrToMany(0,corNumList)
			});}
	function queryCorrs() {
		const Corr=app.schema.cor//[1]
			,Enum=Corr.cols[1]
			,tn=Corr.tblNm
		pool.query('SELECT * FROM `' + tn+'` where `'+Enum.n+'`=?'
			,[enumber], (err, rows, fields) => {
				if (err) {
					//res.status(500);res.json(err);return;
					let a=r[tn] ={err:err};
					a=r.err;if(!a)a=r.err={};
					a[tn]=err;
				}else r[tn] = rows
				queryCorrsUsers(rows||[])
			})
	}
	function queryDoc() {
		const Doc=app.schema.doc//[0]
			,Enum=Doc.cols[0]
			,tn=Doc.tblNm
		pool.query('SELECT * FROM ' + tn+' where `'+Enum.n+'`=?',[enumber], (err, rows, fields) => {
			if (err) {
				//res.status(500);res.json(err);return;
				let a=r[tn] ={err:err};
				a=r.err;if(!a)a=r.err={};
				a[tn]=err;
			}else
			r[tn] = rows;
			queryCorrs()
		});
	}
	function query(tableNameIndex) {
		const tbl = TableNames[tableNameIndex],tn=tbl.tblNm
		pool.query('SELECT * FROM ' + tn, (err, rows, fields) => {
			if (err) {
				//res.status(500);res.json(err);return;
				let a=r[tn] ={err:err};
				a=r.err;if(!a)a=r.err={};
				a[tn]=err;
			}else
			r[tn] = rows;

			//console.log(tn, JSON.stringify((r[tn] = rows)));
			if (tableNameIndex + 1 < TableNames.length)
				query(tableNameIndex + 1);
			else
				queryDoc()
		})	}
	query(0);
}); // EndPoints: app.get('/'


//		---------------		screen:	login		---------------
app.post('/login',(req, res) =>
		pool.query('SELECT * FROM users where `username`=? and `password`=password(?)'
			, [req.body.username, req.body.password]
			, (err, rows, fields) => {
				//console.log('login:v2022.10.06 ')
				if (err || !rows.length) {
					res.status(err ? 500 : 400);
					res.json(err);
					console.log('login:error');
					return;
				}
				let r = { user: rows[0], sid: new Date().getTime() ,schema:app.schema};
				while (app.sessions[r.sid])
					r.sid = new Date().getTime();
				app.sessions[r.sid] = r;
				console.log('login:sid=',r.sid);
				res.set('Set-Cookie', 'sid=' + r.sid);//res.cookie('sid',r.sid);//console.log('Server response:', JSON.stringify(r))
				res.json(r);
			})
); // EndPoints: app.get('/login'

app.all('/logout', (req, res) =>
	{let ss=checkAuth(req, res);
		if(ss && app.sessions[ss.sid])
			delete app.sessions[ss.sid];
		res.redirect('/');});


//		---------------		screen:	search		---------------
app.post('/search',
	(req, res) => {
		checkAuth(req,res); //MOHE-Domain\DevTemp@Mohe
		let t = req.body.to
			, f = req.body.from
			, p = (err, rows, fields) => {
			console.log('/search : query-callback:', f, t, err, rows);
			if (err) {
				//res.status(err?500:400);
				res.json({ err });
				return;
			}
			res.json({ rows, fields })
		}//, m =
		console.log('/search :sql:f=', f,' ,t=', t);
		pool.query('SELECT * FROM correspondence where (DOP>=? and DOP<=?) or'
			+ ' (createdAt>=? and createdAt<=?) or (updatedAt>=? and updatedAt<=?) '
			, [f, t, f, t, f, t], p)
	}); // EndPoint: app.all('/search'

console.log('startServer:v2022.10.07,19')

app.listen(port, () => {
	console.log(
		`branch(October2022): express-app listening at http://localhost:${port}`
	)});
