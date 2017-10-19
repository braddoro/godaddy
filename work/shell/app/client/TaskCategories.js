isc.defineClass("TaskCategories", "myWindow").addProperties({
	title: "Categories",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TaskCategoriesDS = isc.myDataSource.create({
			dataURL: serverPath + "TaskCategories.php",
			initialSort: ["displayOrder"],
			//sortField: 1,
			fields:[
				{name: "categoryID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "displayOrder", type: "integer", width: 100},
				{name: "categoryName", type: "text", width: "*"},
				{name: "active", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
				{name: "lastChangeDate", width: 120, canEdit: false}
			]
		});
		this.TaskCategoriesLG = isc.myListGrid.create({
			parent: this,
			dataSource: this.TaskCategoriesDS,
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
			callingListGrid: this.TaskCategoriesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TaskCategoriesLG]}));
	}
});
