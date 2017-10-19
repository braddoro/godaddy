isc.defineClass("Accounts", "myWindow").addProperties({
	title: "Accounts",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.AccountsDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Accounts.php",
			fields:[
				{name: "accountID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "accountNumber", type: "text", width: "*"},
				{name: "accountName", type: "text"},
				{name: "status", type: "text"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.AccountsLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.AccountsDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			updateStatus: function() {
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Accounts - " + statusText);
				this.focus();
			},
			dataProperties: {
				dataArrived: this.getID() + ".AccountsLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.AccountsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.AccountsLG]}));
	}
});
