$('.content-menu-wrapper').click(function () {
    var countItem = $(this).closest('.content-menu-wrapper').find('.category-content-small').find('.item-box').length;
    var catRow = Math.floor(countItem / 4);
    var catHeight = (countItem % 4 === 0) ? catRow * 310 : (catRow + 1) * 300;
    $(this).closest('.content-menu-wrapper').find('.category-content-small').css('height', catHeight).slideToggle();
    $(this).closest('.content-menu-wrapper').find('.category-name-container').find('.fa').toggleClass('fa-caret-down fa-caret-up');

});
