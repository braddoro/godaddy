isc.defineClass("Navigation", "Menu").addProperties({
	initWidget: function(initData){
		this.AgileMenu = isc.myMenu.create({
			title: "Agile",
			items: [
				{title: "Projecs", enabled: false, click: "isc.Epics.create()"},
				{title: "Epics", click: "isc.Epics.create()"},
				{title: "Sprints", enabled: false, click: "isc.Sprints.create()"},
				{title: "User Stories", click: "isc.UserStories.create()"}
			]
		});
		this.MiscTables = isc.myMenu.create({
			title: "Task Entry",
			items: [
				{title: "Projects", click: "isc.TaskProjects.create({width: 800, height: 300})"},
				{title: "Categories", click: "isc.TaskCategories.create({width: 500, height: 300})"},
				{title: "Names", click: "isc.Names.create({width: 600, height: 300})"},
				{title: "Users", click: "isc.Users.create({width: 600, height: 300})"},
				{title: "Roles", click: "isc.Roles.create({width: 200, height: 300})"},
				{title: "User Roles", click: "isc.UserRoles.create({width: 200, height: 300})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Work", click: "isc.Work.create({width: 350, height: 600, top: 25, left: 5})"},
				{title: "Tasks", click: "isc.Tasks.create({width: 1000, height: 400, top: 5, left: 25, currUserID: isc.userData.userID})"},
				{isSeparator: true},
				{title: "To Do Items", click: "isc.Items.create({width: 800})"},
				{title: "Misc Tables", submenu: this.MiscTables},
				{title: "Agile", enabled: false, submenu: this.AgileMenu},
				{title: "Quotes", click: "isc.Quotes.create({width: 600, height: 300})"},
				{title: "Threads", click: "isc.Threads.create({width: 600, height: 300})"},
				{title: "Brew Log", click: "isc.BrewLog.create({width: \"95%\", height: \"50%\"})"}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
