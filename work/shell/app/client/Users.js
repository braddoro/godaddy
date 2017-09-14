isc.defineClass("Users", "myWindow").addProperties({
	title: "Users",
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
		this.UsersLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.UsersDS,
			rowContextClick: function(record, rowNum, colNum){
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
				this.startEditing(recordNum);
			},
			updateStatus: function() {
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Task Entry - " + statusText);
				this.focus();
			},
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
