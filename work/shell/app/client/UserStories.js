isc.defineClass("UserStories", "myWindow").addProperties({
	title: "User Stories",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.UserStoriesDS = isc.myDataSource.create({
			dataURL: serverPath + "UserStories.php",
			fields:[
				{name: "userStoryID",
					primaryKey: true,
					type: "sequence",
					detail: true,
					canEdit: false
				},
				{name: "projectID",
					// type: "integer",
					width: 80,
					optionDataSource: isc.Shared.projectListDS,
					displayField: "projectName",
					valueField: "projectID"
				},
				{name: "epicID",
					// type: "integer",
					width: 80,
					optionDataSource: isc.Shared.epicListDS,
					displayField: "epicName",
					valueField: "epicID"
				},
				{name: "sprintID", type: "integer", width: 80},
				{name: "author", width: 80},
				{name: "storyName", width: 150},
				{name: "role", width: "25%", title: "As a"},
				{name: "something", width: "25%", title: "I want"},
				{name: "benefit", width: "25%", title: "So that"},
				{name: "completed", type: "boolean", width: 80},
				{name: "lastChangeDate", width: 120, canEdit: false}
			]
		});
		this.UserStoriesLG = isc.myListGrid2.create({
			parent: this,
			dataSource: this.UserStoriesDS,
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
			callingListGrid: this.UserStoriesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.UserStoriesLG]}));
	}
});
