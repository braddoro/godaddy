isc.defineClass("TaskProjects", "myWindow").addProperties({
	title: "Projects",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TaskProjectsDS = isc.myDataSource.create({
			dataURL: serverPath + "TaskProjects.php",
			fields:[
				{name: "projectID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "projectCode", type: "text", width: 100},
				{name: "projectName", type: "text", width: "*"},
				{name: "active", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
				{name: "lastChangeDate", width: 120, canEdit: false}
			]
		});
		this.TaskProjectsLG = isc.myListGrid.create({
			parent: this,
			dataSource: this.TaskProjectsDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TaskProjectsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TaskProjectsLG]}));
	}
});
