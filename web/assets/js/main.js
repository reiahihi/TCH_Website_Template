$(window).on('load', function() { $('.loading-mobile').hide();});
$('html').find('body').removeClass('black');

$('#close-map').hide();
setTimeout(function() {
    $('span').each(function() {
        $(this).html($(this).html().replace(/&nbsp;/gi, ''));
    });
}, 2000);


$(window).on('load', function() {
    $("#iframe-main").contents().find("#login-href").click(function() {
        $('#loginModal').modal('show');
    })
});


$('#numberAddress, #cityAddress, #districtAddress').click(function() {
    autocompleteGoogleMap();
    if ($('.map-container').css('opacity') == 0) {
        if (window.location.hash == "#menu" || window.location.hash == "#order") {
            first = true;
            $('.map-container').css('opacity', 1);
            $('.loading-map').css('opacity', 1);
            $('.map-container').slideToggle();
            $('#close-map').show();
            if (window.location.hash == "#menu") {
                $('.menu').slideToggle();
            }
        } else {
            $('.map-container').css('opacity', 1);
            $('.loading-map').css('opacity', 1);
            $('.iframe-main').slideToggle();
            $('#close-map').show();
            if (first == true) {
                $('.map-container').slideToggle();
            }
            first = true;
        }
    }
});

