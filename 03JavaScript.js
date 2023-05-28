//城市编码
var cityadcode;
//1、获取城市编码
$.ajax({
    url: "https://restapi.amap.com/v3/ip?key=e36f2179ed408a3d3815223a32f1e5ff",
    //{"status":"1","info":"OK","infocode":"10000","province":"湖南省","city":"娄底市","adcode":"431300","rectangle":"111.8876195,27.63876123;112.1088374,27.82218773"}
    type: "GET",
    dataType: "json",
    success:
        function (data) {
            cityadcode = data.adcode;
            displayData1(data)
        }
});
//改变HTML页面
var displayData1 = function (data) {
    console.log("城市:");
    console.log(cityadcode);
    document.getElementById('lblCity').innerHTML = data.city;
}
//2、设置获取天气URL
var WeatherUrl = "https://restapi.amap.com/v3/weather/weatherInfo?city=421300&key=e36f2179ed408a3d3815223a32f1e5ff";
//{"status":"1","count":"1","info":"OK","infocode":"10000","lives":[{"province":"湖南","city":"娄底市","adcode":"431300","weather":"阴","temperature":"22","winddirection":"西北","windpower":"≤3","humidity":"73","reporttime":"2022-11-28 12:01:50"}]}
var url = new URL(WeatherUrl);
//设置city参数
url.searchParams.set('city', cityadcode);
//3、获取天气
$.ajax({
    url: WeatherUrl,
    type: "GET",
    dataType: "json",
    success:
        function (data) {
            adcode = data.adcode;
            displayData2(data)
        }
});
//改变HTML页面
var displayData2 = function (data) {
    console.log("天气:");
    console.log(data);
    document.getElementById('lblWeather').innerHTML = data.lives[0].weather;
    document.getElementById('lblTemperature').innerHTML = data.lives[0].temperature +"°C";
    document.getElementById('lblTime').innerHTML = data.lives[0].reporttime;
}

var login = document.getElementById('login');
var bg = document.getElementById('bg');
// 1.点击"编辑"弹出登录框,弹出登录窗口和遮盖层
var adminBtn = document.getElementById('adminBtn');
adminBtn.onclick = function () {
    login.style.display = "block";
    bg.style.display = "block";
    return false;
}
// 2.点击"关闭",隐藏登录窗口和遮盖层
var closeBtn = document.getElementById('closeBtn');
closeBtn.onclick = function () {
    login.style.display = "none";
    bg.style.display = "none";
    return false;
}
// 3.鼠标拖拽功能
var login_title = document.getElementById('login-title');
login_title.onmousedown = function (e) {
    e = e || window.event;
    var x = e.pageX || e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    var y = e.pageY || e.clientY + (document.body.scrollTop || document.documentElement.scrollTop);

    var boxX = login.offsetLeft;
    var boxY = login.offsetTop;

    var mouse_in_boxX = x - boxX;
    var mouse_in_boxY = y - boxY;

    document.onmousemove = function (e) {
        var x = e.pageX || e.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
        var y = e.pageY || e.clientY + (document.body.scrollTop || document.documentElement.scrollTop);

        login.style.left = x - mouse_in_boxX + 256 + 'px';
        login.style.top = y - mouse_in_boxY - 142 + 'px';
    }
}
login_title.onmouseup = function () {
    document.onmousemove = null;
}
//4.点击"登录"，提交表单
var UsernameInput = document.getElementById("UsernameInput");
var PasswordInput = document.getElementById('PasswordInput');
var loginBtn = document.getElementById('loginSubmit');
var userlist, users;
var httpRequest;
function getUsers() {
    //(1)向服务器发出请求
    httpRequest = new XMLHttpRequest();
    //(2)请求后，收到回复前，设置onreadystatechange对象的属性，来告诉XMLHttp请求对象哪个JavaScript函数将处理响应，
    httpRequest.onreadystatechange = searchUser;
    //(3)收到响应后，再调用HTTP请求对象的open()和send()方法来实际发出请求，
    // open('请求类型','URL',可选|请求是否异步(默认true))
    httpRequest.open('GET', "getUserList");
    httpRequest.send();
    console.log();
}
function searchUser(){
    //获取用户输入
    var UsernameInput, PasswordInput;
    UsernameInput = document.getElementById("UsernameInput").value;
    PasswordInput = document.getElementById("PasswordInput").value;
    console.log(UsernameInput);
    console.log(PasswordInput);
    //(4)检查请求状态，如状态的值为xml...DONE，表已收到完整的服务器响应
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        //(5)检查HTTP响应状态码
        if (httpRequest.status === 200) {
            //(6)对服务器发送的数据进行操作，需要两个方法：
            //httpRequest.responseText –以文本字符串形式返回服务器响应
            //httpRequest.responseXML–将响应作为XMLDocument可以使用JavaScript DOM函数遍历的对象返回  
            console.log(httpRequest.responseText);
            //报错
            userlist = JSON.parse(httpRequest.responseText);
            console.log(userlist);
            users = userlist.userList;
            console.log(users);
            //遍历搜索
            for (var i = 0; i < users.length; i++) {
                var username, password;

                username = users[i]["username"] == undefined ? "" : users[i]["username"];
                password = users[i]["password"] == undefined ? "" : users[i]["password"];

                if (username == UsernameInput && password == PasswordInput) {   //登录成功
                    console.log("Login-Success");
                    //返回界面
                    login.style.display = "none";
                    bg.style.display = "none";
                    //进入个人主页内容修改页面
                    editcontract();
                    return false;

                } else {        //登录失败
                    console.log("Login-Wrong");
                    login.style.display = "none";
                    bg.style.display = "none";
                    return false;
                }
            }
        } else {
            alert(httpRequest.responseText);
        }
    }
}
var containerindex = 0;
function insertPro() {
    for (i = 1; i <= index; i++){
        console.log("index : "+index);
        var Projections = document.getElementsByClassName("newblock").item(containerindex);
        Projections.innerHTML="<div class=\"block\" id=\"thisblock\">\n" +
            "        <div class=\"block-title\" id=\"thistitle\">\n" +
            "          Deepfake 检测\n" +
            "        </div>\n" +
            "        <div class=\"block-subtitle\" id=\"thissubtitle\">\n" +
            "          参与者\n" +
            "        </div>\n" +
            "        <div class=\"block-content\" id=\"thiscontext\">\n" +
            "          待补充……\n" +
            "        </div>\n" +
            "        <div class=\"editBtns\" id=\"editBtns\" style=\"display: none\">\n" +
            "          <button class=\"editbtn\" type=\"button\" id=\"deleteBtn\" value=\"删除\" data-index=\"0\" onclick=\"delPro(event)\" >删除</button>\n" +
            "          <button class=\"editbtn\" type=\"button\" id=\"changeBtn\" value=\"修改\" data-index=\"0\" onclick=\"savePro(event)\">修改</button>\n" +
            "        </div>\n" +
            "      </div>\n" +
            "      <div class=\"newblock\" >\n" +
            "\n" +
            "      </div>";
        containerindex++;
        setPro1(i)  //设置组件的id值，设置按钮的data-index属性
        setlocal(i) //获取localStorage中的数据，设置组件的内容
    }
}

