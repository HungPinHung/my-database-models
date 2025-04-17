addEventListener("load", async function(){
    const web_config = await Get_Identifier();
    const web_identifier_key = Object.keys(web_config);


    for(let i = 0; i < web_identifier_key.length; i++){
        let web_identifier_object = document.querySelectorAll("[web_identifier" + "=" + web_identifier_key[i] + "]");
        for(let j = 0; j < web_identifier_object.length; j++){
            if(web_config[web_identifier_key[i]].type == "image"){
                web_identifier_object[j].src = web_config[web_identifier_key[i]].content;
            }else if(web_config[web_identifier_key[i]].type == "text"){
                web_identifier_object[j].innerHTML = web_config[web_identifier_key[i]].content;
            }
        }
    }
});


async function Get_Identifier(){
    const response = await fetch('web_config.json');
    const data = await response.json();
    return data;
}