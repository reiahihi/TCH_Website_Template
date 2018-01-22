(function($) {
    $(document).ready(function(){

        $(".thumb-carousel").owlCarousel({
            autoPlay: true,
            items : 4,
            itemsDesktop : [1199,4],
            itemsDesktopSmall : [979,3],
            itemsTablet : [768, 2],
            itemsMobile : [479,2],
            navigation : false,
            navigationText : ["", ""],
            rewindNav : false,
            scrollPerPage : false,

            pagination : false,
        });

        $("#slide-store1").owlCarousel({
            autoPlay: false,
            slideSpeed : 1000,
            navigation: false,
            pagination: true,
            singleItem: true,
            autoHeight: true,
            navigationText : ["", ""],
        });

        $("#slide-store2").owlCarousel({
            autoPlay: false,
            slideSpeed : 1000,
            navigation: false,
            pagination: true,
            singleItem: true,
            autoHeight: true,
            navigationText : ["", ""],
        });
        $("#slide-store3").owlCarousel({
            autoPlay: false,
            slideSpeed : 1000,
            navigation: false,
            pagination: true,
            singleItem: true,
            autoHeight: true,
            navigationText : ["", ""],
        });

        $(".learnMore").click(function() {
            $('html, body').animate({
                scrollTop: $("#store").offset().top
            }, 1000);
        });

        $(".to-right-store").click(function() {
            $('html, body').animate({
                scrollTop: $("#right-store").offset().top
            }, 1000);
        });


        // $('#va-accordion').vaccordion({
        // 	accordionW		: $(window).width(),
        // 	accordionH		: $(window).height(),
        // 	visibleSlices	: 5,
        // 	expandedHeight	: 450,
        // 	animOpacity		: 0.1,
        // 	contentAnimSpeed: 100
        // });

        // jQuery.scrollSpeed(100, 800);

        // $("#to-top img").click(function() {
        // 	$('html,body').animate({
        //            scrollTop: 0
        //        }, 700);
        // });

        // var num = 50;
        // $("#to-top img").hide();
        // $(window).bind('scroll', function() {
        //     if ($(window).scrollTop() > num) {
        //         $("#to-top img").fadeIn();
        //         $(".thumb-carousel").addClass("hide-thumb");
        //     } else {
        //         $("#to-top img").fadeOut();
        //         $(".thumb-carousel").removeClass("hide-thumb")
        //     }
        // });
        $(window).load(function() {
            $("#to-top img").fadeOut(0).delay(4000).fadeIn(400);
        });
        $("#to-top img").click(function() {
            $(".ct-thumb-carousel").addClass("show-thumb");
            jQuery('html, body').animate({
                scrollTop: jQuery('#intro').offset().top
            }, 600);
            $(this).fadeOut("fast");
        });

        //// ---> Check issue element
        jQuery.fn.exists = function() {
            return jQuery(this).length;
        }

        // global vars
        var winWidth = $(window).width();
        var winHeight = $(window).height();
        var slideDescMtop = (($(".slideDesc").height() / 2 ) + 8) * -1;

        if($('.homeBxSlider').exists()){
            $('.homeBxSliderWrap').css({
                'height': winHeight
            });
            $('.homeBxSlider').css({
                'height': winHeight
            });
            $('.homeBxSlider .slide').css({
                'height': winHeight
            });
            $('.homeBxSlider .slide .slideDesc').css({
                'margin-top': slideDescMtop
            });

            $(window).resize( function(e)
            {
                var winWidth = $(window).width();
                var winHeight = $(window).height();
                $('.homeBxSliderWrap').css({
                    'height': winHeight
                });
                $('.homeBxSlider').css({
                    'height': winHeight
                });
                $('.homeBxSlider .slide').css({
                    'height': winHeight
                });
            });
        }


        if($('.homeBxSlider').exists()){
            var homeSlide = $('.homeBxSlider').bxSlider({
                mode:"fade",
                auto:true,
                speed:700,
                pause:4000,
                onSliderLoad: function(){
                    $('.homeBxSlider').addClass("ready");
                },
                onSlideAfter: function(){
                    var gcs = homeSlide.getCurrentSlide();
                    $('.homeBxSlider').find('.slide:not(li[data-slide="'+gcs+'"])').removeClass("active");
                    $('.homeBxSlider').find('.slide[data-slide="'+gcs+'"]').addClass("active");

                }
            });
        }

        if($('.contactGallery').exists()){
            var contactGallery = $('.contactGallery').find("ul").bxSlider({
                controls:false
            });
        }

        $(".teamItem").on("click", function(){
            var userDescId = $(this).data("userid");
            $("#"+userDescId).addClass("show");
        });

        $(".closeTeamDesc").on("click", function(){
            $(this).closest(".teamItemDesc").removeClass("show");
        });

        $(".miniCart").on("click", function(){
            $(this).closest(".contentWrap").addClass("showMiniCart");
        });
        $(".closeCartPopup").on("click", function(){
            $(this).closest(".contentWrap").removeClass("showMiniCart");
        });

        $('.country_to_state, .options select').selectric();

        $(".galleryThumbItem").on("click", function(e){
            e.preventDefault();
            if (!$(this).hasClass("active")) {
                $("a.galleryThumbItem.active").removeClass("active");
                $(this).addClass("active");
                var imgID = $(this).attr("href");
                $(".productGalleryWrap .current").removeClass("current");
                $(imgID).addClass("current");
            }
        });


        $(".categoryList span").on("click", function(){
            if ($(this).hasClass("clicked")) {
                $(this).removeClass("clicked").closest(".categoryList").find("ul").slideUp(300);
            } else {
                $(this).addClass("clicked").closest(".categoryList").find("ul").slideDown(300);
            }
        });

        $(document).on('click', function(e) {
            if (!$(e.target).parents().hasClass('categoryList') /*&& !$(e.target).hasClass('miniCartWrap')*/ )  {
                $(".categoryList").find("ul").slideUp(300);
                $(".categoryList span").removeClass("clicked");
            }
        });

        $(".classesFilter a").on("click", function(e){
            e.preventDefault();
            var filterData = $(this).data("filter");
            if (filterData == "all") {
                $(".classesFilter a.active").removeClass("active");
                $(this).addClass("active");
                $(".fc-content-skeleton a.fc-event.hide").removeClass("hide");
            } else {
                $(".classesFilter a.active").removeClass("active");
                $(this).addClass("active");
                $(".fc-content-skeleton a.fc-event.hide").removeClass("hide");
                $(".fc-content-skeleton a.fc-event").not("."+filterData).addClass("hide");
            }
        });


        $('body').on('click', 'button.fc-button', function() {
            $(".classesFilter a.active").removeClass("active");
            $(".classesFilter a[data-filter='all']").addClass("active");
        });

        $('.showMobileMenu').on("click", function(e){
            e.preventDefault();
            $(this).toggleClass('open').closest("body").toggleClass('animated');
        });



        /* Sticky */
        var sticky_navigation_offset_top = 0;
        var sticky_navigation = function(){
            var scroll_top = $(window).scrollTop();
            if (scroll_top > sticky_navigation_offset_top) {
                $('#header .headerWrap').addClass("is-sticky");
            } else {
                $('#header .headerWrap').removeClass("is-sticky");
            }
        };
        sticky_navigation();

        $(window).scroll(function() {
            sticky_navigation();
        });
        /* END Sticky */

        if (winWidth > 767) {
            $('div[data-type="parallax"]').each(function(){
                var $bgobj = $(this); // assigning the object
                var bgobjTop = $(this).offset().top;

                $(window).scroll(function() {
                    console.log($(window).scrollTop() + winHeight)
                    console.log(bgobjTop)

                    if ( ($(window).scrollTop() + winHeight) > bgobjTop )
                    {

                        var yPos = -(($(window).scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

                        // Put together our final background position
                        var coords = '50% '+ yPos + 'px';

                        // Move the background
                        $bgobj.css({ backgroundPosition: coords });
                    }
                });
            });
        }

        $(window).resize( function(e)
        {
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            if (winWidth > 767) {
                $('div[data-type="parallax"]').each(function(){
                    var $bgobj = $(this); // assigning the object
                    var bgobjTop = $(this).offset().top;

                    $(window).scroll(function() {
                        console.log($(window).scrollTop() + winHeight)
                        console.log(bgobjTop)

                        if ( ($(window).scrollTop() + winHeight) > bgobjTop )
                        {

                            var yPos = -(($(window).scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

                            // Put together our final background position
                            var coords = '50% '+ yPos + 'px';

                            // Move the background
                            $bgobj.css({ backgroundPosition: coords });
                        }
                    });
                });
            }
        });

    });
})(jQuery);

(function($) {
    $(window).load(function() {

    });
})(jQuery);



/*haravan*/
$(document).ready(function(){

    function addItem(form_id) {
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            dataType: 'json',
            data: $('#'+form_id).serialize(),
            success: Haravan.onSuccess,
            error: Haravan.onError
        });
    }

    $(".addtocart").click(function(e){

        var elem = $(this)
        $(elem).prop("disabled", true)

        e.preventDefault();
        addItem('add-item-form');

    });

    Haravan.onSuccess = function() {

        var elem = $('.addtocart');

        elem.removeAttr("disabled");

        var quantity = parseInt(jQuery('[name="quantity"]').val(), 10) || 1;
        $(elem).prop("disabled", false)
        var cartCount =  parseInt($('#cart-count').text()) + quantity;
        $('#cart-count').text(cartCount)
        getCartAjax();
        $('#myCart').modal('show');
        $('.modal-backdrop').css({'height':$(document).height(),'z-index':'99'});
    };

    Haravan.onError = function(XMLHttpRequest, textStatus) {
        // Haravan returns a description of the error in XMLHttpRequest.responseText.
        // It is JSON.
        // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
        var data = eval('(' + XMLHttpRequest.responseText + ')');
        if (!!data.message) {
            alert(data.message + '(' + data.status  + '): ' + data.description);
        } else {
            alert('Error : ' + Haravan.fullMessagesFromErrors(data).join('; ') + '.');
        }

        $('.addtocart').removeAttr("disabled");
    };

    Haravan.fullMessagesFromErrors = function(errors) {
        var fullMessages = [];
        jQuery.each(errors, function(attribute, messages) {
            jQuery.each(messages, function(index, message) {
                fullMessages.push(attribute + ' ' + message);
            });
        });
        return fullMessages;
    };

})

jQuery(document).ready(function(){

    if ( $('.slides li').size() > 1 ) {

        $('.flexslider').flexslider({
            animation: "slide",
            slideshow: true,
            animationDuration: 700,
            slideshowSpeed: 6000,
            animation: "fade",
            controlsContainer: ".flex-controls",
            controlNav: false,
            keyboardNav: true
        });
        //.hover(function(){ $('.flex-direction-nav').fadeIn();}, function(){$('.flex-direction-nav').fadeOut();});

    }

    $("select.loc_on_change").change(function(){
        if($(this).attr("value") == "#") return false;
        window.location = $(this).attr("value");
    });


});

jQuery(document).ready(function($){



    $("nav.mobile select").change(function(){ window.location = jQuery(this).val(); });
    $('#product .thumbs a').click(function(){

        $('#placeholder').attr('href', $(this).attr('href'));
        $('#placeholder img').attr('src', $(this).attr('data-original-image'))

        $('#zoom-image').attr('href', $(this).attr('href'));
        return false;
    });

    $('input[type="submit"], input.btn, button').click(function(){ // remove ugly outline on input button click
        $(this).blur();
    })

    $("li.dropdown").hover(function(){
        $(this).children('.dropdown').show();
        $(this).children('.dropdown').stop();
        $(this).children('.dropdown').animate({
            opacity: 1.0
        }, 200);
    }, function(){
        $(this).children('.dropdown').stop();
        $(this).children('.dropdown').animate({
            opacity: 0.0
        }, 400, function(){
            $(this).hide();
        });
    });

}); // end document ready

/* jQuery css bezier animation support -- Jonah Fox */

;(function($){

    $.path = {};

    var V = {
        rotate: function(p, degrees) {
            var radians = degrees * Math.PI / 180,
                c = Math.cos(radians),
                s = Math.sin(radians);
            return [c*p[0] - s*p[1], s*p[0] + c*p[1]];
        },
        scale: function(p, n) {
            return [n*p[0], n*p[1]];
        },
        add: function(a, b) {
            return [a[0]+b[0], a[1]+b[1]];
        },
        minus: function(a, b) {
            return [a[0]-b[0], a[1]-b[1]];
        }
    };

    $.path.bezier = function( params, rotate ) {
        params.start = $.extend( {angle: 0, length: 0.3333}, params.start );
        params.end = $.extend( {angle: 0, length: 0.3333}, params.end );

        this.p1 = [params.start.x, params.start.y];
        this.p4 = [params.end.x, params.end.y];

        var v14 = V.minus( this.p4, this.p1 ),
            v12 = V.scale( v14, params.start.length ),
            v41 = V.scale( v14, -1 ),
            v43 = V.scale( v41, params.end.length );

        v12 = V.rotate( v12, params.start.angle );
        this.p2 = V.add( this.p1, v12 );

        v43 = V.rotate(v43, params.end.angle );
        this.p3 = V.add( this.p4, v43 );

        this.f1 = function(t) { return (t*t*t); };
        this.f2 = function(t) { return (3*t*t*(1-t)); };
        this.f3 = function(t) { return (3*t*(1-t)*(1-t)); };
        this.f4 = function(t) { return ((1-t)*(1-t)*(1-t)); };

        /* p from 0 to 1 */
        this.css = function(p) {
            var f1 = this.f1(p), f2 = this.f2(p), f3 = this.f3(p), f4=this.f4(p), css = {};
            if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
            }
            css.x = this.x = ( this.p1[0]*f1 + this.p2[0]*f2 +this.p3[0]*f3 + this.p4[0]*f4 +.5 )|0;
            css.y = this.y = ( this.p1[1]*f1 + this.p2[1]*f2 +this.p3[1]*f3 + this.p4[1]*f4 +.5 )|0;
            css.left = css.x + "px";
            css.top = css.y + "px";
            return css;
        };
    };

    $.path.arc = function(params, rotate) {
        for ( var i in params ) {
            this[i] = params[i];
        }

        this.dir = this.dir || 1;

        while ( this.start > this.end && this.dir > 0 ) {
            this.start -= 360;
        }

        while ( this.start < this.end && this.dir < 0 ) {
            this.start += 360;
        }

        this.css = function(p) {
            var a = ( this.start * (p ) + this.end * (1-(p )) ) * Math.PI / 180,
                css = {};

            if (rotate) {
                css.prevX = this.x;
                css.prevY = this.y;
            }
            css.x = this.x = ( Math.sin(a) * this.radius + this.center[0] +.5 )|0;
            css.y = this.y = ( Math.cos(a) * this.radius + this.center[1] +.5 )|0;
            css.left = css.x + "px";
            css.top = css.y + "px";
            return css;
        };
    };

    $.fx.step.path = function(fx) {
        var css = fx.end.css( 1 - fx.pos );
        if ( css.prevX != null ) {
            $.cssHooks.transform.set( fx.elem, "rotate(" + Math.atan2(css.prevY - css.y, css.prevX - css.x) + ")" );
        }
        fx.elem.style.top = css.top;
        fx.elem.style.left = css.left;
    };

})(jQuery);


function getCartAjax(){
    var cart = null;
    $('#cartform').hide();
    $('#myCart #exampleModalLabel').text("Giỏ hàng");
    jQuery.getJSON('/cart.js', function(cart, textStatus) {
        if(cart)
        {
            $('#cartform').show();
            $('.line-item:not(.original)').remove();
            $.each(cart.items,function(i,item){
                var total_line = 0;
                var total_line = item.quantity * item.price;
                tr = $('.original').clone().removeClass('original').appendTo('table#cart-table tbody');
                if(item.image != null)
                    tr.find('.item-image').html("<img src=" + Haravan.resizeImage(item.image,'small') + ">");
                else
                    tr.find('.item-image').html("<img src='//hstatic.net/0/0/global/noDefaultImage6_large.gif'>");
                vt = item.variant_options;
                if(vt.indexOf('Default Title') != -1)
                    vt = '';
                tr.find('.item-title a').html(item.product_title + '<br><span>' + vt + '</span>').attr('href', item.url);
                tr.find('.item-quantity').html("<input id='quantity1' name='updates[]' min='1' type='number' value=" + item.quantity + " class='' />");
                tr.find('.item-price').html(Haravan.formatMoney(total_line, ""));
                tr.find('.item-delete').html("<a href='#' onclick='deleteCart(" + item.variant_id + ")' >Xóa</a>");
            });
            $('.item-total').html(Haravan.formatMoney(cart.total_price, ""));
            $('.modal-title b').html(cart.item_count);
            $('*[id=cart-count]').html(cart.item_count);
            if(cart.item_count == 0){
                //$('#myCart button').attr('disabled', '');
                $('#myCart #cartform').addClass('hidden');
                $('#myCart #exampleModalLabel').html('Giỏ hàng của bạn đang trống. Mời bạn tiếp tục mua hàng.');
            }
            else{
                $('#myCart #exampleModalLabel').html('Bạn có ' + cart.item_count + ' sản phẩm trong giỏ hàng.');
                $('#myCart #cartform').removeClass('hidden');
                $('#myCart button').removeAttr('disabled');
            }

        }
        else{
            $('#myCart #exampleModalLabel').html('Giỏ hàng của bạn đang trống. Mời bạn tiếp tục mua hàng.');
            $('#cartform').hide();
        }
    });

}
$(document).ready(function(){
    $('#cart-target a').click(function(event){
        event.preventDefault() ;
        getCartAjax();

        $('#myCart').modal('show');
        $('.modal-backdrop').css({'height':$(document).height(),'z-index':'99'});
    });


    $('#update-cart-modal').click(function(event){
        event.preventDefault();
        if (jQuery('#cartform').serialize().length <= 5) return;
        $(this).html('Đang cập nhật');
        var params = {
            type: 'POST',
            url: '/cart/update.js',
            data: jQuery('#cartform').serialize(),
            dataType: 'json',
            success: function(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                } else {

                    getCartAjax();
                }

                $('#update-cart-modal').html('Cập nhật');
            },
            error: function(XMLHttpRequest, textStatus) {
                Haravan.onError(XMLHttpRequest, textStatus);
            }
        };
        jQuery.ajax(params);
    });
});

function deleteCart(variant_id){
    var params = {
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=0&id=' + variant_id,
        dataType: 'json',
        success: function(cart) {
            getCartAjax();
        },
        error: function(XMLHttpRequest, textStatus) {
            Haravan.onError(XMLHttpRequest, textStatus);
        }
    };
    jQuery.ajax(params);
}
$('#checkout').click(function(){
    $('#cartform').submit();
})
// The following piece of code can be ignored.
$(function(){
    $(window).resize(function() {
        $('#info').text("Page width: "+$(this).width());
    });
    $(window).trigger('resize');
});
