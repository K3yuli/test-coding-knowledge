
else{
    window.clearInterval(update);
    c = "."
    message001.innerHTML = "All Done!";
    message002.innerHTML = "";
    message003.innerHTML = "";
    message004.innerHTML = "<button class=buttons002 onclick repeat002"

}

function begin(){
    c = 90;
}

function timer(){
    c = c - 1;
    if(c < 90) {
        time.innerHTML = c;
    }
    if (c < 1) {
        window.clearInterval(update);
        message001.innerHTML = "All Done!";
        message002.innerHTML = "";
        message003.innerHTML = "";
        message004.innerHTML = "<button class=buttons002 onclick repeat002"
    }
}