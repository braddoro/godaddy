isc.defineClass("TaskCategories", "myWindow").addProperties({
	title: "Categories",
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.TaskCategoriesLG = isc.myListGrid2.create({
			parent: this,
			dataSource: isc.Shared.taskCategoriesDS
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.TaskCategoriesLG
		});
		this.addItem(isc.myVLayout.create({members: [this.TaskCategoriesLG]}));
	}
});
