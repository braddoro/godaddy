isc.defineClass("Navigation", "Menu").addProperties({
	initWidget: function(initData){
		this.MiscTables = isc.myMenu.create({
			title: "Misc Tables",
			items: [
				{title: "Accounts", click: "isc.Accounts.create({width: 500, height: 300})"},
				{title: "Items", click: "isc.Items.create({width: 500, height: 600})"}
			]
		});
		this.mainMenu = isc.myMenu.create({
			title: "...",
			showShadow: true,
			items: [
				{title: "Invoices", click: "isc.Invoices.create({width: 1000, height: 600, top: 5, left: 25})"},
				{isSeparator: true},
				{title: "Misc Tables", submenu: this.MiscTables}
			]
		});
		this.menuBar = isc.MenuBar.create({
			menus: [this.mainMenu]
		});
	}
});
