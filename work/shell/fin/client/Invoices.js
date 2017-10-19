isc.defineClass("Invoices", "myWindow").addProperties({
	title: "Invoices",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.InvoicesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Invoices.php",
			fields:[
				{name: "invoiceID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "accountID", type: "text", width: "*"},
				{name: "invoiceAmount", type: "text", width: "*"},
				{name: "invoiceDate", type: "date"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.LinesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Lines.php",
			fields:[
				{name: "lineID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "invoiceID", type: "integer"},
				{name: "itemID", type: "integer"},
				{name: "itemCount", type: "integer"},
				{name: "unitCost", type: "float"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.InvoicesLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.InvoicesDS,
			rowClick: function(record, recordNum, fieldNum, keyboardGenerated){
				this.parent.LinesLG.filterData({invoiceID: record.invoiceID});
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.InvoicesLG
		});
		this.LinesLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			autoFetchData: false,
			dataSource: this.LinesDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.LinesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.InvoicesLG, this.LinesLG]}));
	}
});
