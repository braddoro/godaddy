isc.defineClass("Work", "myWindow").addProperties({
	title: "Work",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.WorkDS = isc.myDataSource.create({
			dataURL: serverPath + "Tasks.php",
			fields:[
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
					name: "duration",
					type: "float",
					required: true,
					width: 75,
					defaultValue: 1
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
				}
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
			click: function(){
				this.parent.submitData();
			}
		});
		this.WorkVL = isc.myVLayout.create({members: [this.WorkDF, this.WorkBT]});
		this.addItem(this.WorkVL);
	},
	submitData: function(){
		var formData = this.WorkDF.getValues();
		this.WorkDS.addData(formData,{target: this, methodName: "submitData_callback"});
	},
	submitData_callback: function(rpcResponse){
		var responseData = rpcResponse.data[0];
		if(responseData === undefined){} else {
			this.WorkDF.clearValues();
		}
	}
});
