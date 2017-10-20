isc.defineClass("Roles", "myWindow").addProperties({
	title: "Roles",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.RoleDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Roles.php",
			fields:[
				{
					name: "roleID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{
					name: "role",
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
		this.RoleLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.RoleDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.RoleLG
		});
		this.addItem(isc.myVLayout.create({members: [this.RoleLG]}));
	}
});
