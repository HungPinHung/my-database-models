let Already_Loaded = false;

function Toggle_Menu() {
    let left_menu = document.querySelector(".left_menu");

    if (left_menu.classList.contains("opened")) {
        left_menu.classList.remove("opened");
    } else {
        left_menu.classList.add("opened");
    }
}

function User_Layout() {
    const disable_layout = ["employee_menu", "admin_menu", "developer"];

    if (!Already_Loaded)
        Close_Layout(disable_layout);
    else
        alert("Layout Already Loaded.");
}

function Employee_Layout() {
    const disable_layout = ["user_menu", "developer"];

    if (!Already_Loaded)
        Close_Layout(disable_layout);
    else
        alert("Layout Already Loaded.");
}

function Close_Layout(disable_layout) {
    for (let i = 0; i < disable_layout.length; i++) {
        document.querySelector("[selection_block_tag=" + disable_layout[i] + "]").setAttribute("style", "display: none !important");
        document.querySelector("[selection_block_tag=" + disable_layout[i] + "]").remove();
    }

    Already_Loaded = true;
}


addEventListener("load", function () {
   // if (getCookie("UUID") == "") {
     //   window.location.href = "login.html";
    //}

    let selection_element = document.querySelectorAll('.selection');
    for (i = 0; i < selection_element.length; i++) {
        selection_element[i].addEventListener('click', function () {
            let left_menu = document.querySelector(".left_menu");

            if (left_menu.classList.contains("opened"))
                Toggle_Menu();
        });
    }

    if (getCookie("Role") == "User")
        User_Layout();
})

let old_contextmenu = false;

window.oncontextmenu = function (event) {
    return open_contextmenu(event);
}

function open_contextmenu(event) {
    let menu_display_pos = {
        x: event.clientX,
        y: event.clientY,
        phone: false
    }

    if (menu_display_pos.x <= 1 && menu_display_pos.y <= 1)
        return false;

    if (document.documentElement.clientWidth < 1000 && document.documentElement.clientHeight < 1000) {
        menu_display_pos.x = document.documentElement.clientWidth / 2;
        menu_display_pos.y = document.documentElement.clientHeight / 2;
        menu_display_pos.phone = true;

        //return false;
    }

    let contextmenu = document.querySelector(".contentmenu");
    if (contextmenu.classList.contains("hidden") && !old_contextmenu)
        contextmenu.classList.remove("hidden");

    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const _1percent_vw = vw / 100;

    const menu_items = contextmenu.querySelectorAll(".contentmenu_selection").length;
    const split_items = contextmenu.querySelectorAll(".contentmenu_split_line").length;
    let menu_height = (menu_items * ((2 + 0.3) * _1percent_vw)) + (split_items * 3);

    let menu_width = (15 * _1percent_vw);

    if (menu_width < 200)
        menu_width = 200;

    if (event.clientX > window.innerWidth - menu_width && !menu_display_pos.phone) {
        menu_display_pos.x = event.clientX - menu_width;
    }

    if (event.clientY > window.innerHeight - menu_height && !menu_display_pos.phone) {
        menu_display_pos.y = event.clientY - menu_height;
    }

    contextmenu.setAttribute("style", "left: " + menu_display_pos.x + "px; top: " + menu_display_pos.y + "px;");

    return old_contextmenu;
}

let origin_size = document.documentElement.clientHeight;

addEventListener('resize', function (event) {
    if (document.documentElement.clientHeight != origin_size) {
        close_contextmenu();
        origin_size = document.documentElement.clientHeight;
    }
});

function close_contextmenu() {
    let contextmenu = document.querySelector(".contentmenu");
    contextmenu.classList.add("hidden");
}

function switch_old_contextmenu() {
    old_contextmenu = !old_contextmenu;
}

window.onclick = function () {
    if (document.documentElement.clientWidth < 1000 && document.documentElement.clientHeight < 1000)
        return false;

    let contextmenu = document.querySelector(".contentmenu");
    if (!contextmenu.classList.contains("hidden"))
        close_contextmenu();
}

function Bomb() {
    const rick_roll = '<iframe onload="document.querySelector(\'[aria-label="播放"]\').click();" style="width: 100vw; height: 100vh;" src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ykVfLzJtB3NniRXa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';

    document.body.innerHTML = rick_roll;
}


function switch_page(page) {
    let page_element = document.querySelector(".page_frame");

    page_element.src = "__PAGE/" + page + ".html";
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

function Logout() {
    document.cookie = "UUID=X;";
    document.cookie = "Role=X;";

    window.location.href = "login.html";
}