function piController($scope, $http, dbService, multipartForm, formFrontEndService, checkboxSelectedService) {
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
  $scope.db = dbService;
  $scope.saveClicked = 0;

  function clearInputFields() {
    const enumber = $scope.form.enumber;
    $scope.form = JSON.parse(formDefaults);
    $scope.form.enumber = enumber;
  }
  const FSM = {
    state_1_getLists: {
      onEnterState: function (args) {dbService.checkAuth();
        // event handler actions list
        //debugger;
        console.log('piController.js:FSM:State 1: OnEnterState:Begin start something to designate this ugh wow');
        $scope.currentState = FSM.state_1_getLists;
        $scope.disabledFlags = this.flags;
        $scope.saveClicked = 0;
        //$scope.$digest();
        $scope.flagLoading = true;
        //implement the orange arrow: ask server for new enumber, iidList, tidList, ridList
        $http
          .get('/formState1/') // TODO: give the endpoint a better name
          //returns a promise,
          .then(FSM.state_1_getLists.transitions.onServerResponse);
      },
      transitions: {
        onServerResponse: function doAction(res) {dbService.checkAuth();
          //TODO: check is not successful, if so ,ummmmmm
          //check is successful, if so , transition to state1_1
          console.log('state_1_getLists: Endpoint from State 1 responds', res);
          $scope.data = res.data;
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
        console.log('piController.js:FSM:State 1_1: OnEnterState');

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
        console.log('piController.js:FSM:State 2 EnDNE: OnEnterState');
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
              return formDefaults_[property] === $scope.form[property];
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
        console.log('piController.js:FSM:State 2_RequestingeNumber: OnEnterState');
        // event handler actions list
        $scope.currentState = FSM.state_2_RequestingeNumber;
        $scope.disabledFlags = this.flags;
        formFrontEndService.disabledStyling($scope.disabledFlags);
        $scope.flagLoading = true;

        $http //passing $scope.form as a reference
          .post('/formState2/', $scope.form) // TODO: give the endpoint a better name
          //returns a promise,
          .then(FSM.state_2_RequestingeNumber.transitions.onServerResponse);
      },
      transitions: {
        onServerResponse: function doAction(serverResponse) {dbService.checkAuth();
          console.log('Inside onServerResponse of state_2_RequestingeNumber', serverResponse);
          let O = serverResponse.data;
          $scope.form.enumber = O.eNumber;
          $scope.form.corNum = O.corNum;
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
        console.log('piController.js:FSM: state_2_userInput: OnEnterState');
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
        console.log('piController.js:FSM:State 3: OnEnterState');
        // event handler actions list
        $scope.currentState = FSM.state_3_pendingUpload;
        $scope.disabledFlags = this.flags;
        formFrontEndService.disabledStyling($scope.disabledFlags);
        $scope.icons4Attachments = [];

        var uploadUrl = '/state3_upload';
        multipartForm.post(uploadUrl, $scope.uploadFiles, $scope.form.corNum).then(() => FSM.state_2_userInput.onEnterState());
        for (let i = 0; i < $scope.uploadFiles.length; i++) {
          $scope.icons4Attachments.push([$scope.uploadFiles[i].name, $scope.uploadFiles[i]]);
        }
      },
      transitions: {
        onServerResponse: function doAction() {
          //$scope.state=FSM.state ?;$scope.state.onEnterState();
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
        console.log('piController.js:FSM:State 4: OnEnterState');
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
        console.log('piController.js:FSM:State 5: OnEnterState');
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
        console.log('piController.js:FSM:State 6: OnEnterState');
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
        console.log('piController.js:FSM:State 7: OnEnterState');
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

  FSM.state_1_getLists.onEnterState();

  $scope.now = new Date();
  let nowStr = $scope.now.toString(),
    dbgDefVal = '';

  $scope.form = {
    // table: naw_draft3.documents columns
    enumber: 'waiting for server', // the val comes from the server
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
  };

  $scope.attachCheatInputs = function () {
    const inputFields = {
      DOP: new Date(),
      RID: 3,
      Subject: 'blah',
      NOP: 1,
      Type: 'con',
      IID: { 7: true },
      TID: { 1: true },
      Body: 'blah',
    };

    Object.assign($scope.form, inputFields);
  };

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

  const formDefaults = JSON.stringify($scope.form); // Object.assign(dest,src)

  debugScope = $scope;

  $scope.checkBoxSelected = function (id, whichCheckbox) {
    checkboxSelectedService.checkBoxSelected(id, whichCheckbox);
  };

  /**
 * 
 DOP
 RID
 Subject
 NOP
 Type
 Body
 */
  dbService.checkAuth();
} // END OF CONTROLLER **************

//To plug into the terminal for node testing

// dbgDefVal = '-';
// nowStr = 1;
// form = {
//   enumber: "waiting for server",
//   document_type: "questions",
//   DOP: 0,
//   date_reply: dbgDefVal,
//   employee: "N/A",
//   Subject: dbgDefVal,
//   Body: dbgDefVal,
//   Status: "no_res",
//   IID: dbgDefVal,
//   TID: dbgDefVal,
//   NOP: dbgDefVal,
//   createdAt: nowStr,
//   updatedAt: nowStr,

//   RID: dbgDefVal,
//   Type: dbgDefVal,

//   pi_createdAt: nowStr,
//   pi_updatedAt: nowStr,

// };
