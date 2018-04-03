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
				{title: "Statuses", click: "isc.Statuses.create({width: 500, height: 300})"},
				{title: "Users", click: "isc.Users.create({width: 600, height: 300})"},
				{isSeparator: true},
				{title: "Names", enabled: false, click: "isc.Names.create({width: 600, height: 300})"},
				{title: "Roles", enabled: false, click: "isc.Roles.create({width: 200, height: 300})"},
				{title: "User Roles", enabled: false, click: "isc.UserRoles.create({width: 200, height: 300})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Log Work", click: "isc.Work.create({width: 350, height: 600, top: 25, left: 5})"},
				{title: "To Do Items", click: "isc.Items.create({height: 400, width: 1000})"},
				{title: "Task History", click: "isc.Tasks.create({width: 1000, height: 400, top: 5, left: 25, currUserID: isc.userData.userID})"},
				{isSeparator: true},
				{title: "Misc Tables", submenu: this.MiscTables},
				{title: "Quotes", click: "isc.Quotes.create({width: 600, height: 300})"},
				{title: "Threads", enabled: false, click: "isc.Threads.create({width: 600, height: 300})"},
				{title: "Agile", enabled: false, submenu: this.AgileMenu},
				{title: "Brew Log", click: "isc.BrewLog.create({width: \"95%\", height: \"50%\"})"}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
