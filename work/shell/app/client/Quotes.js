isc.defineClass("Quotes", "myWindow").addProperties({
	title: "Quotes",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.QuotesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Quotes.php",
			fields:[
				{name: "quoteID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "quote", type: "text", width: "*"},
				{name: "attribution", type: "text", width: "25%"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.QuotesLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.QuotesDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			updateStatus: function() {
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Quotes - " + statusText);
				this.focus();
			},
			dataProperties: {
				dataArrived: this.getID() + ".QuotesLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.QuotesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.QuotesLG]}));
	}
});
