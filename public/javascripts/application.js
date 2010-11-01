// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
jQuery.ajaxSetup({
    'beforeSend': function(xhr) {
        xhr.setRequestHeader("Accept", "text/javascript")
    }
})

jQuery.fn.submitWithAjax = function() {
    this.submit(function() {
        $.post(this.action, $(this).serialize(), null, "script");
        return false;
    })
    return this;
};

$.fn.removePhotoField = function(){
    $('span.removeImageField').click(function(){
        $(this).parents('.photo').remove();
    });
};

$.fn.addMorePhoto = function(container, allowed_images){
    $('a.addMoreImage').click(function(){
        if(allowed_images && ($('span.removeImageField').length + $('a.del_photo').length) > allowed_images){
            alert('Maximum allowed '+allowed_images);
            return false;
        }
        else{
            var new_object_id = new Date().getTime() ;
            var html = $($('#new_photo_html').html().replace(/index_to_replace_with_js/g, new_object_id)).hide();
            html.appendTo($('#'+ container)).slideDown('slow');
            $(this).removePhotoField();
        }
    });

    $(this).removePhotoField();
};


$.fn.makeMainPhoto = function(resource){
    $('input.mainCh').click(function(){
        $('input.mainCh').attr('checked', false);
        $(this).attr('checked', true);

        $.ajax({
            url: '/'+ resource +'/set_main_photo?asset_id='+$(this).attr('asset_id'),
            type: 'post',
            dataType: 'script',
            success: function(results) {
                alert('main phot set!');
            }
        });

    });
};

$.fn.deleteAsset = function(resource){
    $('a.del_photo').click(function(){
        if(confirm('Delete photo?')){
            var div_to_remove = $(this).parent('.existing_image');
            $.ajax({
                url: '/'+ resource +'/delete_asset?asset_id='+$(this).attr('asset_id'),
                type: 'post',
                dataType: 'script',
                success: function(results) {
                    div_to_remove.remove();
                }
            });
        }
    });

};


$.fn.saveItemToMyListing = function(){
    $('a.save_item').click(function(){
        $.ajax({
            url: '/users/save_item?savable_id='+$(this).attr('item_id')+'&savable_type='+ $(this).attr('savable_type'),
            type: 'post',
            dataType: 'script',
            success: function(r){
                $.fn.removeSavedItem();
            }
        });

    });
};

$.fn.removeSavedItem = function(){
    $('a.remove_from_save_listing').click(function(){
        $.ajax({
            url: '/users/remove_saved_item?sl_id='+$(this).attr('sl_id')+'&savable_id='+$(this).attr('savable_id')+'&savable_type='+ $(this).attr('savable_type'),
            type: 'post',
            dataType: 'script',
            success: function(r){
                $.fn.saveItemToMyListing();
            }
        });
    });
} ;

$.fn.toggleLoginOther = function(){
    $('.login_and_other').click(function(){
        if($(this).hasClass('collapsed')){
            $('.top_bar').animate({
                "marginTop": "10px"
            }, "slow");
            $('#login_down_arrow').hide();
            $('#login_up_arrow').show();
        }
        else
        {
            $('.top_bar').animate({
                "marginTop": "-40px"
            }, "slow");
            $('#login_up_arrow').hide();
            $('#login_down_arrow').show();
        }
        $(this).toggleClass('collapsed');
        $(this).toggleClass('expand');
    });
};

$.fn.enableMenu = function(){
    $('.sub_nav').mouseover(function(){
        mcancelclosetime();
    });

    $('.sub_nav, a.have_sub_nav').mouseout(function(){
        mclosetime();
    });

    $('a.have_sub_nav').mouseover(function(){
        mopen($(this).attr('sub_nav_id'));
    });

};

$(document).ready(function() {
    $("#new_task").submitWithAjax();

    $('a.cloneTask').click(function() {
        $.ajax({
            url: jQuery(this).attr('href'),
            type: 'get',
            dataType: 'script'
        });

        return false;
    });

    setTimeout(function() {
        $('#flash_messages').fadeOut();
    }, 5000);

    $(this).enableMenu();
    $(this).saveItemToMyListing();
    $(this).removeSavedItem();
    $(this).toggleLoginOther();
   
})


