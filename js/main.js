/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global intel:false*/

/*
 * This function runs once the page is loaded, but the JavaScript bridge library is not yet active.
 */
var init = function () {  

};

window.addEventListener("load", init, false);  

// Prevent Default Scrolling  
var preventDefaultScroll = function(event) 
{
    // Prevent scrolling on this element
    event.preventDefault();
    window.scroll(0,0);
    return false;
};
    
window.document.addEventListener("touchmove", preventDefaultScroll, false);

/*
 * Device Ready Code 
 * This event handler is fired once the JavaScript bridge library is ready
 */
function onDeviceReady()
{
    //lock orientation
    intel.xdk.device.setRotateOrientation("portrait");
    intel.xdk.device.setAutoRotate(false);
        
    //manage power
    intel.xdk.device.managePower(true,false);

    //hide splash screen
    intel.xdk.device.hideSplashScreen();      

    //Watch acceleration
    intel.xdk.accelerometer.watchAcceleration(onsuccess, options);  

}
    
document.addEventListener("intel.xdk.device.ready",onDeviceReady,false); 
      
//function that modifies the position of the arrow
function onsuccess(acceleration) 
{
    var Acceleration_X = acceleration.x;
    var Acceleration_Y = acceleration.y;
    var arrow = document.getElementById("imagearrow");
    var rotation_anglex = Math.round(Acceleration_X* 10) / 10;

    if(Acceleration_Y<=0)
    {
        arrow.style.webkitTransform = "rotate("+(rotation_anglex*-100)+"deg)";
        arrow.style.transform = "rotate("+(rotation_anglex*-100)+"deg)";
    }
    else
    {  
        if(Acceleration_X>0 || Acceleration_X<0)
        {
            arrow.style.webkitTransform = "rotate("+(180-(rotation_anglex*-100))+"deg)";
            arrow.style.transform = "rotate("+(180-(rotation_anglex*-100))+"deg)";
        }
    }
}

//Options for watch accelaration
var options = { frequency: 150, adjustForRotation: false }; 

