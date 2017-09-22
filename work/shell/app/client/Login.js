isc.defineClass("Login", "myWindow").addProperties({
	title: "Login",
	autoCenter: true,
	showHeader: false,
	height: 100,
	width: 300,
	margin: 1,
	//isModal: true,
	initWidget: function(initData){
		this.Super("initWidget", arguments);
		this.LoginDS = isc.myDataSource.create({
			dataURL: serverPath + "Login.php",
			fields:[
				{name: "USER_NAME", type: "text", width: 150},
				{name: "PASSWORD", type: "text", width: 150}
			]
		});
		this.LoginDF = isc.myDynamicForm.create({
			parent: this,
			dataSource: this.LoginDS
		});
		this.SubmitBT = isc.myIButton.create({
			parent: this,
			title: "Submit",
			align: "center",
			click: function(){
				this.parent.submitData();
			}
		});
		this.LoginVL = isc.myVLayout.create({members: [this.LoginDF, this.SubmitBT]});
		this.addItem(this.LoginVL);
	},
	submitData: function(){
		var formData = this.LoginDF.getValues();
		this.LoginDS.addData(formData,{target: this, methodName: "submitData_callback"});
	},
	submitData_callback: function(rpcResponse){
		console.log(rpcResponse.data[0]);
		var userData = rpcResponse.data[0];
		isc.Server.userDataDS.setCacheData(userData);
		console.log(isc.Server.userDataDS.getField("userID"));
	}
});
