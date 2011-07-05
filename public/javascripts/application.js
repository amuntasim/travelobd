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


$.fn.saveItemToMyListing = function() {
    $('a.save_item').click(function() {
        $.ajax({
            url: '/users/save_item?savable_id=' + $(this).attr('item_id') + '&savable_type=' + $(this).attr('savable_type'),
            type: 'post',
            dataType: 'script',
            success: function(r) {
                $.fn.removeSavedItem();
            }
        });

    });
};

$.fn.removeSavedItem = function() {
    $('a.remove_from_save_listing').click(function() {
        $.ajax({
            url: '/users/remove_saved_item?sl_id=' + $(this).attr('sl_id') + '&savable_id=' + $(this).attr('savable_id') + '&savable_type=' + $(this).attr('savable_type'),
            type: 'post',
            dataType: 'script',
            success: function(r) {
                $.fn.saveItemToMyListing();
            }
        });
    });
};


$.fn.enableMenu = function() {
    $('.sub_nav').mouseover(function() {
        mcancelclosetime();
    });

    $('.sub_nav, a.have_sub_nav').mouseout(function() {
        mclosetime();
    });

    $('a.have_sub_nav').mouseover(function() {
        mopen($(this).attr('sub_nav_id'));
    });

};

$.fn.showHideSearchOption = function() {
    var search_option = $('#search_option').val();
    switch (search_option) {
        case 'Packages':
            $('.searchOption').hide();
            $('#package_search_form').show();
            break;
        case 'Spots':
            $('.searchOption').hide();
            $('#spot_search_form').show();
            break;
        case 'Articles':
            $('.searchOption').hide();
            $('#article_search_form').show();
            break;
        default:
            $('.searchOption').hide();
            $('#hotel_search_form').show();
    }
};

$.fn.editPhotoLabel = function() {
    $('a.edit_asset_label').click(function() {
        $('#edit_label_status').html('');
        tb_show('Edit Label', '#TB_inline?dd=4&width=400&height=250&inlineId=edit_asset_label_lb&modal=true');
        $('#asset_label').val($(this).attr('title'));
        $('#asset_id').val($(this).attr('asset_id'));
//        $.ajax({
//            url: '/' + resource + '/edit_photo_label?asset_id=' + $(this).attr('asset_id'),
//            type: 'post',
//            dataType: 'script',
//            success: function(results) {
//                alert('main photo reset!');
//            }
//        });

    });
};

