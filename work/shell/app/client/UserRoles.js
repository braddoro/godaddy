isc.defineClass("UserRoles", "myWindow").addProperties({
	title: "User Roles",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.UserRolesDS = isc.myDataSource.create({
			parent: this,
			dataURL: serverPath + "UserRoles.php",
			fields:[
				{
					name: "userRoleID",
					primaryKey: true,
					type: "sequence",
					canEdit: false,
					detail: true
				},
				{
					name: "userID",
					type: "integer",
					optionDataSource: isc.Shared.taskUsersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					required: true
				},
				{
					name: "roleID",
					type: "integer",
					optionDataSource: isc.Shared.rolesDS,
					optionCriteria: {active: "Y"},
					displayField: "role",
					valueField: "roleID",
					required: true
				},
				{
					name: "lastChangeDate",
					canEdit: false,
					detail: true
				}
			]
		});
		this.UserRolesLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.UserRolesDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.UserRolesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UserRolesLG]}));
	}
});
