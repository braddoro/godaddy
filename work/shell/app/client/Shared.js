isc.Shared = {
	userDataDS: isc.myDataSource.create({
		clientOnly: true,
		fields:[
			{name: "active", type: "text"},
			{name: "firstName", type: "text"},
			{name: "lastChangeDate", type: "text"},
			{name: "lastName", type: "text"},
			{name: "login", type: "text"},
			{name: "password", type: "text"},
			{name: "userID", type: "sequence", primaryKey: true},
			{name: "userName", type: "text"}
		]
	}),
	epicListDS: isc.myDataSource.create({
		dataURL:
		serverPath + "Epics.php",
		fields:[
			{name: "epicID", type: "sequence", primaryKey: true},
			{name: "epicName", type: "text"}
		]
	}),
	projectListDS: isc.myDataSource.create({
		dataURL: serverPath + "Projects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true},
			{name: "projectName", type: "text"},
			{name: "active", type: "text"}
		]
	}),
	taskCategoryDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskCategories.php",
		fields:[
			{name: "categoryID", type: "sequence", primaryKey: true},
			{name: "categoryName", type: "text"},
			{name: "status", type: "integer"},
			{name: "active", type: "text"}
		]
	}),
	taskProjectsDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskProjects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true},
			{name: "projectName", type: "text"},
			{name: "projectCode", type: "text"},
			{name: "status", type: "integer"}
		]
	}),
	taskUsersDS: isc.myDataSource.create({
		dataURL: serverPath + "Users.php",
		fields:[
			{name: "userID", type: "sequence", primaryKey: true},
			{name: "userName", type: "text"},
			{name: "active", type: "text"}
		]
	}),
	rolesDS: isc.myDataSource.create({
		dataURL: serverPath + "Roles.php",
		fields:[
			{name: "roleID", type: "sequence", primaryKey: true},
			{name: "role", type: "text"}
		]
	}),
	namesDS: isc.myDataSource.create({
		dataURL: serverPath + "Names.php",
		fields:[
			{name: "nameID", type: "sequence", primaryKey: true},
			{name: "name", type: "text"}
		]
	})
};