var currentLocale = 'en';
var keep_flash_messages = false
var TBD = {
    LEFT_SLIDER_OPTIONS: {
        mode: 'fade',
        auto: true,
        controls: true,
        pager: true,
        randomStart: true   ,
        autoStart: true,
        autoHover: false,
        autoDelay: 0,
        stopAuto: true
    },

    DETAIL_PAGE_PHOTO_GALLERY_OPTIONS : {
        panel_width: 680,
        panel_height: 280,
        panel_padding: 10,
        panel_border: '1px solid #cccccc',
        panel_bottom_margin: 10,
        frame_width: 64,
        frame_height: 55,
        strip_padding: 10,
        //strip_border: '1px solid #cccccc',
        strip_border: '1px solid #F2F1EC',
        strip_background: '#d1d1d1',
        frame_size: 10,
        transition_speed: 600,
        transition_interval: 6000,
        //overlay_height: 30,
        //overlay_color: '#222',
        //overlay_text_color: 'white',
        caption_text_color: '#222',
        background_color: 'transparent',
        border: 'none',
        nav_theme: 'light',
        easing: 'easeInOutQuad',
        hide_nav_buttons: true,
        pause_on_hover: true
    },

    DHTML : {
        addMoreItem : function(clickableSelector, source, placeHolder, removeSelector, itemClass) {
            $(clickableSelector).click(function() {
                var new_object_id = new Date().getTime();
                var html = $($(source).html().replace(/index_to_replace_with_js/g, new_object_id)).hide();
                html.appendTo($(placeHolder)).slideDown('slow');
                TBD.DHTML.removeDHTMLItem(removeSelector, itemClass);
            });

            TBD.DHTML.removeDHTMLItem(removeSelector, itemClass);
        },

        removeDHTMLItem : function(selector, itemClass) {
            $(selector).click(function() {
                $(this).parents('.' + itemClass).remove();
            });
        },

        addMorePhoto : function(container, allowed_images) {
            $('a.addMoreImage').click(function() {
                if (allowed_images && ($('#' + container + 'span.removeImageField').length + $('a.del_photo').length) > allowed_images) {
                    alert('Maximum allowed ' + allowed_images);
                    return false;
                }
                else {
                    var new_object_id = new Date().getTime();
                    var html = $($('#new_photo_html').html().replace(/index_to_replace_with_js/g, new_object_id)).hide();
                    html.appendTo($('#' + container)).slideDown('slow');
                }
                TBD.DHTML.removeDHTMLItem('span.removeImageField', 'photo');
            });
        },
        checkUncheckSpot : function(that) {
            if (!$(that).attr('checked')) {
                $('.spot_of_district_' + $(this).attr('value')).children('input[type="checkbox"]').each(function() {
                    $(this).removeAttr('checked');
                });
                $('.spot_of_district_' + $(that).attr('value')).hide();
            }
            else {
                $('.spot_of_district_' + $(that).attr('value')).show();
                $('.spot_of_district_' + $(this).attr('value')).children('input[type="checkbox"]').each(function() {
                    if ($(this).attr('prev_checked') == 'true')
                        $(this).attr('checked', 'checked');
                });
            }

        }
    },

    ASSETS : {
        makeMainPhoto : function(resource) {
            $('input.mainCh').click(function() {
//                $('input.mainCh').attr('checked', false);
//                $(this).attr('checked', true);

                $.ajax({
                    url: '/' + resource + '/set_main_photo?asset_id=' + $(this).attr('asset_id'),
                    type: 'post',
                    dataType: 'script',
                    success: function(results) {
                        alert('main photo reset!');
                    }
                });

            });
        },

        deleteAsset : function(resource) {
            $('a.del_photo').click(function() {
                if (confirm('Delete photo?')) {
                    var div_to_remove = $(this).parent('.existing_image');
                    $.ajax({
                        url: '/' + resource + '/delete_asset?asset_id=' + $(this).attr('asset_id'),
                        type: 'post',
                        dataType: 'script',
                        success: function(results) {
                            div_to_remove.remove();
                        }
                    });
                }
            });

        }
    },

    GENERAL : {
        slideFeaturedHotels:function() {
            $('#left_side_featured_hotels').bxSlider(TBD.LEFT_SLIDER_OPTIONS);
        }
        ,

        slideFeaturedTransports:function() {
            $('#left_side_featured_transports').bxSlider(TBD.LEFT_SLIDER_OPTIONS);
        }
        ,

        slideFeaturedAgents:function() {
            $('#left_side_featured_tour_operators').bxSlider(TBD.LEFT_SLIDER_OPTIONS);
        }
        ,

        closeTBOnEscape:function() {
            $(this).keydown(function(e) {
                if (e == null) { // ie
                    keycode = event.keyCode;
                } else { // mozilla
                    keycode = e.which;
                }
                if (keycode == 27) { // close
                    top.tb_remove();
                }
            });
        }
        ,

        showLoginOther:function(that) {
            $('.top_bar').animate({
                "marginTop": "10px"
            }, "slow");
            $('#login_down_arrow').hide();
            $('#login_up_arrow').show();
            $(that).toggleClass('collapsed');
            $(that).toggleClass('expand');
        }
        ,
        hideLoginOther:function(that) {
            $('.top_bar').animate({
                "marginTop": "-40px"
            }, "slow");
            $('#login_up_arrow').hide();
            $('#login_down_arrow').show();
            $(that).toggleClass('collapsed');
            $(that).toggleClass('expand');
        }
        ,
        toggleLoginOther:function() {
            $('.login_and_other').click(function() {
                if ($(this).hasClass('collapsed')) {
                    TBD.GENERAL.showLoginOther(this);
                }
                else {
                    TBD.GENERAL.hideLoginOther(this);
                }

            });
        },
        activateDeleteLinkCheckbox: function() {
            $('.deleteLinkCheckbox').click(function() {
                $(this).siblings('input[type=checkbox]').filter(function() {
                    if ($(this).attr('checked'))
                        $(this).removeAttr("checked")
                    else
                        $(this).attr("checked", 'checked')
                });

            });
        },

        translateBxPager:function() {
            $('.bx-pager a').each(function() {
                $(this).html(TBD.GENERAL.translateNumber($(this).html(), currentLocale))
            });
        },

        translateNumber:function(number, locale) {

            if (locale == 'bn') {
                number_arr = [];
                number = number + '';
                for (var i = 0; i < number.length; i++) {
                    if (this.banglaNumberMap[number[i]] != 'undefined') {
                        number_arr.push(this.banglaNumberMap[number[i]]);
                    }
                    else
                        number_arr.push(number[i])
                }
                return number_arr.join();
            }
            else
                return number;


        },

        banglaNumberMap: {
            '0':'০',
            '1':'১',
            '2':'২',
            '3':'৩',
            '4':'৪',
            '5':'৫',
            '6':'৬',
            '7':'৭',
            '8':'৮',
            '9':'৯'
        }
    }
}


