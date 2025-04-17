function Switch_Permission(element){
    //取得所有class為permission_option selected的元素
    let permission_selected_options = document.querySelector(".permission_option.selected");

    //將permission_option的selected狀態設為false
    permission_selected_options.classList.remove("selected");

    //將element的selected狀態設為true
    element.classList.add("selected");
}

async function Login(){
    //取得登入模式
    let User = document.querySelector("[Login_Role_tag='User']");

    //取得輸入框
    let SSN = document.querySelector("[Login_Role_tag='SSN']");
    let ID = document.querySelector("[Login_Role_tag='ID']");
    let Password = document.querySelector("[Login_Role_tag='Password']");

    //建立陣列登入資訊
    let login_info = {
        Role: User.classList.contains("selected") ? "User" : "Service",
        SSN: SSN.value,
        ID: ID.value,
        Password: Password.value
    }

    //建立連線
    const get_UUID = await fetch("__SQL/Login.php?SSN=" + login_info.SSN + "&ID=" + login_info.ID + "&PASSWORD=" + login_info.Password + "&TYPE=" + login_info.Role);
    const get_UUID_result = await get_UUID.text();

    if(get_UUID_result == "error"){
        alert("帳號或密碼錯誤");
        return false;
    }

    //將獲得到的UUID儲存於cookie中
    document.cookie = "UUID=" + get_UUID_result;

    //Role
    document.cookie = "Role=" + login_info.Role;

    //導向首頁
    window.location.href = "index.html";
}


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}