isc.defineClass("Tasks", "myWindow").addProperties({
	title: "Task Entry",
	currUserID: 0,
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TasksDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Tasks.php",
			fields:[
				{
					name: "taskID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{
					name: "taskDate",
					title: "Date",
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					width: 120
				},
				{
					name: "userID",
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
				{
					name: "duration",
					type: "float",
					required: true,
					width: 75
				},
				{
					name: "taskCategoryID",
					type: "integer",
					showGridSummary: false,
					optionDataSource: isc.Shared.taskCategoryDS,
					optionCriteria: {status: 1},
					displayField: "categoryName",
					valueField: "categoryID",
					required: true,
					width: 120
				},
				{
					name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.taskProjectsDS,
					//optionCriteria: {active: "Y"},
					displayField: "projectName",
					optionCriteria: {status: 1},
					valueField: "projectID",
					required: true,
					showGridSummary: false,
					pickListWidth: 250,
					pickListProperties: {
						showFilterEditor: true
					},
					pickListFields: [
						{name: "projectCode", width: 75},
						{name: "projectName", width: "*"}
					],
					width: 150
				},
				{
					name: "ticketCode",
					type: "text",
					width: 100
				},
				{
					name: "description",
					type: "text",
					width: "*"
				},
				{
					name: "lastChangeDate",
					canEdit: false,
					detail: true
				}
			]
		});
		this.TasksLG = isc.myListGrid2.create({
			parent: this,
			dataSource: this.TasksDS,
			showFilterEditor: true,
			showGridSummary: true,
			autoFetchData: false,
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			startEditingNew: function(newValues, suppressFocus){
				var today = new Date();
				var rowDefaults = {duration: .25, taskDate: today, userID: this.currUserID};
				var newCriteria = isc.addProperties({}, newValues, rowDefaults);
				return this.Super("startEditingNew", [newCriteria, suppressFocus]);
			},
			rowEditorEnter: function(record, editValues, rowNum){
				this.focusInFilterEditor("taskCategoryID");
			},
			dataProperties: {
				dataArrived: this.getID() + ".TasksLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TasksLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TasksLG]}));
		this.TasksDS.filterData({userID: this.currUserID});
	}
});
