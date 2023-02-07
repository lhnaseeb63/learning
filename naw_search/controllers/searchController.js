function searchController($scope, $http, dbService, formFrontEndService, checkboxSelectedService) {
	/*function checkAuth() {
		let ss = $scope.user
		if (ss)
			return ss;
		let k1 = localStorage.user
		ss = JSON.parse(k1)
		if (ss && ss.sid){
			if(!$scope.schema)
				app.schema=$scope.schema=ss.schema;
			return $scope.user = ss;}
		location.href = '/';
		throw Exception('401 Unauthorized');
	}*/
	console.log('searchController')
	$scope.db = dbService;
	dbService.checkAuth();
	let t=$scope.t=dbService.schema.cor.cols;
	$scope.ta=[
		[t[1],t[1].n,t[1].ar],
		[t[0],t[0].n,t[0].ar],
		[t[3],t[3].n,t[3].ar],
		[t[4],t[4].n,t[4].ar],
		[t[5],t[5].n,t[5].ar],
		[t[6],t[6].n,t[6].ar],
		[t[7],t[7].n,t[7].ar],
		[t[8],t[8].n,t[8].ar],
		[t[9],t[9].n,t[9].ar],
	];

	$scope.now = new Date();

	debugScope = $scope;

	

	// -------------------------------------------------------------------------------------- Mr. B's code

	// if(!app.searchPrms)
	// 	app.searchPrms={
	// 		enumber: '', corNum: ''
	// 		, txt: '', from: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 3)
	// 		, to: new Date(), corStts: '', piType: ''
	// 		, modeT: 2
	// 	}
	// $scope.prms = app.searchPrms;

	// $scope.PeriodCat = [
	// 	{
	// 		ttl: 'ايام'
	// 		, t: 'day'
	// 	}
	// 	, {
	// 		ttl: 'اسابيع'
	// 		, t: 'week'
	// 	}
	// 	, {
	// 		ttl: 'اشهر'
	// 		, t: 'month'
	// 	}

	// ];

	// /*
	// mode:
	//   1.single var for all dbColumns
	//   2.multi var:						implement

	// * var 1: time(3modes: no-check , recent, period )
	//   c1mode(3bitFlag)
	//    naw_draft5.correspondence.DOP
	//    naw_draft5.correspondence.createdAt
	//    naw_draft5.correspondence.updatedAt

	// * var 2: employee ( 2bitFlag)
	// 	naw_draft5.employeehistory.user_id
	// 	naw_draft5.users.profile
	// 	var 3 :  naw_draft5.users.employee_role (3modes: no-check, useVar2, use var3)

	// * correspondence
	// 	var 4: naw_draft5.correspondence.NOP (3modes: no-check, useVar2, use var4)

	// * var 5: (2bitFlag) (3modes: no-check, useVar2, use var5)
	// 	naw_draft5.correspondence.corNum
	// 	naw_draft5.correspondence.eNumber

	// * var 6: (2bitFlag) (3modes: no-check , useVar2 , use var6)
	// 	naw_draft5.correspondence.Subject
	// 	naw_draft5.correspondence.Body

	// * var 7: (3modes: no-check , userVar2, user var 7)
	// 	naw_draft5.correspondence.Status

	// * var 8:(3bitFlag) (3modes: no-check , userVar2, user var 8) naw_draft5.parliamentinquiries.rid
	// 	naw_draft5.parliamentinquiries.Type var9
	// 	naw_draft5.representatives.Representatives_name
	// 	naw_draft5.representatives.contactInfo

	// * (3modes: no-check , userVar2, user var 10)
	// 	naw_draft5.attachments.headers

	// * internaldepts_cor (2bitFlag)
	// 	naw_draft5.internaldepts.Dept_name (3modes: no-check , userVar2, user var 11)
	// 	naw_draft5.internaldepts.contactInfo (3modes: no-check , userVar2, user var 12)

	// * thirdparties_cor (2bitFlag)
	// 	naw_draft5.thirdparties.ThirdParty_name (3modes: no-check , userVar2, user var 13)
	// 	naw_draft5.thirdparties.contactInfo (3modes: no-check , userVar2, user var 14)

	// * naw_draft5.emailed_cor.recipients (3modes: no-check , userVar2, user var 15)

	// * 24 columns
	// * */

	// $scope.trimDate = function (d) {
	// 	if(d && typeof(d)!='string' && d.toString)
	// 		d=d.toString();
	// 	let t=d&& d.indexOf && d.indexOf('T')
	// 	//console.log('searchController:trimDate:T-index=',t,'str=',d)
	// 	if(t>-1)
	// 		d=d.substring(0,t);
	// 	return d;}

	// $scope.newSearch = function () {
	// 	if ($scope.newSearch.active)
	// 		return; dbService.checkAuth();
	// 	$scope.newSearch.active = true;
	// 	$scope.searchResult = 0;
	// 	let s = function respns(serverResponse) {
	// 		console.log('newSearch:respns', serverResponse);
	// 		$scope.serverResponse = serverResponse && serverResponse.data;
	// 		$scope.searchResult = $scope.serverResponse && $scope.serverResponse.rows;
	// 		$scope.newSearch.active = 0;
	// 	}
	// 	, e = function errRespns(serverResponse) {
	// 		console.log('newSearch:then:err:', serverResponse);
	// 		$scope.newSearch.active = 0;}
	// 	, f = () =>
	// 		console.log('newSearch:finally');
	// 	$http.post('/search', $scope.prms)
	// 		.then(s, e)  //.success(s).error(e)
	// 		.finally(f)
	// }

} // END OF CONTROLLER **************