$(window).resize(function() {
    setWidthPatternCatName();
    setHeightMenu();
    calcMarginModal();
});
var previousHash = [""];
function showMissingInfoModal() {
    $('#missingInfoModal').modal('show');
}
function showModalWarningLocation() {
    $('#warninglocationModal').modal('show');
}
window.userInteractionTimeout = null;
window.userInteractionInHTMLArea = false;
window.onBrowserHistoryButtonClicked = null;
$(document).ready(function() {
    if (!mobile) {
        timeOutLocation();
    }
    $(document).mousedown(function() {
        clearTimeout(window.userInteractionTimeout);
        window.userInteractionInHTMLArea = true;
        window.userInteractionTimeout = setTimeout(function() {
            window.userInteractionInHTMLArea = false;
        }, 500);
    });
    $(document).keydown(function() {
        clearTimeout(window.userInteractionTimeout);
        window.userInteractionInHTMLArea = true;
        window.userInteractionTimeout = setTimeout(function() {
            window.userInteractionInHTMLArea = false;
        }, 500);
    });
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function() {
            if (!window.userInteractionInHTMLArea) {
                clickBackButtonCallBack();
            }
            if (window.onBrowserHistoryButtonClicked) {
                window.onBrowserHistoryButtonClicked();
            }
        });
    }
});
$('.icon-prev-info').click(function() {
    $('.info-component-mobile').slideToggle();
    $('.address-component-mobile').addClass('opacity-0');
    $('.map-container-mobile').addClass('opacity-0');
    window.location.hash = "info";
    previousHash.push(window.location.hash);
});
$('.icon-prev-address').click(function() {
    if ($('.extend-map').hasClass('active'))
        $('.extend-map').click();
    $('.address-component-mobile').slideToggle();
    $('.menu-component-mobile').slideToggle();
    if ($('.extend-map').hasClass('active'))
        $('.extend-map').click();
    $('.footer-info-mobile').show();
    $('.theme-mobile .btn-menu-to-cart-mobile').css('bottom', '50px');
    calcHeightGoogleMapMobile();
    window.location.hash = "address";
    previousHash.push(window.location.hash);
});
$('.icon-prev-menu').click(function() {
    $('.menu-component-mobile').slideToggle();
    $('.order-component-mobile').slideToggle();
    $('html').addClass('bg-menu').removeClass('bg-order');
    $('.footer-info-mobile').hide();
    $('.theme-mobile .btn-menu-to-cart-mobile').css('bottom', '0');
    window.location.hash = "menu";
    previousHash.push(window.location.hash);
});
function clickBackButtonCallBack() {
    if (mobile) {
        if (previousHash[previousHash.length - 1] == "#info") {
            if (window.location.hash == "") {
                $(".intro-component-mobile").slideToggle();
                $('.info-component-mobile').slideToggle();
                previousHash.pop();
            } else if (window.location.hash == "address") {
                $('.info-component-mobile').slideToggle();
                $('.address-component-mobile').removeClass('opacity-0');
                $('.map-container-mobile').removeClass('opacity-0');
                calcHeightGoogleMapMobile();
            }
        } else if (previousHash[previousHash.length - 1] == "#address") {
            if (window.location.hash == "#info") {
                $('.info-component-mobile').slideToggle();
                $('.address-component-mobile').addClass('opacity-0');
                $('.map-container-mobile').addClass('opacity-0');
                previousHash.pop();
            } else if (window.location.hash == "#menu") {
                $('.tch-warning-address').addClass('hidden');
                $('.input-address-mobile').removeClass('input-tch-warning');
                $('.address-component-mobile').slideToggle();
                $('.menu-component-mobile').slideToggle();
                $('#numberAddress').change();
                $('#districtAddress').change();
                $('#cityAddress').change();
                $('.footer-info-mobile').hide();
                $('.theme-mobile .btn-menu-to-cart-mobile').css('bottom', '0');
                setWidthPatternCatName();
                setHeightMenu();
                calcHeightGoogleMapMobile();
                previousHash.pop();
            }
        } else if (previousHash[previousHash.length - 1] == "#menu") {
            $('.footer-info-mobile').show();
            $('.theme-mobile .btn-menu-to-cart-mobile').css('bottom', '50px');
            if (window.location.hash == "#address") {
                if ($('.extend-map').hasClass('active'))
                    $('.extend-map').click();
                $('.address-component-mobile').slideToggle();
                $('.menu-component-mobile').slideToggle();
                if ($('.extend-map').hasClass('active'))
                    $('.extend-map').click();
                calcHeightGoogleMapMobile();
                previousHash.pop();
            } else if (window.location.hash == "#order") {
                $('.menu-component-mobile').slideToggle();
                $('.order-component-mobile').slideToggle();
                $('html').addClass('bg-order').removeClass('bg-menu');
                setHeightCart();
            }
        } else if (previousHash[previousHash.length - 1] == "#order") {
            if (window.location.hash == "#menu") {
                $('.menu-component-mobile').slideToggle();
                $('.order-component-mobile').slideToggle();
                $('html').addClass('bg-menu').removeClass('bg-order');
                $('.footer-info-mobile').hide();
                $('.theme-mobile .btn-menu-to-cart-mobile').css('bottom', '0');
                previousHash.pop();
            }
        }
    } else {
        if (previousHash[previousHash.length - 1] == "#menu") {
            if (window.location.hash == "") {
                $('.menu').slideToggle();
                $('#btn-div-menu').show();
                $('#btn-div-payment').hide();
                $('.edit-address').hide();
                $('.my-current-location-button').show();
                $('.delivery-time-component').show();
                $('.info-cart').hide();
                $('.info-delivery').hide();
                $('.iframe-main').slideToggle();
                previousHash.pop();
            } else if (window.location.hash == "#order") {
                $('.delivery-time-component').hide();
                $('#btn-div-submit-order').show();
                $('.name-phone-info-input, .info-discount-container,, .shipping-fee').hide();
                $('.name-phone-info-label').show();
                $('.address-label').show();
                $('.info-delivery').show();
                $('.address-input').hide();
                $('#btn-div-payment').hide();
                $('.bg-left-main').hide();
                $('.bg-left-order').show();
                $('.icon-edit-menu').show();
                if ($('.map-container').css('display') != "none") {
                    $('.order').slideToggle();
                    $('.map-container').slideToggle();
                    setTimeout(function() {
                        $('.div-hotline').removeClass('hidden');
                    }, 500);
                } else {
                    $('.menu, .order').slideToggle();
                }
                $('#close-map').hide();
                previousHash.pop();
            }
        } else if (previousHash[previousHash.length - 1] == "") {
            if (window.location.hash == "#menu") {
                if ($('.map-container').css('display') != "none") {
                    $('.map-container').slideToggle();
                    setTimeout(function() {
                        $('.div-hotline').removeClass('hidden');
                    }, 500);
                }
                if ($('.iframe-main').css('display') != 'none') {
                    $('.iframe-main').slideToggle();
                }
                $('.loading-map').hide();
                $('.reload-location').hide();
                $('.menu').slideToggle();
                $('#btn-div-menu').hide();
                $('#btn-div-payment').show();
                $('.edit-address').show();
                $('.my-current-location-button').hide();
                $('.name-phone-info-input, .info-discount-container, .shipping-fee').hide();
                $('.name-phone-info-label').show();
                $('.address-label').show();
                $('.address-input').hide();
                $('.info-cart').show();
                $('.info-delivery').show();
                $('.delivery-time-component').show();
                setWidthQuantity();
                setHeightMenuContent();
                previousHash.pop();
            } else if (window.location.hash == "#order") {
                if ($('.map-container').css('display') != "none") {
                    $('.map-container').slideToggle();
                    setTimeout(function() {
                        $('.div-hotline').removeClass('hidden');
                    }, 500);
                }
                if ($('.iframe-main').css('display') != 'none') {
                    $('.iframe-main').slideToggle();
                }
                $('.delivery-time-component').hide();
                $('.loading-map').hide();
                $('.reload-location').hide();
                $('.order').slideToggle();
                $('#btn-div-menu').hide();
                $('#btn-div-submit-order').show();
                $('.edit-address').show();
                $('.icon-edit-menu').show();
                $('.my-current-location-button').hide();
                $('.name-phone-info-input, .info-discount-container, .shipping-fee').hide();
                $('.name-phone-info-label').show();
                $('.address-label').show();
                $('.address-input').hide();
                $('.info-cart').show();
                $('.info-delivery').show();
                previousHash.pop();
            }
        } else if (previousHash[previousHash.length - 1] == "#order") {
            if (window.location.hash == "#menu") {
                $('.delivery-time-component').show();
                $('.menu').slideToggle();
                $('.order').slideToggle();
                $('.name-phone-info-input, .info-discount-container, .shipping-fee').show();
                $('.name-phone-info-label').hide();
                $('.address-label').hide();
                $('.info-delivery').hide();
                $('.address-input').show();
                $('#btn-div-submit-order').hide();
                $('#btn-div-payment').show();
                $('.icon-edit-menu').hide();
                previousHash.pop();
            } else if (window.location.hash == "") {}
        }
    }
}
function setWidthQuantity() {
    var widthBtn = $('.variant-inactive').width();
    var widthPlus = $('.icon-button-right').width() * 2;
    var widthQuantity = widthBtn - widthPlus;
}
$(document).ready(function() {
    calcMarginModal();
});
function calcMarginModal() {
    $('.modal-dialog').css('width', '');
    $('.edit-address').hide();
    var height = $(window).height();
    height = (height - 231) / 2 + "px";
    $('.modal-dialog').css("margin-top", height);
}
function setWidthPatternCatName() {
    var items = $('.cat-name-div-mobile');
    var windowWidth = $(window).width();
    for (var i = 0; i < items.length; i++) {
        var idPattern = "#pattern_" + i;
        var id = "#cat_" + i;
        var nameWid = $(id).width();
        var patternWid = windowWidth - $(id).width() - 100;
        $(idPattern).css('width', patternWid + "px");
    }
}
function setHeightMenuContent() {
    var windowHeight = $(window).height();
    var headerHeight = $('.header-menu').height();
    var menuHeight = windowHeight - headerHeight;
    $('.menu-content-container').css('height', menuHeight);
    $('.order-content-wrapper').css('max-height', menuHeight - 100);
}
function setHeightCart() {
    var logoHeight = $('#logo-menu-container-cart').height();
    var titleHeight = $('#header-menu-cart').height();
    var windowHeight = $(window).height();
    var textureHeight = $('#texture-cart').height();
    var cartHeight = windowHeight - logoHeight - titleHeight - textureHeight - (windowHeight * 8 / 100) - 30;
    $('.content-cart-mobile').css("height", cartHeight + "px");
    $('.content-cart-mobile').css("max-height", cartHeight + "px");
}
function setHeightMenu() {
    var headerHeight = $('.header-mobile').height();
    var windowHeight = $(window).height();
    var textHeight = $('.text-center').height();
    var menuHeight = windowHeight - 21 - textHeight - 150;
    $('#menu-content-mobile').css("height", menuHeight);
}
$('#hideCart').click(function() {
    $('.cart-background').hide();
    var effect = 'slide';
    var options = {
        direction: "right"
    };
    var duration = 500;
    $('.cart').toggle(effect, options, duration);
})
$('#hideCartClose').click(function() {
    $('.cart-background').hide();
    var effect = 'slide';
    var options = {
        direction: "right"
    };
    var duration = 500;
    $('.cart').toggle(effect, options, duration);
})
$('#showCart').click(function() {
    $('.cart-background').show();
    var effect = 'slide';
    var options = {
        direction: "right"
    };
    var duration = 500;
    $('.cart').toggle(effect, options, duration);
})
$(".btn-item-inactive").click(function() {
    alert('a');
})
var first = false;

