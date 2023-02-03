window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
})



//   $(document).ready(function(){
//   $("a[href*='#']").on("click", function(e){
//     var anchor = $(this);
//     $('html, body').stop().animate({
//       scrollTop: $(anchor.attr('href')).offset().top
//     }, 777);
//     e.preventDefault();
//     return false;
//   });
// });

$('.scrollto a').on('click', function() {

    let href = $(this).attr('href');

    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, {
        duration: 1900,   // по умолчанию «400» 
        easing: "linear" // по умолчанию «swing» 
    });

    return false;
});
