isc.defineClass("TaskProjects", "myWindow").addProperties({
	title: "Projects",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TaskProjectsDS = isc.myDataSource.create({
			dataURL: serverPath + "TaskProjects.php",
			fields:[
				{name: "projectID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "projectCode", type: "text", width: 100},
				{name: "projectName", type: "text", width: "*"},
				{name: "PM",
					type: "text",
					width: 150,
					optionDataSource: isc.Shared.namesDS,
					optionCriteria: {active: "Y"},
					displayField: "name",
					valueField: "nameID"
				},
				{name: "status",
					type: "interger",
					defaultValue: 1
				},
				{name: "active",
					type: "text",
					editorType: "selectItem",
					defaultValue: "Y",
					valueMap: {"Y": "Yes", "N": "No"},
					width: 80
				},
				{name: "lastChangeDate",
					width: 120,
					canEdit: false
				}
			]
		});
		this.TaskProjectsLG = isc.myListGrid2.create({
			parent: this,
			dataSource: this.TaskProjectsDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TaskProjectsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TaskProjectsLG]}));
	}
});
