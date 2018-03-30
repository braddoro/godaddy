isc.defineClass("Work", "myWindow").addProperties({
	title: "Work",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.WorkDS = isc.myDataSource.create({
			dataURL: serverPath + "Tasks.php",
			autoFetchData: false,
			fields:[
				{name: "taskDate",
					title: "Date",
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					width: 120,
					changed: function(form, item, value){
						// console.log(value);
						// var today = new Date();
						// var newdate = value;
						// if(value == '') {
						// 	newdate = today;
						// }
						form.parent.TasksLG.fetchData();
					}
				},
				{name: "userID",
					type: "text",
					optionDataSource: isc.Shared.taskUsersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					required: true,
					width: 150,
					includeInRecordSummary: false,
					defaultValue: isc.userData.userID
				},
				{name: "taskCategoryID",
					type: "integer",
					showGridSummary: false,
					optionDataSource: isc.Shared.taskCategoryDS,
					optionCriteria: {status: 1},
					displayField: "categoryName",
					valueField: "categoryID",
					title: "Category ID",
					required: true,
					width: 120
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.taskProjectsDS,
					//optionCriteria: {active: "Y"},
					displayField: "projectName",
					optionCriteria: {status: 1},
					valueField: "projectID",
					required: true,
					pickListWidth: 250,
					pickListProperties: {showFilterEditor: true},
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}],
					width: 150
				},
				{name: "duration",  type: "float", required: true, width: 75, defaultValue: 1},
				{name: "ticketCode", type: "text", width: 100},
				{name: "description", type: "text", width: "*"},
				{name: "lastChangeDate", visible: false}
			]
		});
		this.TasksDS = isc.myDataSource.create({
			dataURL: serverPath + "Tasks.php",
			autoFetchData: true,
			fields:[
				{name: "taskID", detail: true},
				{name: "duration", type: "float", title: "Time", width: 50},
				{name: "taskCategoryID",
					title: "Category",
					optionDataSource: isc.Shared.taskCategoryDS,
					optionCriteria: {status: 1},
					displayField: "categoryName",
					valueField: "categoryID",
					width: 75
				},
				{name: "projectID",
					title: "Project",
					optionDataSource: isc.Shared.taskProjectsDS,
					displayField: "projectName",
					optionCriteria: {status: 1},
					valueField: "projectID",
					width: "*"
				},
				{name: "ticketCode", title: "Ticket", width: 75}
			]
		});
		this.WorkDF = isc.myDynamicForm.create({
			parent: this,
			dataSource: this.WorkDS
		});
		this.WorkBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			click: function(){this.parent.submitData();}
		});
		this.TasksLG = isc.myListGrid2.create({
			parent: this,
			dataSource: this.TasksDS,
			canEdit: false,
			canSort: false,
			showGridSummary: true,
			fetchData: function(criteria, callback, requestProperties){
				var today = this.parent.WorkDF.getValue("taskDate");
				var newValues = {userID: isc.userData.userID, taskDate: today};
				var newCriteria = isc.addProperties({}, criteria, newValues);
				return this.Super("fetchData", [newCriteria, callback, requestProperties]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TasksLG
		});
		this.WorkVL = isc.myVLayout.create({members: [this.WorkDF, this.WorkBT, this.TasksLG]});
		this.addItem(this.WorkVL);
	},
	submitData: function(){
		var formData = this.WorkDF.getValues();
		this.WorkDS.addData(formData, {target: this, methodName: "submitData_callback"});
	},
	submitData_callback: function(rpcResponse){
		this.TasksLG.fetchData();
		this.TasksLG.refreshData();
		this.WorkDF.setValue("ticketCode","");
		this.WorkDF.setValue("description","");
		this.WorkDF.setValue("taskCategoryID","");
		this.WorkDF.setValue("projectID","");
		this.WorkDF.setValue("duration",1);
	}
});
