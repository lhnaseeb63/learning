function piEditController($scope, $http, dbService, multipartForm
	, formFrontEndService, checkboxSelectedService , $stateParams) {
	/*function checkAuth(){
		let ss=$scope.user
		if(ss)
			return ss;
		let k1=localStorage.user
		ss=JSON.parse(k1)
		if(ss && ss.sid )
			return $scope.user=ss;
		location.href='/';
		throw Exception('401 Unauthorized');
	}*/
	$scope.saveClicked = 0;//$scope.eNumber=
	const eNumber= $stateParams.eNumber
	,S=($scope.db = dbService).schema
	,now=$scope.now = new Date()
	,nowStr =now.toString()	,dbgDefVal = ''
	,F=$scope.form = {
		// table: naw_draft3.documents columns
		eNumber: eNumber, // 'waiting for server' // the val comes from the server
		document_type: 'parliamentInquiries', // enum('questions', 'complaints', 'suggestions', 'committees') default 'questions'
		DOP: dbgDefVal,
		date_reply: dbgDefVal,
		employee: 'N/A', // the login screen has to be implemented so that we can fill this property(employee)
		Subject: dbgDefVal,
		Body: dbgDefVal,
		Status: 'no_res', //  enum('no_res', 'done') default 'no_res' not null
		IID: {}, //array of primary keys of the user multi-selection stored in the many-to-many relation db table internalDepts_Documents
		TID: {}, //array of primary keys of the user multi-selection stored in the many-to-many relation db table thirdParties_Documents
		NOP: dbgDefVal,
		createdAt: nowStr,
		updatedAt: nowStr,

		// table:naw_draft3.parliamentInquiries  columns
		//,eNumber		:dbgDefVal
		RID: dbgDefVal,
		Type: dbgDefVal, // Type enum('con', 'uncon') default 'uncon' null

		pi_createdAt: nowStr,
		pi_updatedAt: nowStr,

		// TODO: fetch arrays of drop-down lists for ng-options/ng-repeat(radioButtons): iid , tid , status , rid , type

		/*
	we should recieve from the server
		iid list
		&
		tid list
		&
		a new "eNumber"
			   */
	}
	;
	function clearInputFields() {
		Object.assign(F,JSON.parse(formDefaults))//$scope.form = ;
		F.eNumber = eNumber;
	}
	function dbTables_toForm(d){//d=$scope.data dbTables=$scope.data
		/*
prm:{
<str:TblName>:[//rows
	{<str:colName>:<val> ,,, }
	,,,
	]
,,,
} //end of tables obj

returns <object:form>= {
  eNumber: "waiting for server",
  document_type: "questions",
  DOP: 0,
  date_reply: dbgDefVal,
  employee: "N/A",
  Subject: dbgDefVal,
  Body: dbgDefVal,
  Status: "no_res",
  IID: dbgDefVal,
  TID: dbgDefVal,
  NOP: dbgDefVal,
  createdAt: nowStr,
  updatedAt: nowStr,

  RID: dbgDefVal,
  Type: dbgDefVal,

  pi_createdAt: nowStr,
  pi_updatedAt: nowStr,

};


// dbTables(example)::=
{"InternalDepts":
 	[{"IID":2,"Dept_name":"الوكيل المساعد للشئون الادارية و المالية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":3,"Dept_name":"الوكيل المساعد للشئون القانونية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":4,"Dept_name":"الوكيل المساعد للشئون البعثات و المعادلات و العلاقات الثقافية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":5,"Dept_name":"مدير مكتب الوزير ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":6,"Dept_name":"مكتب وكيل الوزارة","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":7,"Dept_name":"ادارة العلاقات الثقافية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":8,"Dept_name":"ادارة البعثات ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":9,"Dept_name":"الدارة مركز نظم المعلومات ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":10,"Dept_name":"ادارة التخطيط و البحوث","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":11,"Dept_name":"ادارة التطوير الاداري و التدريب","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":12,"Dept_name":"ادارة القضايا و التحقيقات","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":13,"Dept_name":"ادارة الراي و البحوث القانونية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":14,"Dept_name":"ادارة المكاتب الثقافية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":15,"Dept_name":"ادارة العلاقات العامة و خدمة المواطن","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":16,"Dept_name":"ادارة الشئون الادارية ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":17,"Dept_name":"ادارة الشئون المالية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":18,"Dept_name":"ادارة معادلة الشهادات العلمية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"IID":19,"Dept_name":"مدير المكتب الفني","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	]
,"ThirdParties":
	[{"TID":1,"ThirdParty_name":"مجلس الجامعات الخاصة","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":2,"ThirdParty_name":"الجهاز الوطني للاعتماد الاكاديمي و ضمان جودة التعليم","contactInfo":null
		,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":3,"ThirdParty_name":"الهيئة العامة للتعليم التطبيقي و التدريب ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":4,"ThirdParty_name":"معهد الكويت للأبحاث العلمية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":5,"ThirdParty_name":"وزارة التربية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":6,"ThirdParty_name":"جامعة الكويت","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":7,"ThirdParty_name":"مجلس الأمة ","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":8,"ThirdParty_name":"المعهد العالي للفنون المسرحية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":9,"ThirdParty_name":"مكتب وزير الدولة لشئون مجلس الأمة","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"TID":10,"ThirdParty_name":"المعهد العالي للفنون الموسيقية","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	]
,"Representatives":
	[{"RID":1,"Representatives_name":"بدر","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"RID":2,"Representatives_name":"محمد","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"RID":3,"Representatives_name":"سعد","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"RID":4,"Representatives_name":"عبدالله","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	,{"RID":5,"Representatives_name":"حامد","contactInfo":null,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}
	]
,"documents":[{"eNumber":3,"document_type":"parliamentInquiries","createdAt":"2022-10-21T08:23:21.000Z","updatedAt":"2022-10-21T08:23:21.000Z"}]
,"correspondence":[{"corNum":2,"eNumber":3,"user_id":1,"DOP":"2022-10-20T18:00:00.000Z","Subject":"ok","Body":"no","Status":"no_res","NOP":"55"
	,"createdAt":"2022-10-21T08:23:21.000Z","updatedAt":"2022-10-21T08:23:21.000Z"}]
,"users":[{"user_id":1,"username":"HPotter","profile":"{}","employee_role":"head of department"
	,"createdAt":"2022-10-05T15:34:55.000Z","updatedAt":"2022-10-05T15:34:55.000Z"}]
,"parliamentinquiries":[{"corNum":2,"RID":1,"Type":"con","createdAt":"2022-10-21T08:23:21.000Z","updatedAt":"2022-10-21T08:23:21.000Z"}]
,"thirdparties_cor":[{"id":2,"TID":2,"corNum":2,"createdAt":"2022-10-21T08:23:21.000Z","updatedAt":"2022-10-21T08:23:21.000Z"}]
,"internaldepts_cor":[{"id":2,"IID":3,"corNum":2,"createdAt":"2022-10-21T08:23:21.000Z","updatedAt":"2022-10-21T08:23:21.000Z"}]
,"emailed_cor":[]
,"attachments":[]
}
		*/
		const Cor=S.cor
		,corRows=d[Cor.tblNm]
		,row=corRows[0] // TODO: need to implement multi-correspondence
		,piRow=d[S.pi.tblNm].filter(row=>row.corNum==row.corNum)[0] //,V='checked'; //S.pi.cols.forEach(c=>F[c.n]=c.t=='date'?new Date(piRow[c.n]):piRow[c.n])
		F.RID =$scope.rid=piRow.RID //.toString();
		$scope.onChngRid();
		F.Type=piRow.Type;
		Cor.cols.forEach(c=>F[c.n]=c.t=='date'?new Date(row[c.n]):row[c.n])
		F.IID={}; //F.eNumber=d[S[0].tblNm][0][S[0].cols[0].n]
		d[S.idc.tblNm].forEach(row=>F.IID[row.IID]=true)
		F.TID={};
		d[S.tic.tblNm].forEach(row=>F.TID[row.TID]=true)
		//$scope.attachments=[] // $scope.icons4Attachments array
		d[S.att.tblNm].forEach(row=>$scope.icons4Attachments.push([
			(row&&row.headers &&(row.headers.filename||row.headers.name))||' - '
			,'-' ]))
console.log('piEditController:dbTables_toForm:form=',F,' ,schema=',S,' ,data=',d)
		/*setTimeout(()=>{
			console.log('RID:timeout 1/3:rid='
				,$scope.rid,' , F.RID=',F.RID,' , d[S.pi.tblNm].RID=',d[S.pi.tblNm].RID)
			$scope.rid=d.representatives[0].RID;
			setTimeout(()=>{
				console.log('RID:timeout 2/3:rid='
					,$scope.rid,' , F.RID=',F.RID,' , d[S.pi.tblNm].RID=',d[S.pi.tblNm].RID)
				$scope.rid=d.representatives[d.representatives.length-1].RID;
				setTimeout(()=>{
					console.log('RID:timeout 3/3:rid='
						,$scope.rid,' , F.RID=',F.RID,' , d[S.pi.tblNm].RID=',d[S.pi.tblNm].RID)
					$scope.rid=d[S.pi.tblNm].RID;
					$scope. $apply();
					console.log('RID:timeout 3/3: after :rid='
						,$scope.rid,' , F.RID=',F.RID,' , d[S.pi.tblNm].RID=',d[S.pi.tblNm].RID)
				},3000)
			},3000)
		},3000)
		//$scope.testRid=function(delta){$scope.rid=(parseInt($scope.rid)+delta;}*/
		function getSelect(ngModel){
			const a=document.getElementsByTagName('SELECT')
			let s=0
			for(let i=0,t;!s&&i<a.length;i++){t=a[i];
				for(let j=0,b=t.attributes,c;!s&&j<b.length;j++) {
					c=b[j];
					if(c.name=='ng-model'&&c.value==ngModel)
						s=t;}}
			return s;}
		function select(s,val){
			const a=s.options
				,iv=parseInt(val)
				,sv=val&&val.toString&&val.toString();
			for(let i=0; i<a.length ; i++ ) {
				let o=a[i]
				,v=o&&o.value
				,b= v==val;
				if(!b)
					b=parseFloat(v)==iv;
				if(!b)
					v.toString()==sv
				if( b )
					return o.selected=true;
			}
		}

		function doSelect(){
			let s=getSelect('rid');
			select( s,piRow.RID );
			$scope. $apply();}

		setTimeout(()=> {
			console.log('RID:timeout :rid='
				, $scope.rid, ' , F.RID=', F.RID, ' , d[S.pi.tblNm].RID=', piRow.RID)
			doSelect();
		},3000)
		let s=getSelect('rid')
		, r=F.RID =$scope.rid = parseInt(piRow.RID)
		d=$scope.data[S.rep.tblNm]
		$scope.ridIx=d.findIndex(row=>row.RID==r);
		s.value=d[$scope.ridIx].Representatives_name;
		doSelect()
	} // function dbTables_toForm(dbTables)

	const FSM = {
		state_1_getLists: {
			onEnterState: function (args) {dbService.checkAuth();
				// event handler actions list
				//debugger;
				console.log('piEditController.js:FSM:State 1: OnEnterState:');// Begin start something to designate this ugh wow
				$scope.currentState = FSM.state_1_getLists;
				$scope.disabledFlags = this.flags;
				$scope.saveClicked = 0;
				//$scope.$digest();
				$scope.flagLoading = true;
				//implement the orange arrow: ask server for new enumber, iidList, tidList, ridList
				$http.get('/loadPiEdit/'+eNumber) // TODO: give the endpoint a better name
					//returns a promise,
					.then(FSM.state_1_getLists.transitions.onServerResponse);
			},
			transitions: {
				onServerResponse: function doAction(res) {dbService.checkAuth();
					//TODO: check is not successful, if so ,ummmmmm
					//check is successful, if so , transition to state1_1
					console.log('state_1_getLists: Endpoint from State 1 responds', res);
					dbTables_toForm($scope.data = res.data)
					$scope.flagLoading = false;
					FSM.state_1_1_getListsSuccess.onEnterState();
				},
			},
			flags: {
				inputs: 1,
				delete: 1,
				edit: 1,
				save: 1,
				send: 1,
				attach: 1,
				upload: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 1_1
		state_1_1_getListsSuccess: {
			onEnterState: function (args) {
				dbService.checkAuth();
				console.log('piEditController.js:FSM:State 1_1: OnEnterState');

				// event handler actions list
				$scope.currentState = FSM.state_1_1_getListsSuccess;
				formFrontEndService.makeActiveLabelsBold();
				formFrontEndService.adjustNotesFieldHeight();
				formFrontEndService.adjustAttachBoxDimensions();
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
				clearInputFields();
				FSM.state_2_EnDNE.onEnterState();
			},
			transitions: {}, //don't call server, so don't need server response.
			//Also transition to state 2 on entering state 1_1 and completing tasks
			//Empty but keeping for consistency
			flags: {
				//could delete this too but keeping for consistency
				//state transitions too quickly to actually matter
				inputs: 1,
				delete: 1,
				edit: 1,
				save: 1,
				send: 1,
				attach: 1,
				upload: 1,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 2 EnDNE
		state_2_EnDNE: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 2 EnDNE: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_2_EnDNE;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			transitions: {
				save: function doAction() {dbService.checkAuth();
					console.log('Inside state_2_EnDNE Save function');
					$scope.saveClicked++;
					function filterInvalidColumns() {
						const formDefaults_ = JSON.parse(formDefaults);
						console.log('formDefaults is now an object');
						const formDefaults_Condensed = ['DOP', 'RID', 'Subject', 'NOP', 'Type', 'IID', 'TID', 'Body'];
						return formDefaults_Condensed.filter((property) => {
							return formDefaults_[property] === F[property];
						});
					}
					let debugInvalidCol = filterInvalidColumns();
					if (debugInvalidCol.length === 0) {
						FSM.state_2_RequestingeNumber.onEnterState();
						debugInvalidCol.forEach((field) => console.log(field));
					} else {
						console.log('Form is not valid');
						const guiFields = {
							DOP: 'تاريخ السؤال',
							RID: 'اسم عضو مجلس الأمة',
							Subject: 'نص السؤال',
							NOP: 'رقم السؤال',
							Type: 'النوع',
							IID: 'الجهات الداخلية',
							TID: 'الجهات الخارجية',
							Body: 'الملاحظات',
						};

						alert('رجاءً إملاء الخانات قبل الحفظ:' + '\n' + debugInvalidCol.map((i) => guiFields[i]).join('\n'));
					}
				},
			},
			flags: {
				//1 --> disabled, 0 --> enabled
				inputs: 0,
				delete: 0,
				edit: 1,
				save: 0,
				send: 1,
				attach: 1,
				upload: 1,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 2_RequestingeNumber
		state_2_RequestingeNumber: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 2_RequestingeNumber: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_2_RequestingeNumber;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
				$scope.flagLoading = true;

				$http //passing $scope.form as a reference
					.post('/formState2/', F) // TODO: give the endpoint a better name
					//returns a promise,
					.then(FSM.state_2_RequestingeNumber.transitions.onServerResponse);
			},
			transitions: {
				onServerResponse: function doAction(serverResponse) {dbService.checkAuth();
					console.log('Inside onServerResponse of state_2_RequestingeNumber', serverResponse);
					let O = serverResponse.data;
					F.eNumber = O.eNumber;
					F.corNum = O.corNum;
					$scope.flagLoading = false;
					FSM.state_2_userInput.onEnterState();
				},
			},
			flags: {
				inputs: true,
				delete: 0,
				edit: 0,
				save: 0,
				send: 0,
				attach: 1,
				upload: 1,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 2
		state_2_userInput: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM: state_2_userInput: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_2_userInput;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			flags: {
				inputs: 0,
				delete: 0,
				edit: 1,
				save: 0,
				send: 1,
				attach: 0,
				upload: 0,
				print: 1,
			},
			transitions: {
				save: function doAction() {dbService.checkAuth();
					FSM.state_4_savingForm.onEnterState();
				},
				delete: function doAction() {
					clearInputFields();
				},
				attach: function doAction() {dbService.checkAuth();
					FSM.state_3_pendingUpload.onEnterState();
				},
			}, // transitions
		},
		//-------------------------------------------------------------------------------- State 3
		state_3_pendingUpload: {
			onEnterState: function (args) {
				console.log('piEditController.js:FSM:State 3: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_3_pendingUpload;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
				$scope.icons4Attachments = [];

				var uploadUrl = '/state3_upload';
				multipartForm.post(uploadUrl, $scope.uploadFiles, F.corNum).then(() => FSM.state_2_userInput.onEnterState());
				for (let i = 0; i < $scope.uploadFiles.length; i++) {
					$scope.icons4Attachments.push([$scope.uploadFiles[i].name, $scope.uploadFiles[i]]);
				}
			},
			transitions: {
				onServerResponse: function doAction() {
					//$scope.state=FSM.state ?;$scope.state.onEnterState();
					console.log('piEditController:FSM.state_3_pendingUpload:transition:onServerResponse:')
				},
			},
			flags: {
				inputs: true,
				delete: 0,
				edit: 0,
				save: 0,
				send: 0,
				attach: 0,
				upload: 0,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 4
		state_4_savingForm: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 4: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_4_savingForm;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			transitions: {
				onServerResponse: function doAction() {dbService.checkAuth();
					//$scope.state=FSM.state ?;$scope.state.onEnterState();
				},
			},
			flags: {
				inputs: 0,
				delete: 0,
				edit: 0,
				save: 0,
				send: 0,
				attach: 0,
				upload: 1,
				upload: 0,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 5
		state_5_formSaved: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 5: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_5_formSaved;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			transitions: {
				onServerResponse: function doAction() {dbService.checkAuth();
					//$scope.state=FSM.state ?;$scope.state.onEnterState();
				},
			},
			flags: {
				inputs: 0,
				delete: 0,
				edit: true,
				save: 0,
				send: true,
				attach: 0,
				upload: 0,
				print: 1,
			},
		},
		//-------------------------------------------------------------------------------- State 6
		state_6_emailConfirmation: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 6: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_6_emailConfirmation;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			transitions: {
				onServerResponse: function doAction() {dbService.checkAuth();
					//$scope.state=FSM.state ?;$scope.state.onEnterState();
				},
			},
			flags: {
				inputs: 0,
				delete: 0,
				edit: 0,
				save: 0,
				send: 0,
				attach: 0,
				upload: 0,
				print: 1,
			}, //Change flags for state 6
		},
		//-------------------------------------------------------------------------------- State 7
		state_7_finalForm: {
			onEnterState: function (args) {dbService.checkAuth();
				console.log('piEditController.js:FSM:State 7: OnEnterState');
				// event handler actions list
				$scope.currentState = FSM.state_7_finalForm;
				$scope.disabledFlags = this.flags;
				formFrontEndService.disabledStyling($scope.disabledFlags);
			},
			flags: {
				inputs: 1,
				delete: 1,
				edit: 1,
				save: 1,
				send: true,
				attach: 1,
				upload: 1,
				print: 0,
			}, //Change flags for state 7
			transitions: {
				save: function doAction() {dbService.checkAuth();
					$scope.currentState = FSM.state_4_savingForm;
					$scope.state.onEnterState(); //state whatever
				},
				//,delete : doAction
				//,attach : doAction
			}, // transitions
		},
	}; //FSM
	dbService.checkAuth();
	FSM.state_1_getLists.onEnterState();

	$scope.onChngRid=function onChngRid(){
		const r=F.RID =$scope.rid = parseInt($scope.rid)
		,d=$scope.data[S.rep.tblNm]
		$scope.ridIx=d.findIndex(row=>row.RID==r);
	}

	$scope.SubmitFileUpload = function () {
		FSM.state_3_pendingUpload.onEnterState();
	};

	$scope.getIconPath = function (contentType, arg2) {
		const type1 = {
			'application/pdf': 'pdf',
			'application/docx': 'doc',
			'application/doc': 'doc',
			'application/xlsx': 'xlsx',
			'application/ppt': 'ppt',
			'application/rar': 'rar',
			'application/zip': 'zip',
			'text/plain': 'txt',
			// 'image/jpg':'jpg',
			// 'image/jpeg':'jpg',
			// 'image/gif':'jpg',
			// 'image/png':'jpg',
		};
		const type2 = {
			application: 'doc',
			// audio: 'unknown',
			// font: 'unknown',
			image: 'jpg',
			text: 'txt',
			// video: 'unknown',
		};
		const mime = {
			unknown: '/filetype-icons/unknown-file.png',
			doc: '/filetype-icons/doc-file.png',
			jpg: '/filetype-icons/jpg-file.png',
			js: '/filetype-icons/js-file.png',
			pdf: '/filetype-icons/pdf-file.png',
			ppt: '/filetype-icons/ppt-file.png',
			rar: '/filetype-icons/rar-file.png',
			txt: '/filetype-icons/txt-file.png',
			xlsx: '/filetype-icons/xlsx-file.png',
			xml: '/filetype-icons/xml-file.png',
			zip: '/filetype-icons/zip-file.png',
		};
		let r = type1[contentType];
		if (!r) {
			let a = contentType.split('/');
			r = type2[a[0]];
		}
		if (!r) {
			r = 'unknown';
		}
		return mime[r];
	};

	$scope.attachments = [];

	$scope.flagLoading = false;

	const formDefaults = JSON.stringify(F); // Object.assign(dest,src)

	debugScope = $scope;

	$scope.checkBoxSelected = function (id, whichCheckbox) {
		checkboxSelectedService.checkBoxSelected(id, whichCheckbox);
	};

} // END OF CONTROLLER **************
