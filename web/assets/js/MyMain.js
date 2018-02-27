$('.category-name-container').click(function ()
{
    var countItem = $(this).closest('.content-menu-wrapper').find('.category-content-small').find('.item-box').length;
    var catRow = Math.floor(countItem / 4);
    var catHeight = (countItem % 4 === 0) ? catRow * 310 : (catRow + 1) * 300;
    $(this).closest('.content-menu-wrapper').find('.category-content-small').css('height', catHeight).slideToggle();
    $(this).closest('.content-menu-wrapper').find('.category-name-container').find('.fa').toggleClass('fa-caret-down fa-caret-up');
});

var countItem = 0;
var totalPrice = 0;
var items = [];

$('.col-variant').click(function ()
{
    var item = [];
    var itemName = $(this).parent().prev().find('.name_item').text();
    var itemSize = ($(this).attr('class').includes('col-first')) ? 'small' : 'regular';
    var itemPrice = $(this).find('.price-variant').text().split('K')[0];

    item.push([itemName, [itemSize, 1, itemPrice]]);


    //check item duplication

    if (items.length > 0)
    {
        var flag = true;
        for (var i = 0; i < items.length; i++)
        {
            if (items[i][0][0] === item[0][0])
            {
                if (items[i][0][1][0] === item[0][1][0])
                {
                    items[i][0][1][1]++;
                    flag = false;
                }
            }
        }
        if (flag)
        {
            items.push(item);
        }
    }
    else
    {
        items.push(item);
    }


    console.log('-----------------');
    for (var i = 0; i < items.length; i++)
    {

        console.log(items[i][0][0] + " - " + items[i][0][1][0] +
                " - " + items[i][0][1][1] + " - " + items[i][0][1][2]);

    }

    countItem++;
    totalPrice += Number(itemPrice);
    $('.info-cart').show();
    $('.quantity-info-cart').text(countItem);
    $('#total-price').text(totalPrice + '.000');

    if (countItem > 0)
    {
        $('#btn-div-payment').find('.btn').removeClass('btn-submit-info-inactive').addClass('btn-submit-info-active');
    }
});

$('#numberAddress').click(function ()
{

    console.log($('.map-container').css('opacity'));
    if ($('.map-container').css('opacity') === '0')
    {
        $('.iframe-main').hide();
        $('.map-container').css('opacity', '1').slideToggle();
        $('#close-map').show();
    }


});

$('#close-map').click(function ()
{
    $('.map-container').css('opacity', 0).slideToggle();
    $('#close-map').hide();
    if (window.location.hash === '#menu')
    {
        // $('.menu').slideToggle();
    }
    else if (window.location.hash === '#order')
    {
        // $('.order').slideToggle();
    }
    else
    {
        $('.iframe-main').slideToggle();
    }
});

$('#btn-div-menu').click(function ()
{
    window.location.hash = '#menu';
    $('.iframe-main').hide();
    $('.menu').slideToggle();
    $('#btn-div-menu').hide();
    $('#btn-div-payment').show();
});

$('#cart-btn').click(function ()
{

    var status = $(this).attr('class');

    if (status !== 'btn btn-submit-info-inactive')
    {
        window.location.hash = '#order';
        $('.iframe-main').hide();
        $('.map-container').css('display', 'none');
        $('#close-map').css('display', 'none');
        $('.menu').css('display', 'none');
        $('#btn-div-menu').css('display', 'none');
        $('#btn-div-payment').css('display', 'none');
        $('.order').css('display', 'block');
        $('#btn-div-submit-order').css('display', 'block');
    }


});

$('#return-menu').click(function ()
{
    $('.menu').slideToggle();
    $('#btn-div-menu').hide();
    $('#btn-div-payment').show();
    $('#btn-div-submit-order').hide();
});

$('#payment-btn').click(function ()
{
    alert('AHIHI XONG RỒI');
});

$('#btn-show-logout').click(function ()
{
    console.log('log modal');
});


$(window).on('load', function ()
{
    $("#iframe-main").contents().find("#login-href").click(function ()
    {
        $('#loginModal').modal('show');
    })
});
