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
		this.TaskMenu = isc.myMenu.create({
			title: "Task Entry",
			items: [
				{title: "Projects", click: "isc.TaskProjects.create({width: 800, height: 300, top: 25, left: 5})"},
				{title: "Categories", click: "isc.TaskCategories.create({width: 500, height: 300, top: 75, left: 5})"},
				{title: "Users", click: "isc.Users.create({width: 600, height: 300, top: 5, left: 50})"},
				{title: "Roles", click: "isc.Roles.create({width: 200, height: 300, top: 5, left: 50})"},
				{title: "User Roles", click: "isc.UserRoles.create({width: 200, height: 300, top: 5, left: 50})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Tasks", click: "isc.Tasks.create({width: 1000, height: 600, top: 5, left: 25})"},
				{title: "Task Misc", submenu: this.TaskMenu},
				{title: "Agile", enabled: false, submenu: this.AgileMenu},
				{isSeparator: true},
				{title: "To Do Items", click: "isc.Items.create({test1: \"foo\", test2: 22, width: 500})"},
				{title: "Quotes", click: "isc.Quotes.create({width: 600, height: 300})"},
				{title: "Brew Log", click: "isc.BrewLog.create({width: \"95%\", height: \"50%\"})"}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
