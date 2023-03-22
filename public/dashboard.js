let lodu = document.getElementById("offcanvas-nav");
    function openNav(){
        if(lodu.classList.contains('nagu')){
            lodu.style.width = "0px";     
            lodu.classList.remove('nagu');
        }else{
            lodu.classList.add('nagu');
            lodu.style.width = "350px"; 
        }
    }
