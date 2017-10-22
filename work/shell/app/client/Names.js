isc.defineClass("Names", "myWindow").addProperties({
	title: "Names",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.NameDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Names.php",
			fields:[
				{
					name: "NameID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{
					name: "name",
					type: "text",
					width: "*"
				},
				{	name: "active",
					type: "text",
					editorType: "selectItem",
					defaultValue: "Y",
					valueMap: {"Y" : "Yes", "N" : "No"},
					width: 80
				},
				{
					name: "lastChangeDate",
					canEdit: false,
					detail: true
				}
			]
		});
		this.NameLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.NameDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.NameLG
		});
		this.addItem(isc.myVLayout.create({members: [this.NameLG]}));
	}
});
