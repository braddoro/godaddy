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
	statusDS: isc.myDataSource.create({
		dataURL: serverPath + "Statuses.php",
		fields:[
			{name: "statusID", primaryKey: true, type: "sequence", canEdit: false, width: 75},
			{name: "status", type: "text", width: "*"},
			{name: "active", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
		]
	}),
	taskCategoryDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskCategories.php",
		fields:[
			{name: "categoryID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
			{name: "displayOrder", type: "integer", width: 100},
			{name: "categoryName", type: "text", width: "*"},
			{name: "active", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false}
		]
	}),
	taskProjectsDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskProjects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true},
			{name: "projectName", type: "text"},
			{name: "projectCode", type: "text"},
			{name: "active", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y": "Yes", "N": "No"}, width: 80},
			{name: "lastChangeDate", width: 120, canEdit: false, detail: true}
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
