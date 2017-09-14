isc.Shared = {
	epicListDS: isc.myDataSource.create({
		dataURL: serverPath + "Epics.php",
		fields:[
			{name: "epicID", type: "sequence", primaryKey: true},
			{name: "epicName", type: "text"}
		]
	}),
	projectListDS: isc.myDataSource.create({
		dataURL: serverPath + "Projects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true},
			{name: "projectName", type: "text"}
		]
	}),
	taskCategoryDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskCategories.php",
		fields:[
			{name: "categoryID", type: "sequence", primaryKey: true},
			{name: "categoryName", type: "text"}
		]
	}),
	taskUsersDS: isc.myDataSource.create({
		dataURL: serverPath + "Users.php",
		fields:[
			{name: "userID", type: "sequence", primaryKey: true},
			{name: "userName", type: "text"}
		]
	}),
	taskProjectsDS: isc.myDataSource.create({
		dataURL: serverPath + "TaskProjects.php",
		fields:[
			{name: "projectID", type: "sequence", primaryKey: true},
			{name: "projectName", type: "text"},
			{name: "projectCode", type: "text"}
		]
	})
};
