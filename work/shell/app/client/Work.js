isc.defineClass("Work", "myWindow").addProperties({
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.WorkDS = isc.myDataSource.create({
			dataURL: serverPath + "Work.php",
			fields:[
				{name: "taskDate",
					title: "Date",
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					width: 120,
					changed: function(form, item, value){
						form.parent.LogLG.fetchData();
					}
				},
				{name: "userID",
					type: "text",
					optionDataSource: isc.Shared.usersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					fetchMissingValues: true,
					required: true,
					width: 150,
					includeInRecordSummary: false,
					defaultValue: isc.userData.userID
				},
				{name: "taskCategoryID",
					type: "integer",
					showGridSummary: false,
					optionDataSource: isc.Shared.categoriesDS,
					optionCriteria: {active: "Y"},
					displayField: "categoryName",
					valueField: "categoryID",
					fetchMissingValues: true,
					title: "Category ID",
					required: true,
					width: 120
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.projectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					fetchMissingValues: true,
					required: true,
					pickListWidth: 250,
					pickListProperties: {showFilterEditor: true},
					pickListFields: [{name: "projectCode", width: 75}, {name: "projectName", width: "*"}],
					width: 150
				},
				{name: "duration",  type: "float", required: true, width: 75, defaultValue: 1},
				{name: "ticketKey", type: "text", width: 100},
				{name: "description", type: "text", width: "*"},
				{name: "lastChangeDate", visible: false}
			]
		});
		this.LogDS = isc.myDataSource.create({
			dataURL: serverPath + "History.php",
			fields:[
				{name: "taskID", primaryKey: true, type: "sequence", canEdit: false, detail: true, width: 75},
				{name: "taskDate", title: "Date", editorType: "DateItem", validators: [{type: "isDate"}], canEdit: false, detail: true, width: 120},
				{name: "duration", type: "float", title: "Time", required: true, width: 50},
				{name: "userID",
					type: "text",
					optionDataSource: isc.Shared.usersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					fetchMissingValues: true,
					required: true,
					width: 150,
					includeInRecordSummary: false,
					defaultValue: isc.userData.userID,
					canEdit: false,
					detail: true,
					width: 75
				},
				{name: "taskCategoryID",
					title: "Category",
					optionDataSource: isc.Shared.categoriesDS,
					optionCriteria: {active: "Y"},
					displayField: "categoryName",
					valueField: "categoryID",
					fetchMissingValues: true,
					width: 60
				},
				{name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.projectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					fetchMissingValues: true,
				required: true,
					showGridSummary: false,
					pickListWidth: 200,
					pickListProperties: {
						showFilterEditor: true
					},
					pickListFields: [
						{name: "projectCode", width: 75},
						{name: "projectName", width: "*"}
					],
					width: "*"
				},
				{name: "ticketKey",
					title: "Ticket",
					width: 70,
					type: "text",
					formatCellValue: function (value) {
						var formatted;
						if (value) {
							formatted = "<a href='http://jira.prod.icd/browse/" + value + "' target='_blank'>" + value + "</a>";
						}
						return formatted;
					}
				},
				{name: "description", type: "text", width: 100, detail: true}
			]
		});
		this.WorkDF = isc.myDynamicForm.create({parent: this, dataSource: this.WorkDS});
		this.WorkBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			click: function(){this.parent.submitData();}
		});
		this.LogLG = isc.myListGrid2.create({
			parent: this,
			name: "Log",
			dataSource: this.LogDS,
			showFilterEditor: false,
			showGridSummary: true,
			canSort: false,
			fetchData: function(criteria, callback, requestProperties){
				var today = this.parent.WorkDF.getValue("taskDate");
				var newValues = {userID: isc.userData.userID, taskDate: today};
				var newCriteria = isc.addProperties({}, criteria, newValues);
				return this.Super("fetchData", [newCriteria, callback, requestProperties]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({parent: this, callingListGrid: this.LogLG});
		this.WorkVL = isc.myVLayout.create({members: [this.WorkDF, this.WorkBT, this.LogLG]});
		this.addItem(this.WorkVL);
		var moreCriteria = {projectID: initData.projectID, ticketKey: initData.ticketKey, taskCategoryID: 6, duration: .5};
		this.WorkDF.setData(isc.addProperties({}, moreCriteria));
	},
	submitData: function(){
		var formData = this.WorkDF.getValues();
		this.WorkDS.addData(formData, {target: this, methodName: "submitData_callback"});
	},
	submitData_callback: function(rpcResponse){
		this.LogLG.fetchData();
		this.LogLG.refreshData();
		this.WorkDF.setValue("ticketKey","");
		this.WorkDF.setValue("description","");
		this.WorkDF.setValue("taskCategoryID","");
		this.WorkDF.setValue("projectID","");
		this.WorkDF.setValue("duration",1);
	}
});
