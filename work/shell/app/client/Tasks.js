isc.defineClass("Tasks", "myWindow").addProperties({
	title: "Task Entry",
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
					name: "userID",
					type: "integer",
					optionDataSource: isc.Shared.taskUsersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					required: true,
					width: 100,
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
					displayField: "categoryName",
					valueField: "categoryID",
					required: true,
					width: 120
				},
				{
					name: "projectID",
					type: "integer",
					optionDataSource: isc.Shared.taskProjectsDS,
					optionCriteria: {active: "Y"},
					displayField: "projectName",
					valueField: "projectID",
					required: true,
					showGridSummary: false,
					pickListWidth: 250,
					pickListFields: [
						{name: "projectCode", width: 75},
						{name: "projectName", width: "*"}
					],
					width: 150
				},
				{
					name: "taskDate",
					title: "Date",
					// useTextField: true,
					editorType: "DateItem",
					validators: [{type: "isDate"}],
					// defaultValue: new Date(),
					width: 120
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
		this.TasksLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.TasksDS,
			showGridSummary: true,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			updateStatus: function(){
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Task Entry - " + statusText);
				this.focus();
			},
			startEditingNew: function(newValues, suppressFocus){
				var today = new Date();
				var rowDefaults = {duration: .25, taskDate: today, userID: isc.userData.userID};
				var newCriteria = isc.addProperties({}, newValues, rowDefaults);
				return this.Super("startEditingNew", [newCriteria, suppressFocus]);
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
	}
});
