isc.defineClass("TaskProjects", "myWindow").addProperties({
	title: "Projects",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TaskProjectsLG = isc.myListGrid2.create({
			parent: this,
			showFilterEditor: true,
			dataSource: isc.Shared.taskProjectsDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TaskProjectsLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TaskProjectsLG]}));
	}
});
