isc.defineClass("Navigation", "Menu").addProperties({
	initWidget: function(initData){
		this.MiscTables = isc.myMenu.create({
			title: "Task Entry",
			items: [
				{title: "Projects", click: "isc.TaskProjects.create({width: 500, height: 300})"},
				{title: "Categories", click: "isc.TaskCategories.create({width: 500, height: 300})"},
				{title: "Statuses", click: "isc.Statuses.create({width: 500, height: 300})"},
				{title: "Users", click: "isc.Users.create({width: 500, height: 300})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Log Work", click: "isc.Work.create({width: 350, height: 600, top: 25, left: 5})"},
				{title: "To Do Items", click: "isc.Items.create({width: 800, height: 350, top: 1, left: 360})"},
				{title: "Task History", click: "isc.Tasks.create({width: 1000, height: 600,  top: 5, left: 200, currUserID: isc.userData.userID})"},
				{isSeparator: true},
				{title: "Misc Tables", submenu: this.MiscTables},
				{title: "Quotes", click: "isc.Quotes.create({width: 600, height: 300})"},
				{title: "User Stories", click: "isc.UserStories.create({width: 1200, height: 600, top: 20, left: 5})"},
				{title: "Brew Log", click: "isc.BrewLog.create({width: \"95%\", height: \"50%\"})"}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
