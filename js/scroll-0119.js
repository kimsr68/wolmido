$(function(){
   //메뉴를 클릭하면 그 메뉴에 해당하는 section으로 이동
    $('nav ul li a').click(function(){
        //클릭한 a태그의 href속성을 가져와서 attrib변수에 저장
        //this:클릭한 a태그 가리킴
        //attr():객체의 속성을 가져옴
        var attrib=$(this).attr('href');
        //alert(attrib);
        //scrollTop:브라우저화면의 맨 위쪽 이동 위치
        //offset():객체 간의 거리를 구하는 메서드
        //top:객체의 위쪽 위치값을 나타내는 속성
        $('html,body').stop().animate({
            scrollTop:$(attrib).offset().top
        });
    });
    //top버튼을 클릭하면 맨 위로 이동
    $('.top').click(function(){
        $('html,body').stop().animate({
            scrollTop:0
        });
    });
    //윈도우 객체에 스크롤 이벤트 설정
    $(window).scroll(function(){
       //윈도우 객체의 스크롤탑 값이 100보다 크면 header에 active 클래스 추가하고 아니면 activr 클래스 제거
        if($(this).scrollTop()>100){
          $('header').addClass('active');  
        }else{
            $('header').removeClass('active');
        }
    });
    //마우스 휠 방향을 지정하는 변수 선언
    var dir="up";
    //section 객체에 마우스휠 이벤트 설정
    $('section').each(function(){
        //section객체에 마우스휠이벤트 설정
        //on() : 이벤트를 2개 이상 설정할때 사용하는 메서드
        //mousewheel : 크롬, IE, 사파리, 오페라 브라우저에서 사용
        //DOMMouseScroll : 파이어폭스
        //e : 마우스휠이벤트의 속성을 갖고 있는 매개변수
        $(this).on("mousewheel DOMMouseScroll", function(e){
                   //마우스휠의 delta값 설정
            var delta=0;
            //만약 event변수값이 false이면 윈도우의 event값을 event변수에 저장
            if(!event) {
                event=window.event;
            }
            //만약 event의 휠델타값이 true이면 휠델타/120
            if(event.wheelDelta){
                delta=event.wheelDelta /120;
                //만약 브라우저가 opera이면 delta값 음수처리
                if(window.opera){
                    delta=-delta;
                }
            }else if(event.detail){
                delta=-event.detail/3;
            }
            //moveTop변수 선언
            var moveTop=0;
            //만약 delta값이 0보다 작으면(마우스휠을 아래로 굴리면)
            if(delta<0){
                if($(this).next()!=undefined){
                    //next()다음 형제객체
                    moveTop=$(this).next().offset().top;
                }
                //delta값이 0보다 크면(마우스휠을 위로 굴리면)
            }else{
                if($(this).prev()!=undefined){
                    //prev():이전 형제객체
                    moveTop=$(this).prev().offset().top;
                }
            }
            //윈도우 이동
            $('html,body').stop().animate({
                scrollTop:moveTop
            });
        });
    });
});