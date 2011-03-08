$.fn.tinyRedcloth = function(options) {

    var opts = $.extend($.fn.tinyRedcloth.defaults, options);

    var active_obj = '';
    var active_obj_scroll_top = 0;

    function hideKeyboardOption() {

    }


    function bindEventToUploadedImages() {
        $('div.uploadedImage').click(function() {
            var str = '!' + $(this).attr('image_path') + '!'
            insertAtCursor(str);
            tb_remove();
        });
    }

    function loadUploadedImages() {
        $.ajax({
            url: '/users/load_uploaded_images',
            type: 'get',
            dataType: 'script',
            success: function(results) {
                bindEventToUploadedImages();
            }
        });
    }

    function handleImageSelectOrUpload() {
        var $this = this;

        tb_show("Upload/Select Image", '#TB_inline?dd=4&width=600&height=500&inlineId=tiny_redcloth_image&modal=true');
        $('#close_tiny_redcloth_image').css({"float": "right" }).click(function() {
            tb_remove()
        });


        $('a.addMoreImageToUpload').click(function() {
            var new_object_id = new Date().getTime();
            var html = $($('#new_user_image_html').html().replace(/index_to_replace_with_js/g, new_object_id)).hide();
            html.appendTo($('#user_uploaded_photos')).slideDown('slow');
            $('span.removeImageField').click(function() {
                $(this).parents('.photo').remove();
            });
            //$this.loadUploadedImages();
        });

        $('span.removeImageField').click(function() {
            $(this).parents('.photo').remove();
        });

        $('#submit_user_upload').click(function() {
            $('#user_image_upload_form').ajaxSubmit({

                beforeSubmit: function(a, f, o) {
                    o.dataType = 'json';
                },
                complete: function(XMLHttpRequest, textStatus) {
                    // alert (XMLHttpRequest.responseText);
                    loadUploadedImages();
                    $('#user_image_upload_form').get(0).reset();
                }
            });
            return false;
        });
        loadUploadedImages();
    }

    function insertAtCursor(myValue) {

        var myField = $(active_obj);
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = myValue;
            sel.collapse(true);
            sel.select();
        }
        else if (myField.selectionStart || myField.selectionStart == 0) {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            //var scrollTop = myField.scrollTop;
            startPos = (startPos == -1 ? myField.val().length : startPos );
            myField.val(myField.val().substring(0, startPos)
                    + myValue
                    + myField.val().substring(endPos, myField.val().length));
            myField.setCursorPosition(endPos + myValue.length);
            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;
            //myField.scrollTop = active_obj_scroll_top;
            myField.adjustScrollTop(active_obj_scroll_top);

        } else {
            var curPos = myField.getCursorPosition();
            myField.val(
                    myField.val().substring(0, curPos)
                            + myValue
                            + myField.val().substring(curPos, myField.val().length)
                    );
            myField.setCursorPosition(curPos + myValue.length);
            myField.adjustScrollTop(active_obj_scroll_top);

        }
    }


    return this.each(function() {
        active_obj = $(this);


        if (active_obj.attr('trc_option_enabled') === undefined) {
            var option_html = '<ul tiny_redcloth_for="' + active_obj.attr('id') + '" class="tiny_redcloth_buttons">';
            option_html += '<li class="tiny_redcloth_button B"  task="bold"> B </li>';
            option_html += '<li class="tiny_redcloth_button I"  task="italic"> I </li>';
            option_html += '<li class="tiny_redcloth_button U"  task="underline"> U </li>';
            option_html += '<li class="tiny_redcloth_button UL"  task="un_ordered_list"> UL </li>';
            option_html += '<li class="tiny_redcloth_button OL"  task="ordered_list"> OL </li>';
            option_html += '<li class="tiny_redcloth_button ImageSelector"  task="image_select"> Insert/Upload Image </li>';
            option_html += '</ul>';

            $('ul.tiny_redcloth_buttons').each(function() {
                $(this).hide();
                if (!($(this).attr('tiny_redcloth_for') === undefined)) {
                    $('#' + $(this).attr('tiny_redcloth_for')).removeAttr('trc_option_enabled');
                }
            });

            active_obj.parent().append(option_html);

            $('ul.tiny_redcloth_buttons').css({
                "position": "absolute",
                "left": active_obj.offset().left + "px",
                "top":active_obj.offset().top - 30 + "px" ,
                'cursor': 'pointer'
            });

            $('ul.tiny_redcloth_buttons li').css({
                "float": "left",
                "listStyle": "none",
                "padding": "2px 5px",
                "fontSize": "20px",
                "border": "1px solid #cccccc"
            });


            active_obj.attr('trc_option_enabled', 1);

            $('li.tiny_redcloth_button').click(function() {
                var range = active_obj.getSelection();
                active_obj_scroll_top = active_obj.get(0).scrollTop;
                switch ($(this).attr('task')) {
                    case  'image_select': {
                        handleImageSelectOrUpload();
                        break;
                    }
                    case  'bold': {
                        active_obj.replaceSelection('*' + range.text + '*');
                        active_obj.setCursorPosition(range.end + 2);

                        break;
                    }
                    case  'italic': {

                        active_obj.replaceSelection('_' + range.text + '_');
                        active_obj.setCursorPosition(range.end + 2);
                        break;
                    }
                    case  'underline': {

                        active_obj.replaceSelection('+' + range.text + '+');
                        active_obj.setCursorPosition(range.end + 2);

                        break;
                    }
                    case  'un_ordered_list': {

                        active_obj.replaceSelection('* ' + range.text + '\n');
                        active_obj.setCursorPosition(range.end + 2);

                        break;
                    }
                    case  'ordered_list': {

                        active_obj.replaceSelection('# ' + range.text + '\n');
                        active_obj.setCursorPosition(range.end + 2);

                        break;
                    }
                    default:{
                        break;
                    }
                }
                active_obj.adjustScrollTop(active_obj_scroll_top);
            });


        }


    });

};

function getInputSelection(el) {
    var start = 0, end = 0, normalizedValue, range,
            textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}


new function($) {
    $.fn.setCursorPosition = function(pos) {
        var el = $(this).get(0);

        if (el.createTextRange) {
            var range = el.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
            el.focus();
        } else if (el.selectionStart || el.selectionStart == 0) {
            el.focus();
            el.selectionEnd = pos;
        }


        return $(this);
    }

    $.fn.adjustScrollTop = function(s_top) {
        $(this).get(0).scrollTop = s_top;
        return $(this);
    }

    $.fn.getCursorPosition = function() {
        var pos = 0;
        var el = $(this).get(0);
        // IE Support
        if (document.selection) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        // Firefox support
        else if (el.selectionStart || el.selectionStart == '0') {
            pos = el.selectionStart;
        }


        return pos;
    }


}(jQuery);

$.fn.tinyRedcloth.defaults = {

};

