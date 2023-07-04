console.log("testing 2");
LatandLong();
var mess = "";
const IP = sessionStorage.getItem('IP');
var postalData ="";
console.log(IP);

            var latitude ="";
            var longitude ="";
// -------------------------------------------------------------------------------------------------------------------------------------------------
// 'https://ipinfo.io/${}/geo';
        const apiUrl = `https://api.ipgeolocation.io/ipgeo?apiKey=0419b14c5ada4212a91b453d842d2627&ip=${IP}` ;
        console.log(apiUrl);
        // const dynamicData = IP;
        
        // const url = `https://ipinfo.io/${IP}/geo`;
        // console.log(url);

        fetch(apiUrl)
        .then(response =>response.json())
        .then(data => {
        // Process the received data
        findCode(data);
        console.log(data);
        })
        .catch(error => {
        // Handle any errors
        console.error('Error:', error);
        });

var time_Zone ;
// -------------------------------------------------------------------------------------------------------------------------------------------------
function findCode(data){
        console.log(data.zipcode);
        //given TimeZone ;
        let chicago_datetime_str = new Date().toLocaleString("en-US", { timeZone: "America/Chicago" });
        time_Zone = chicago_datetime_str ;
        console.log(chicago_datetime_str);
        findPostals(data.zipcode) ;
        fillData(data);
}
// -------------------------------------------------------------------------------------------------------------------------------------------------
function findPostals(pincode){
    // pincode = 415401 ;
    const url = `https://api.postalpincode.in/pincode/${pincode}` ;

    fetch(url)
    .then((responce) => responce.json())
    .then((data)=>{
        console.log(data) ;

        //function call ;
        mess = data[0].Message ;
        console.log(mess) ;
        let postArr = data[0].PostOffice ;
        postalData = postArr ;

        


        showpost(postArr);
    })
}
// -------------------------------------------------------------------------------------------------------------------------------------------------
function LatandLong(){
            // var x = document.getElementById("demo");
        console.log("inside lat and log");
        
           getLocation();
            function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            } else { 
                x.innerHTML = "Geolocation is not supported by this browser.";
            }
            }

            function showPosition(position) {
            // x.innerHTML = "Latitude: " + position.coords.latitude + 
            // "<br>Longitude: " + position.coords.longitude;

             latitude =  position.coords.latitude;
             longitude = position.coords.longitude;
            console.log(`latitude is ${position.coords.latitude}`);
            console.log(`longitude is ${ position.coords.longitude}`) ;
            } 
            let locationBox = document.getElementsByClassName('location')[0];
            let map = document.createElement('div');
            map.innerHTML = `
            <iframe
             src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" 
             width="360" 
             height="270"
              frameborder="0" 
              style="border:0">
            </iframe>`;

            locationBox.appendChild(map);
}
// -------------------------------------------------------------------------------------------------------------------------------------------------
function showpost(data){
        let postsContainer = document.getElementsByClassName("postals")[0] ;

        while(postsContainer.firstChild){
            postsContainer.removeChild(postsContainer.firstChild);
        }

        console.log(postsContainer) ;


        console.log(data) ;

        data.forEach(post => {
            
            let div = document.createElement("div") ;
            div.className = 'pbox' ;
            div.innerHTML = `
                    <p id="p-name">Name : ${post.Name}</p>
                    <p id="p-branchName">Branch Type : ${post.BranchType}</p>
                    <p id="p-deliveryStatus">Delivery Status : ${post.DeliveryStatus}</p>
                    <p id="p-district">District : ${post.District}</p>
                    <p id="p-division">Division : ${post.Division}</p>
            `
            postsContainer.appendChild(div) ;
        });


}
// -------------------------------------------------------------------------------------------------------------------------------------------------
// fillData() ;
function fillData(data){

    //upper data
    let u_heading =           document.getElementById("ip-data");
    let u_latitude =           document.getElementById("latitude") ;
    let u_longitude =         document.getElementById("longitude") ;
    let u_city =                 document.getElementById("city") ;
    let u_region =             document.getElementById("region") ;
    let u_oraganization =   document.getElementById("organization") ;
    let u_hostName =        document.getElementById("hostname") ;

    u_heading.innerHTML = u_heading.innerText +"  " +IP ;

    u_latitude.innerHTML = u_latitude.innerText +  "   "  +latitude ;
    console.log(u_latitude);
    u_longitude.innerHTML = u_longitude.innerText +  "   "  +longitude ;

    u_city.innerHTML = u_city.innerText + "   "  +data.city ;
    u_region.innerHTML = u_region.innerText +  "   "  +data.state_prov ;

    u_oraganization.innerHTML = u_oraganization.innerText +  "   "  +data.organization ;
    u_hostName.innerHTML = u_hostName.innerText +  "   "  +data.time_zone.name ;
// ---------------------------------------------------------------------------------------------------------------?
//middle data 
  
let u_timezone = document.getElementById("timezone") ;
let u_dateAndTime = document.getElementById("dateAndTime") ;
let u_pincode = document.getElementById("pincode") ;
let u_message = document.getElementById("message")

let time = time_Zone.split(" ");
u_timezone.innerHTML = u_timezone.innerHTML + "  " +time[1] ;
u_dateAndTime.innerHTML = u_dateAndTime.innerText + " "+ time[0] ;
u_pincode.innerHTML = u_pincode.innerText + "  " +data.zipcode ;
console.log(mess) ;
//added data manually 
u_message.innerHTML = u_message.innerText + "   " + "Number of pincode(s) found:3";
}
document.getElementById("Filter").addEventListener('click',(e)=>{
    console.log("click");
    e.preventDefault();
})
// -------------------------------------------------------------------------------------------------------------------------------------------------
function filterData(){

    let filter_str = document.getElementById("Filter") ;
    let fvalue = filter_str.value ;
    if(fvalue.trim() === ""){
        alert("Enter valid text .........");
        return ;
    }
    filter_str.value = '';
    console.log(fvalue) ;
    console.log(postalData);
    let temp = postalData.filter((post) => {
        console.log(`(${fvalue} === ${post.Name}) || ${fvalue} === ${post.Division}`)
        if((fvalue === post.Name) || fvalue === post.Division){
            return post ;
        }
    })
    console.log(temp) ;
    showpost(temp) ;
}
// -------------------------------------------------------------------------------------------------------------------------------------------------