app= angular.module("myApp",['ui.router'])

app.service('dbService',function($http) {
	let t = this;
	if (app.db == t){
		//app.db = t;  // a hack for debugging purposes only
		return t;
	}
	console.log()
	app.db=t;//t=app.db;
	t.save = function (prm1, prm2) {
		// maybe call $http.post(,,,)
	}

	t.load = function (prm1, prm2) {
		// maybe call $http.get(,,,)
	}
	t.checkAuth=function checkAuth() { // p::= $scope
		let ss = t.user
		if (ss)
			return ss;
		let k1 = localStorage.user
		ss = JSON.parse(k1)
		if (ss && ss.sid){
			if(!t.schema) {
				let s=t.schema = ss.schema;//schema is the same as is in the server
				s.forEach(t=>t.n?s[t.n]=t:0)//,doc,cor,usr ,iid,rep ,tid ,pi
				/*2022-11-5
fetched from server
serverApp.schema = [ // tbl.n , n is nickname, a reference to a table using a nickname
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
			, { n: 'NOP', ar: 'رقم على الكتاب', t: 'txt', search: { Var: [2] } }
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


				*/
			}
			return t.user = ss;}
		location.href = '/';
		throw Exception('401 Unauthorized');
	}
	t.logout=function checkAuth() { // p::= $scope
		localStorage.user=0;
		t.schema=0//if(t.user)
		t.user=0
		location.href = '/';}

return t;})

app.config(function($stateProvider) {// https://ui-router.github.io/ng1/tutorial/helloworld ,
	$stateProvider.state( {
		name: 'search', // just lists all the entries in the db-table "Internals"
		url: '/search/',
		templateUrl: 'templates/search.html',
		controller: searchController
	});

	$stateProvider.state( {
		name: 'pi',
		url: '/pi/', // :docId
		templateUrl: 'templates/pi.html',
		controller: piController
	});
	$stateProvider.state( {
		name: 'piEdit',
		url: '/piEdit/:eNumber', //
		templateUrl: 'templates/piEdit.html',
		controller: piEditController
	});

	$stateProvider.state( {
		name: 'complaints', // just lists all the entries in the db-table "Internals"
		url: '/complaints/',
		templateUrl: 'templates/complaints.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	$stateProvider.state( {
		name: 'suggestions', // just lists all the entries in the db-table "Internals"
		url: '/suggestions/',
		templateUrl: 'templates/suggestions.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	$stateProvider.state( {
		name: 'committees', // just lists all the entries in the db-table "Internals"
		url: '/committees/',
		templateUrl: 'templates/committees.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	$stateProvider.state( {
		name: 'recentHistory', // just lists all the entries in the db-table "Internals"
		url: '/recentHistory/',
		templateUrl: 'templates/recentHistory.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	$stateProvider.state( {
		name: 'requestsScreen', // just lists all the entries in the db-table "Internals"
		url: '/requestsScreen/',
		templateUrl: 'templates/requestsScreen.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	$stateProvider.state( {
		name: 'adminScreen', // just lists all the entries in the db-table "Internals"
		url: '/adminScreen/',
		templateUrl: 'templates/adminScreen.html',
		controller: function ($scope, dbService) {
			$scope.db = dbService;
		}
	});

	/*
		1	  login
		2	  search
		3	  pi
		4	  complaints
		5	  suggestions
		6	  committees
		7	  recentHistory
		8	requestsScreen
		9	adminScreen
	* */
})

app.controller('mainCntrolr',function($scope,$http,dbService){
	//localStorage.login=0;
	console.log('mainCntrolr:ls-login invalidated successfully');
	$scope.onclickLogout = function(){
		$http.get('/logout/');
		console.log('mainCntrolr:logout')
		dbService.logout();//location.href='/'
	}
})

