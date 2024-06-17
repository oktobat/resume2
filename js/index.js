// console.log($('.section').eq(0).offset().top)
// console.log($('.section').eq(1).offset().top)
// console.log($('.section').eq(2).offset().top)
// console.log($('.section').eq(3).offset().top)

function autoClock(){
    let today = new Date()
    let year = today.getFullYear()
    let month = today.getMonth()+1
    let date = today.getDate()
    let weekday = today.getDay()
    switch(weekday) {
        case 0 : weekday = "일"; break;
        case 1 : weekday = "월"; break;
        case 2 : weekday = "화"; break;
        case 3 : weekday = "수"; break;
        case 4 : weekday = "목"; break;
        case 5 : weekday = "금"; break;
        case 6 : weekday = "토"; break;
    }
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    if (hours>=0 && hours<10) { hours = '0'+hours }
    if (minutes>=0 && minutes<10) { minutes = '0'+minutes }
    if (seconds>=0 && seconds<10) { seconds = '0'+seconds }
    $('.autoClock > span').eq(0).text(year)
    $('.autoClock > span').eq(1).text(month)
    $('.autoClock > span').eq(2).text(date)
    $('.autoClock > span').eq(3).text(weekday)
    $('.autoClock > span').eq(4).text(hours)
    $('.autoClock > span').eq(5).text(minutes)
    $('.autoClock > span').eq(6).text(seconds)
}
// 이름있는함수 호출
autoClock()

// setInterval(함수, 시간) : 시간간격마다 반복 실행되는 메서드(p.415)
let timer = setInterval(autoClock, 1000)

$('.autoClock').hover(
    function(){
        clearInterval(timer)
    },
    function(){
        timer = setInterval(autoClock, 1000)
    }
)



let sectArray = []
function sectDist(){
    for (let i=0; i<$('.section').length; i++) {
        sectArray[i] = $('.section').eq(i).offset().top
    }
}
sectDist()
// console.log(sectArray)

$(window).on('resize', function(){
    sectDist()
    // console.log(sectArray)
})


$(window).on('scroll', function(){
    let sct = $(this).scrollTop()
    // console.log(sct)
    if ( sct>=sectArray[0] && sct<sectArray[1] && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer > div').removeClass('on')
        $('.autoClock').css({
            left:'300px',
            top:'100px'
        })
    } else if ( sct>=sectArray[1] && sct<sectArray[2] && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer > div').hasClass('on') ) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
        $('.autoClock').css({
            left:'50%',
            top:'100px',
        })
    } else if ( sct>=sectArray[2] && sct<sectArray[3] && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
        $('.autoClock').css({
            left:'90%',
            top:'90%'
        })
    } else if ( sct>=sectArray[3] && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
        $('.autoClock').css({
            left:'10%',
            top:'10%'
        })
    } 
})    

$('.section').on('wheel DOMMouseScroll', function(e){
    let delta = e.originalEvent.wheelDelta
    // delta>0 이면 마우스휠을 위로 굴린 것이고,
    // delta<0 이면 마우스휠을 아래로 굴린 것임
    console.log(delta)
    if (delta>0) {
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 500)
    } else {
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 500)
    }
})

let cflag = false;
$('#menu li a').on('click focus', function(e){
   e.preventDefault()
   cflag = true;
   let num = $(this).parent().index()
   // console.log(num)
   $(this).parent().addClass('on').siblings().removeClass('on')

   if (num<1) {
        $('.skillContainer > div').removeClass('on')
    } else {
        if ( !$('.skillContainer > div').hasClass('on')) {
            $('.skillContainer > div').addClass('on')
            count(70, '.html', 10)
            count(60, '.css', 20)
            count(80, '.script', 30)
            count(60, '.jquery', 40)
            count(50, '.react', 50)
        }
    }

    if (num<2) {
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({
            transitionDelay:'0s'
        })
    } else {
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
        }
        $('#sect3').addClass('on')
    }

   $('html, body').animate({
      scrollTop: sectArray[num]
   }, 500, function(){ cflag = false })
})


function count(jumsu, cname, time) {
    let count = 0
    let stop = setInterval(function(){
        count++
        if (count<=jumsu) {
            $(cname).find('.myscore').text(count+'%')
        } else {
            clearInterval(stop)
        }
    }, time)
}

// 첫번째 섹션의 슬릭슬라이더
$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})


