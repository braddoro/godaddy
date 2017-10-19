isc.defineClass("Items", "myWindow").addProperties({
	title: "Items",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ItemsDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Items.php",
			fields:[
				{name: "itemID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "itemName", type: "text", width: "*"},
				{name: "status", type: "text"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.LotsDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Lots.php",
			fields:[
				{name: "lotID", primaryKey: true, type: "sequence", canEdit: false, detail: true},
				{name: "itemID", type: "integer"},
				{name: "lotDate", type: "date"},
				{name: "unitCost", type: "float"},
				{name: "unitCount", type: "integer"},
				{name: "sku", type: "text", width: "*"},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.ItemsLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.ItemsDS,
			rowClick: function(record, recordNum, fieldNum, keyboardGenerated){
				this.parent.LotsLG.filterData({itemID: record.itemID});
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.ItemsLG
		});
		this.LotsLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			autoFetchData: false,
			dataSource: this.LotsDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.LotsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.ItemsLG, this.LotsLG]}));
	}
});
