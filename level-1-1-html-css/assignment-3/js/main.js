// function next() {
//     console.log("next");
// }
// function prev() {
//     console.log("prev");
// }

$(document).ready(function(){
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        navText: ["",""],
        responsive: {
            0: {
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});