$('#loginModal').on('hidden.bs.modal', function() {
    $('#username-login').val('');
    $('#password-login').val('');
    $('.message-warning').hide();
})
$('#orderSuccessModal').on('click', '.btn-return-home', function() {
    window.location.reload();
});
$('#orderSuccessModal').on('hidden.bs.modal', function() {
    window.location.reload();
});
$('#orderFailModal').on('click', '.btn-return-home', function() {
    $('.btn-submit-order').removeClass('disabled');
});
$('#orderFailModal').on('hidden.bs.modal', function() {
    $('.btn-submit-order').removeClass('disabled');
});
function returnHomeScreen() {
    $('.arrow-left').show();
    if ($('.order').css('display') != 'none')
        $('.order').slideToggle();
    else
        $('.menu').slideToggle();
    $('.map-container').slideToggle();
    $('.map-container').css('opacity', 1);
    $('.div-hotline').addClass('hidden');
    $('.loading-map').css('opacity', 1);
    $('#btn-div-menu').show();
    $('#btn-div-payment').hide();
    $('.edit-address').hide();
    $('.my-current-location-button').show();
    $('.name-phone-info-input, .info-discount-container, .shipping-fee').show();
    $('.name-phone-info-label').hide();
    $('.address-label').hide();
    $('.address-input').show();
    $('.info-cart').hide();
    $('.info-delivery').hide();
    $('#btn-div-submit-order').hide();
    $('.icon-edit-menu').hide();
}
$('.icon-edit-address-mobile').click(function() {
    $('.address-component-mobile').slideToggle();
    $('.order-component-mobile').slideToggle();
});
$(window).on('load', function() {
    $('.cat-name-mobile').click(function() {
        $(this).closest('.category-name-container').find('.item-container-mobile').slideToggle();
    });

});

function timeOutLocation() {
    setTimeout(function() {
        // if (!getLocation) {
        //     // $('#my-current-location-button').hide();
        //     // $('.loading-map-mobile').hide();
        //     // $('.loading-map').hide();
        //     // $('.reload-location').hide();
        //     // $('.warning-location').show();
        // }
    }, 10000)
}