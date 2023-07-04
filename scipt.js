sessionStorage.setItem('IP',"");
function getData(){
    console.log("click");
    $.getJSON("https://api.ipify.org?format=json", function(data) {
         
        // Setting text of element P with id gfg
        console.log(typeof(data.ip));
        sessionStorage.setItem('IP',data.ip) ;
        document.getElementById("ip").innerHTML = data.ip ;
        window.location.href = '/home' ;  
    })

    // setTimeout(() => {
    //    window.location.href = '/home' ;  
    // }, 2000);
   
}