$.maxZIndex = $.fn.maxZIndex = function(opt) {
    /// <summary>
    /// Returns the max zOrder in the document (no parameter)
    /// Sets max zOrder by passing a non-zero number
    /// which gets added to the highest zOrder.
    /// </summary>
    /// <param name="opt" type="object">
    /// inc: increment value,
    /// group: selector for zIndex elements to find max for
    /// </param>
    /// <returns type="jQuery" />
    var def = { inc: 10, group: "*" };
    $.extend(def, opt);
    var zmax = 0;
    $(def.group).each(function() {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    if (!this.jquery)
        return zmax;

    return this.each(function() {
        zmax += def.inc;
        $(this).css("z-index", zmax);
    });
}

$(document).ready(function() {
    $.validator.methods.multipleEmailValidation = function(value, element, param) {
        var emails = value.split(',');
        var valid = (emails.length > 0); // make sure that value is not empty
        var email_regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;

        for (i = 0; i < emails.length; i++) {

            var emailAddress = emails[i];
            //alert(emailAddress);
            //alert(email_regex.test(emailAddress));
            valid = valid && email_regex.test(emailAddress); // logical and of all email validations
        }
        return valid;
    };


    setTimeout(function() {
        if (!keep_flash_messages)
            $('#flash_messages').fadeOut();
    }, 5000);


    //$(this).enableMenu();
    $(this).saveItemToMyListing();
    $(this).removeSavedItem();
    $(this).showHideSearchOption();
    $(this).editPhotoLabel();
    $('#search_option').change(function() {
        $(this).showHideSearchOption();
    });

    $('.close_lb').click(function() {
        tb_remove();
    });
    $('.searchDate').datepicker({
        changeMonth: true,
        changeYear: true
        //beforeShow: function() {$('#ui-datepicker-div').maxZIndex(); }
    });

    TBD.GENERAL.closeTBOnEscape();
    TBD.GENERAL.slideFeaturedHotels();
    TBD.GENERAL.slideFeaturedTransports();
    TBD.GENERAL.slideFeaturedAgents();
    TBD.GENERAL.toggleLoginOther();
    TBD.GENERAL.activateDeleteLinkCheckbox();
    TBD.GENERAL.translateBxPager();

    $('div.collapsed').mouseover(function() {
        if ($(this).hasClass('collapsed')) {
            TBD.GENERAL.showLoginOther(this);
        }
    })

    $('.login_and_other').trigger('click');


    setTimeout("TBD.GENERAL.hideLoginOther($('.login_and_other'))", 5000);

    var validateSendToFriend = function() {
        var stf_validator = $("#send_to_friends_form").validate({
            invalidHandler: function() {
                $("#stf_summary").html('<div class="summary error">' + stf_validator.numberOfInvalids() + " field(s) are invalid, * marked fields are required </div>");
            },
            errorPlacement: function(error, element) {
                error.remove();
            },

            rules: {
                message: "required",
                email: {
                    required: true,

                    multipleEmailValidation: true

                }
            }
        });
    };

    var message_validator = $("#message_form").validate({
        errorPlacement: function(error, element) {
            error.remove();
        },
        invalidHandler: function(e, validator) {
            var errors = validator.numberOfInvalids();
            if (errors) {
                var message = errors == 1
                        ? 'You missed 1 field. It has been highlighted below'
                        : 'You missed ' + errors + ' fields.  They have been highlighted below';
                $("div#message_status").html("<span class='error'>" + message + "</span>");
                $("div#message_status span.error").show();
            } else {
                $("div#message_status span.error").hide();
            }
        },


        rules: {
            'message[name]': "required",
            'message[email]': {
                required: true,
                email: true
            },

            'message[address]': "required",
            'message[phone]': "required",
            'message[title]': "required",
            'message[content]': "required",
            'spam_check': "required"
            //ad_ad_name: "required",
            //ad_short_description: "required"

        }
    });
    $("#message_form").bind("ajaxSend",
            function() {
                $('#submit_to_seller').hide();
                $('#sending_to_seller').show();
            }).bind("ajaxComplete",
            function() {
                $('#sending_to_seller').hide();
                $('#submit_to_seller').show();
            }).bind("ajax:success", function() {
        $("#message_form").get(0).reset();
    });

    $("#send_to_friends_form").bind("ajaxSend",
            function() {
                $('#submit_to_friend').hide();
                $('#sending_to_friend').show();
            }).bind("ajaxComplete",
            function() {
                $('#sending_to_friend').hide();
                $('#submit_to_friend').show();
            }).bind("ajax:success", function() {
        $("#send_to_friends_form").get(0).reset();
    });

    $('#comment_form').bind(
            "ajaxSend",
            function() {
                $('#submit_comment').attr('disabled', 'disabled');
            }).bind("ajaxComplete",
            function() {
                $('#submit_comment').removeAttr('disabled');
            });

    validateSendToFriend();


})


