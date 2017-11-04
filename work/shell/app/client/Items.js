git pushisc.defineClass("Items", "myWindow").addProperties({
	title: "Items",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ItemsDS = isc.myDataSource.create({
			dataURL: serverPath + "Items.php",
			fields:[
				{name: "itemID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "userID", type: "integer", optionDataSource: isc.Shared.taskUsersDS, optionCriteria: {active: "Y"}, displayField: "userName", valueField: "userID", required: true, width: 120, defaultValue: isc.userData.userID},
				{name: "itemDate", width: 120, editorType: "DateItem", inputFormat: "toUSShortDate", displayFormat: "toSerializeableDate", useTextField: true},
				{name: "type", type: "text"},
				{name: "item", width: "*"},
				{name: "lastChangeDate", canEdit: false}
			]
		});
		this.ItemsLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.ItemsDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				var now = new Date();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			startEditingNew: function(newValues, suppressFocus){
				var now = new Date();
				var today = now.toSerializeableDate();
				var moreCriteria = isc.addProperties({}, newValues, {itemDate: today});
				return this.Super("startEditingNew", [moreCriteria, suppressFocus]);
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ItemsLG
		});
		this.ItemsVL = isc.myVLayout.create({members: [this.ItemsLG]});
		this.addItem(this.ItemsVL);
	}
});
