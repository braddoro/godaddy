isc.defineClass("Epics", "myWindow").addProperties({
	title: "Epics",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.EpicsDS = isc.myDataSource.create({
			dataURL: serverPath + "Epics.php",
			fields:[
				{name: "epicID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "epicName", width: 150},
				{name: "for", width: 80},
				{name: "who", width: 80},
				{name: "the", width: 80},
				{name: "isa", width: 80},
				{name: "that", width: 80},
				{name: "unlike", width: 80},
				{name: "solution", width: 80},
				{name: "why", width: 80},
				{name: "completed", type: "boolean", width: 80},
				{name: "lastChangeDate", width: 120, canEdit: false}
			]
		});
		this.EpicsLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.EpicsDS,
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
			callingListGrid: this.EpicsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.EpicsLG]}));
	}
});