//获取localStorage中的数据，设置组件的内容
function setlocal(i){
    var ContextItem = document.getElementById("thiscontext"+String(i));
    var SubTitleItem = document.getElementById("thissubtitle"+String(i));
    var TitleItem = document.getElementById("thistitle"+String(i));
    //1、项目标题
    var proTitleInput = localStorage.getItem("protitlekey"+String(i));
    console.log(proTitleInput);
    TitleItem.innerHTML=proTitleInput;
    //2、项目子标题
    var proSubtitleInput = localStorage.getItem("prosubtitlekey"+String(i));
    console.log(proSubtitleInput);
    SubTitleItem.innerHTML=proSubtitleInput;
    //3、项目内容
    var procontextInput = localStorage.getItem("procontextkey"+String(i));
    console.log(procontextInput);
    ContextItem.innerHTML=procontextInput;
}

var emailobj = document.getElementById("email");
var telobj = document.getElementById("Tel");
var emaid = document.getElementById("emaildiv");
var teld = document.getElementById("Teldiv");
//支持修改邮箱、电话、修改专业
function editcontract() {
    emailobj.style.display = "none";
    emaid.style.display = "block";
    telobj.style.display = "none";
    teld.style.display = "block";
    //使按钮可见
    document.getElementById("addBtn0").style.display = "block";
    document.getElementById("editBtns0").style.display = "block";
    //项目经历可编辑
    document.getElementById("thiscontext0").setAttribute("contentEditable","true")
    document.getElementById("thissubtitle0").setAttribute("contentEditable","true")
    document.getElementById("thistitle0").setAttribute("contentEditable","true")
    //选择图片按钮可见
    document.getElementById("changeimg").style.display = "block";
    //设置上一次添加的projects按钮可见,且可编辑
    setBtnvisiable();
}

function setBtnvisiable(){
    for (i = 1; i <= index; i++){
        document.getElementById("editBtns"+String(i)).style.display = "block";
        //使得项目经历可编辑
        document.getElementById("thiscontext"+String(i)).setAttribute("contentEditable","true");
        document.getElementById("thissubtitle"+String(i)).setAttribute("contentEditable","true");
        document.getElementById("thistitle"+String(i)).setAttribute("contentEditable","true");
    }
}

var TelInput = "null";
var EmailInput = "null";
// 1.改变邮箱，回车
var emailobj1 = document.getElementById('email1');
emailobj1.onkeyup = function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        EmailInput = document.getElementById("email1").value;
        localStorage.setItem("emailkey",EmailInput);
        console.log(localStorage.getItem("emailkey"));
        emailobj.innerHTML = EmailInput;
        emailobj.style.display = "block";
        emaid.style.display = "none";
    }
    return false;
}
// 2.改变电话号码，回车
var telobj1 = document.getElementById('Tel1');
telobj1.onkeyup = function (e) {
    e.preventDefault();
    if (e.keyCode === 13) {
        TelInput = document.getElementById("Tel1").value;
        localStorage.setItem("Telkey",TelInput);
        console.log(localStorage.getItem("Telkey"));
        telobj.innerHTML = TelInput;
        telobj.style.display = "block";
        teld.style.display = "none";
    }
    return false;
}

