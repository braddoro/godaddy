isc.defineClass("Users", "myWindow").addProperties({
	title: "Users",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.UsersDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "Users.php",
			fields:[
				{
					name: "userID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{
					name: "userName",
					type: "text",
					width: "*"
				},
				{
					name: "firstName",
					type: "text",
					width: 80
				},
				{
					name: "lastName",
					type: "text",
					width: 80
				},
				{
					name: "login",
					type: "text",
					width: 80
				},
				{
					name: "password",
					type: "text",
					width: 80
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
		this.UsersLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.UsersDS,
			dataProperties: {
				dataArrived: this.getID() + ".UsersLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.UsersLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UsersLG]}));
	}
});
