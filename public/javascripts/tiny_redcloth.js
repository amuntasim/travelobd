$.fn.tinyRedcloth = function(options){

    var opts = $.extend($.fn.tinyRedcloth.defaults,options);

    var active_obj  = '';
    

    function hideKeyboardOption(){

    };




    return this.each(function() {
        active_obj = $(this);
        if(active_obj.attr('trc_option_enabled')===undefined){
            var option_html = '<ul tiny_redcloth_for="'+ active_obj.attr('id') +'" class="tiny_redcloth_buttons">';
            option_html += '<li class="tiny_redcloth_button B"  task="b">B </li>';
            option_html += '<li class="tiny_redcloth_button I"  task="i">I </li>';
            option_html += '<li class="tiny_redcloth_button U"  task="u">U </li>';
            option_html += '</ul>';

            $('ul.tiny_redcloth_buttons').each(function(){
                $(this).hide();
                if(!($(this).attr('tiny_redcloth_for') === undefined)){
                    $('#'+$(this).attr('tiny_redcloth_for')).removeAttr('trc_option_enabled');
                }
            });

            active_obj.parent().append(option_html) ;

            $('ul.tiny_redcloth_buttons').css( {
                "position": "absolute",
                "left": active_obj.offset().left + "px",
                "top":active_obj.offset().top-30 + "px"
            } );
            
            $('ul.tiny_redcloth_buttons li').css( {
                "float": "left",
                "listStyle": "none",
                "padding": "2px 5px",
                "fontSize": "20px",
                "border": "1px solid #cccccc"
            } );


            active_obj.attr('trc_option_enabled', 1);
            $('li.tiny_redcloth_button').click(function(){
                alert($(this).attr('task'));
            });
        }
       

    });

};

new function($) {
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
        else if (el.selectionStart || el.selectionStart == '0')
            pos = el.selectionStart;

        return pos;
    }
} (jQuery);

$.fn.tinyRedcloth.defaults = {
    
    };


