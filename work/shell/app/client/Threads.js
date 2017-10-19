isc.defineClass("Threads", "myWindow").addProperties({
	title: "Threads",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ThreadsDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Threads.php",
			fields:[
				{name: "threadID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "parentID", type: "integer"},
				{name: "threadName", type: "text", width: "*"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.ThreadsLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.ThreadsDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			updateStatus: function() {
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Rows - " + statusText);
				this.focus();
			},
			dataProperties: {
				dataArrived: this.getID() + ".ThreadsLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ThreadsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.ThreadsLG]}));
	}
});
