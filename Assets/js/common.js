let menuOpner = document.querySelector(".open_menu");
let navBar = document.querySelector('.navbar')
let menuCloser =  document.querySelector(".mobile_colser");
menuOpner.addEventListener("click", function(){
            navBar.style.display="block"
        })
    menuCloser.addEventListener("click", function(){
        navBar.style.display="none"
        menuOpner.style.display="block";
})