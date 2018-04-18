isc.defineClass("Reports", "myWindow").addProperties({
	title: "Status Reports",
	width: 300,
	height: 150,
	left: isc.Math.random(150),
	top: isc.Math.random(150),
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.ReportsDF = isc.myDynamicForm.create({
			parent: this,
			margin: 5,
			fields: [
				{name: "START_DATE", title: "Start", type: "date", editorType: "date", useTextField: true, width: 100},
				{name: "END_DATE", title: "End", type: "date", editorType: "date", useTextField: true, width: 100}
			]
		});
		this.ReportsBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			margin: 5,
			click: function(){this.parent.submitData();}
		});
		this.ReportLB = isc.myLabel.create({
			contents: "Status Report",
			margin: 5,
			height: 20
		});
		this.addItem(isc.myVLayout.create({members: [this.ReportLB, this.ReportsDF, this.ReportsBT]}));
	},
	submitData: function(){
		var baseurl = "http://untrust3d.com/work/shell/app/reports/Status.php";
		var fd = this.ReportsDF.getValues();

		var sd = fd["START_DATE"].getFullYear() + "-";
		var temp = (fd["START_DATE"].getMonth() + 1);
		if(temp < 10){
			temp = "0" + temp;
		}
		sd += temp + "-";

		temp = fd["START_DATE"].getDate()
		if(temp < 10){
			temp = "0" + temp;
		}
		sd += temp;

		var ed = fd["END_DATE"].getFullYear() + "-";
		var temp = (fd["END_DATE"].getMonth() + 1);
		if(temp < 10){
			temp = "0" + temp;
		}
		ed += temp + "-";

		temp = fd["END_DATE"].getDate()
		if(temp < 10){
			temp = "0" + temp;
		}
		ed += temp;

		var paneurl = baseurl + "?u=" + isc.userData.userID + "&s=" + sd + "&e=" + ed;
		isc.htmlViewer.create({width: 1000, height: 600, top: 0, left: 150, title: "Status Report", paneURL: paneurl});
	},
	submitData_callback: function(rpcResponse){
	}
});
