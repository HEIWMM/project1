function navLetf() {
	var [a,b] = [$("[id=left-apl]"),$(".in-ul")];
	var c = $(".left-cho");
	var arr = [$(".tag-man"),$(".tag-card"),$(".tag-apl"),$(".tag-out"),$(".tag_appro"),$(".tag_cardstua"),$(".tag_holistua"),$(".tag_outstua"),$(".tag_holicheck"),$(".tag_outcheck")];
	for(let i = 0;i<2;i++){
		$(a[i]).click(()=>{
			$(b[i]).toggle();
		});
	}
	for(let i = 0;i<10;i++){
		$(c[i]).click(()=>{			
			for(let j = 0;j<10;j++){
				if (j==i) {
					$(c[j]).css("font-weight","bold");
					$(c[j]).css("background-color","#999");
					arr[j].css("display","block");
				}
				else{
					$(c[j]).css("font-weight","normal");
					$(c[j]).css("background-color","#EEEEEE");
					arr[j].css("display","none");
				}
				
			};
		});
	}
}
function ajax() {
	
    
}
function manChange() {
	var [a,b,c,d,e,f,g] = [$(".man-cha"),$(".man-cha input"),$(".man-td1"),$(".man-td1 input"),$(".bm"),$(".bm option"),$(".person")];
	var bool = true;
	function click(x) {
		if (x) {
			b[0].value = "保存";
			c[2].innerHTML = '<input type="radio" name="sex" value="男">男'+'<input type="radio" name="sex" value="女">女';
			c[3].innerHTML = '<input type="radio" name="hy" value="已婚">已婚'+'<input type="radio" name="hy" value="未婚">未婚';
			[c[4].innerHTML,c[5].innerHTML] = ["<input type='text' name='ifo' value='"+c[4].innerHTML+"'>","<input type='text' name='ifo'  value='"+c[5].innerHTML+"'>"];
			e[0].style.display = "inline-block";
			e[1].style.display = "none";
		}
		else{
			b[0].value = "修改数据";
			var [la,lb,lc] = [$("input[name=sex]"),$("input[name=hy]"),$("input[name=ifo]")];
			person(g[0],g[1],choose(la,f,1),choose(la,f,0),choose(lb,f,0),lc[0].value,lc[1].value);
			[c[2].innerHTML,c[3].innerHTML] = [choose(la,f,0),choose(lb,f,0)];
			[c[4].innerHTML,c[5].innerHTML] = [lc[0].value,lc[1].value];
			e[1].style.display = "inline-block";
			e[0].style.display = "none";
			e[1].innerHTML = choose(la,f,1);			
		}
		bool=!bool;
	}
	

	a[0].onclick=()=>{
		click(bool);
	}
	
}
function choose(x,y,z) {
	if (x[0].checked==true&&z==0) {
		return x[0].value;
	}
	else if (z) {
		for (var i = 0;i<y.length;i++) {
			if (y[i].selected) {
				return y[i].value;
			}
		}
	}
	else{
		return x[1].value;
	}
}
function card() {
	var a = $(".card-da span");
	var b = $(".card-da input");
	for(let i=0;i<2;i++){
		$(b[i]).one('click',()=>{
			$(a[i]).html(gettime(0));
			$.post("date.php",{
				"daka":{
					"date":gettime(1),
				    "intime":a[0].innerText,
				    "outtime":a[1].innerText,
				    "situation":"出勤"
				}
			},function(e){
				console.log(JSON.parse(e).p1);
			});
		});
	}
}
function gettime(n) {
	var t = new Date();
	var [h,mi,s] = [t.getHours(),t.getMinutes(),t.getSeconds()];
	var [y,mo,d] = [t.getFullYear(),t.getMonth()+1,t.getDate()];
	var x = h+":"+mi+":"+s;
	var z = y+"."+mo+"."+d;
	if(n){
		return z;
	}
	else{
		return x;
	}
	
}
function person(username,number,department,sex,marrige,phone,mail) {
	var a = $(".person");
	$.post("person.php",{"user":{
		"number":number.innerText,
    	"userName":username.innerText,
		"department":department,
		"img":"weizhi",
		"sex":sex,
		"marrige":marrige,
		"phone":phone,
		"mail":mail}},function (e) {
					var json = JSON.parse(e);
					//console.log(json);
                	//p1(a[0],a[1],a[2],a[3],a[4],a[5],a[6],json);
                });	
}
function p1(username,number,department,sex,marrige,phone,mail,json) {
	username.innerHTML = json.userName;
	number.innerHTML = json.number;
	department.innerHTML = json.department;
	sex.innerHTML = json.sex;
	marrige.innerHTML = json.marrige;
	phone.innerHTML = json.phone;
	mail.innerHTML = json.mail;
}
function p(m1,n1,j1,m2,n2,j2,json) {
	m1.innerHTML = json.userName;
	n1.innerHTML = json.number;
	j1.innerHTML = json.department;
	m2.innerHTML = json.userName;
	n2.innerHTML = json.number;
	j2.innerHTML = json.department;
}
function cardtime() {
	var b =$("card-timer");

}
function qingjia() {
	var [n,a,x] = [$(".apf-sub input"),$(".apf-dcr textarea"),$(".apf-u2 input")];
	var [n2,a2,x2] = [$(".otf-sub input"),$(".otf-dcr textarea"),$(".otf-u2 input")];
	var t = $("input[name=thing]");
	var p = $(".person");
	n[1].onclick=()=>{
		$.post("date.php",{
			"leaveApplication":{
				"userName":p[7].innerText,
	            "number":p[8].innerText,
	            "department":p[9].innerText,
	            "startTime0":x[0].value,
	            "endTime0":x[1].value,
	            "leaveType":choose(t,null,0),
	            "leaveReason":a[0].value,
	            "jinji":n[0].selected,
	            "leaveApplicationBtn":"on"
			}
		},function(){});
		console.log(x[0].value,x[1].value,choose(t,null,0),a[0].value,n[0].checked);
	}
	n2[1].onclick=()=>{

	}
}
window.onload=function(){
	var a = $(".person");
	var b =$(".card-timer");
	$.ajax({
                type:"post",
                url:"user.php",
                data:{},
                success:function (e) {
                    var json = JSON.parse(e);
                    //a[0].innerHTML = json.userName;
                	p1(a[0],a[1],a[2],a[3],a[4],a[5],a[6],json);
                	p(a[7],a[8],a[9],a[10],a[11],a[12],json);
                	$(b[0]).html("今天是"+gettime(1));
                	console.log(b);
                }
            });
}

navLetf();
ajax();
manChange();
card();
qingjia();
console.log("assd");