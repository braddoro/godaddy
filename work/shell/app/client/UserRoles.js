isc.defineClass("UserRoles", "myWindow").addProperties({
	title: "User Roles",
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
		this.UserRolesLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.UserRolesDS,
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
			callingListGrid: this.UserRolesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UserRolesLG]}));
	}
});
