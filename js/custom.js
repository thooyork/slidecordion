slidecordion = {};

slidecordion.module = (function(){
    var to;
    var cssContainer = '.sc-container';
    var cssItem = '.item';
    var cssClose = '.close';
    var ww = $(window).width();
    var bp = 768;
    
    var setInitialWidth = function($items, len){
        var percentWidth;
        
        if (len > 0){
            (ww >= bp) ? percentWidth = (100/len) : percentWidth = 100;
            $items.each(function(idx,val){
                $(this).css('width',percentWidth+'%');
            });
        }
    };

    var setActiveWidth = function($items, len, $activeItem){
        var inactiveWidth = 5;
        var activeWidth;

        if (len > 0 && ww >= bp){
            activeWidth = 100 - (inactiveWidth*(len-1));
            $items.each(function(idx,val){
                $(this).css('width', inactiveWidth+'%');
            });
            $activeItem.css('width', activeWidth+'%');
        }
    };

    var setOpenClass = function(){
        $(cssContainer).addClass('is-open');
    };

    
    var bindEvents = function($items){

                $items.on('click',function(e){
                    var me = $(this);
                    var img = me.attr('data-img');

                    setActiveWidth($items, $items.length, me);
                    setOpenClass();

                    $('.active').removeClass('active');
                    me.addClass('active');

                    /*
                    $(cssContainer).fadeTo(300, 0, function(){
                        $(this).css('background-image', 'url(assets/'+img+')');
                    }).fadeTo(300, 1);
                    */
                    
                }).on('mouseover', function(e){
                    var me = $(this);
                    if(!$(cssContainer).hasClass('is-open')){
                        me.addClass('reveal');
                    }
                    else if(!me.hasClass('active')){
                        me.addClass('hover');
                    }
                }).on('mouseout',function(e){
                    var me = $(this);
                    me.removeClass('reveal').removeClass('hover');
                });


                $(cssClose).on('click', function(e){
                    e.stopPropagation();
                    $('.active').removeClass('active');
                    $(cssContainer).removeClass('is-open');
                    setInitialWidth($(cssItem), $(cssItem).length);
                });


                $(window).resize(function(){
                    clearTimeout(to);
                    ww = $(window).width();
                    var that = this;
                    to = setTimeout(function(){
                        slidecordion.module.init();
                    },250);
                });
        
    };

    var init = function($items, len){
        var $items = $(cssItem);
        var len = $items.length;
        setInitialWidth($items, len);
        bindEvents($items);
        $(cssContainer).removeClass('is-open');
    };

    return {
 		init:init
    };

}());





