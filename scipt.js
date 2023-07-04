sessionStorage.setItem('IP',"");


$.getJSON("https://api.ipify.org?format=json", function(data) {
         
sessionStorage.setItem('IP',data.ip) ;
document.getElementById("ip").innerHTML = data.ip ;

})
function getData(){
    console.log("click");
    
        
        window.location.href = '/home' ;  
   
}