//添加按钮
function addPro(){
    console.log("index : "+index);
    var Projections = document.getElementsByClassName("newblock").item(containerindex);
    Projections.innerHTML="<div class=\"block\" id=\"thisblock\">\n" +
        "        <div class=\"block-title\" id=\"thistitle\">\n" +
        "          Deepfake 检测\n" +
        "        </div>\n" +
        "        <div class=\"block-subtitle\" id=\"thissubtitle\">\n" +
        "          参与者\n" +
        "        </div>\n" +
        "        <div class=\"block-content\" id=\"thiscontext\">\n" +
        "          待补充……\n" +
        "        </div>\n" +
        "        <div class=\"editBtns\" id=\"editBtns\" >\n" +
        "          <button class=\"editbtn\" type=\"button\" id=\"deleteBtn\" value=\"删除\" data-index=\"0\" onclick=\"delPro(event)\" >删除</button>\n" +
        "          <button class=\"editbtn\" type=\"button\" id=\"changeBtn\" value=\"修改\" data-index=\"0\" onclick=\"savePro(event)\">修改</button>\n" +
        "        </div>\n" +
        "      </div>\n" +
        "      <div class=\"newblock\" >\n" +
        "\n" +
        "      </div>";
    containerindex++;
    index = index+1 ;
    console.log("containerindex : "+containerindex);
    console.log(index);
    localStorage.setItem("itemindex",index);
    setPro2();
}

//设置组件的id值，设置按钮的data-index属性
function setPro1(i) {
    //设置data-index
    document.getElementById("deleteBtn").setAttribute("data-index",String(i));
    document.getElementById("changeBtn").setAttribute("data-index",String(i));
    //设置ID避免重复
    document.getElementById("thissubtitle").id="thissubtitle"+String(i);
    document.getElementById("thistitle").id="thistitle"+String(i);
    document.getElementById("thisblock").id="thisblock"+String(i);
    document.getElementById("thiscontext").id="thiscontext"+String(i);
    document.getElementById("deleteBtn").id="deleteBtn"+String(i);
    document.getElementById("changeBtn").id="changeBtn"+String(i);
    document.getElementById("editBtns").id="editBtns"+String(i);
}
function setPro2() {
    //使得项目经历可编辑
    document.getElementById("thiscontext").setAttribute("contentEditable","true");
    document.getElementById("thissubtitle").setAttribute("contentEditable","true");
    document.getElementById("thistitle").setAttribute("contentEditable","true");
    //设置data-index
    document.getElementById("deleteBtn").setAttribute("data-index",String(index));
    document.getElementById("changeBtn").setAttribute("data-index",String(index));
    //设置ID避免重复
    document.getElementById("thissubtitle").id="thissubtitle"+String(index);
    document.getElementById("thistitle").id="thistitle"+String(index);
    document.getElementById("thisblock").id="thisblock"+String(index);
    document.getElementById("thiscontext").id="thiscontext"+String(index);
    document.getElementById("deleteBtn").id="deleteBtn"+String(index);
    document.getElementById("changeBtn").id="changeBtn"+String(index);
    document.getElementById("editBtns").id="editBtns"+String(i);
}
//删除键
function delPro(e) {
    const di = e.target.getAttribute("data-index");
    console.log('div[data-index=%s] click',e.target.getAttribute("data-index"));//输出被点击对象的序号
    const Item = document.getElementById("thisblock"+di);
    Item.parentNode.removeChild(Item);
}

//修改键
function savePro(e) {
    const di = e.target.getAttribute("data-index");
    const ContextItem = document.getElementById("thiscontext"+di);
    const SubTitleItem = document.getElementById("thissubtitle"+di);
    const TitleItem = document.getElementById("thistitle"+di);
    console.log("document.getElementById(thiscontext).id : "+ContextItem.id);
    //1、项目标题
    var proTitleInput = TitleItem.innerText;
    console.log(proTitleInput);
    TitleItem.innerHTML=proTitleInput;
    //2、项目子标题
    var proSubtitleInput = SubTitleItem.innerText;
    console.log(proSubtitleInput);
    SubTitleItem.innerHTML=proSubtitleInput;
    //3、项目内容
    var procontextInput = ContextItem.innerText;
    console.log(procontextInput);
    ContextItem.innerHTML=procontextInput;

    //设置localStorage
    localStorage.setItem("protitlekey"+di,proTitleInput);
    localStorage.setItem("prosubtitlekey"+di,proSubtitleInput);
    localStorage.setItem("procontextkey"+di,procontextInput);
}

