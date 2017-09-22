isc.defineClass("BrewLog", "myWindow").addProperties({
	title: "Brew Log",
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.BrewLogDS = isc.myDataSource.create({
			dataURL: serverPath + "BrewLog.php",
			canAddFormulaFields: true,
			fields:[
				{name: "brewLogID", primaryKey: true, type: "sequence", detail: true, canEdit: false},
				{name: "userID", type: "integer",
					optionDataSource: isc.Shared.taskUsersDS,
					optionCriteria: {active: "Y"},
					displayField: "userName",
					valueField: "userID",
					required: true,
					width: 100},
				{name: "brewDate", width: 120, editorType: "DateItem", inputFormat: "toUSShortDate", displayFormat: "toSerializeableDate", useTextField: true, required: true, validators: [{type: "isDate"}]},
				{name: "beerName", type: "text", required: true},
				{name: "beerStyle", type: "text"},
				{name: "mashTemp", type: "integer", validators: [{type: "isInteger"}]},
				{name: "mashRatio", type: "float", validators: [{type: "isFloat"}]},
				{name: "mashTime", type: "integer", validators: [{type: "isInteger"}]},
				{name: "preboilSG", type: "float", validators: [{type: "isFloat"}]},
				{name: "preboilVol", type: "float", validators: [{type: "isFloat"}]},
				{name: "boilTime", type: "integer", validators: [{type: "isInteger"}]},
				{name: "postBoilSG", type: "float", validators: [{type: "isFloat"}]},
				{name: "postBoilVol", type: "float", validators: [{type: "isFloat"}]},
				{name: "finalSG", type: "float", validators: [{type: "isFloat"}]},
				{name: "finalVol", type: "float", validators: [{type: "isFloat"}]},
				{name: "yeastStarter", type: "text", editorType: "selectItem", defaultValue: "Y", valueMap: {"Y" : "Yes", "N" : "No"}, width: 80},
				{name: "yeastStrain", type: "text"},
				{name: "fermTempStart", type: "float", validators: [{type: "isFloat"}]},
				{name: "fermTempEnd", type: "float", validators: [{type: "isFloat"}]},
				{name: "finishDate", width: 120, editorType: "DateItem", inputFormat: "toUSShortDate", displayFormat: "toSerializeableDate", useTextField: true, validators: [{type: "isDate"}]},
				{name: "ABV", type: "float", canEdit: false},
				{name: "lastChangeDate", canEdit: false, detail: true}
			]
		});
		this.BrewLogLG = isc.myListGrid.create({
			parent: this,
			showFilterEditor: true,
			dataSource: this.BrewLogDS,
			rowContextClick: function(record, rowNum, colNum){
				// var previewMenu = isc.myMenu.create({
				// 	items: [
				// 		{title: "Preview", click: "isc.Preview.create({width: \"50%\", height: \"95%\", initData.record"+ record +"})"}
				// 	]
				// });
		        //this.parent.localContextMenu.addMembers([{title: "Preview", click: "isc.Preview.create({width: \"50%\", height: \"95%\", initData.record"+ record +"})"}]);
				this.parent.localContextMenu.showContextMenu();
				return false;
			},
 			rowDoubleClick: function(record, recordNum, fieldNum, keyboardGenerated) {
 				this.startEditing(recordNum);
 			},
 			startEditingNew: function(newValues, suppressFocus){
				var now = new Date();
				var today = now.toSerializeableDate();
				var defaults = {brewDate: today, userID: 1, mashTemp: 152, mashRatio: 1.5, mashTime: 60, boilTime: 60, yeastStarter: "N"};
				var moreCriteria = isc.addProperties({}, newValues, defaults);
 				return this.Super("startEditingNew", [moreCriteria, suppressFocus]);
 			},
			updateStatus: function(){
				var statusText = this.getTotalRows() + " Rows";
				this.parent.setTitle("Brew Log - " + statusText);
				this.focus();
			},
			dataProperties: {
				dataArrived: this.getID() + ".BrewLogLG.updateStatus()"
			}
		});
		this.localContextMenu = isc.myContextMenu.create({
			parent: this,
			callingListGrid: this.BrewLogLG
		});
		this.BrewLogVL = isc.myVLayout.create({members: [this.BrewLogLG]});
		this.addItem(this.BrewLogVL);
	}
});
