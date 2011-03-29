$.fn.banglaInput = function(options) {

    var opts = $.extend($.fn.banglaInput.defaults, options);

    var active_obj = '';
    var carry = '';
    var lastcarry = '';
    var parent_char = '';
    var prevChar = '';
    var old_len = 0;
    var current_char = '';
    var leftCar = false; //requires for bijoy e-kar i-kar etc
    var leftCarForJoint = '';   //requires for bijoy left Car with joint characters
    var vowelJoint = false; // for g+i-kar = I

    function hideKeyboardOption() {

    }


    function writePhonetic1(evnt) {
        /**************** Somewherein like*****************/

        var e = evnt.keyCode ? evnt.keyCode : evnt.which; // get the keycode
        var char_e = String.fromCharCode(e); // get the character equivalent to this keycode
        if (e == 8 || e == 32) {
            return true;
        }
        lastcarry = carry;
        carry += "" + char_e;	 //append the current character pressed to the carry

        var bangla = '';
        if (carry.length > 1)
            bangla = parsePhonetic1Carry(carry, e); // get the combined equivalent

        var tempBangla = parsePhonetic1Carry(char_e, e); // get the single equivalent


        if (old_len == 0) { //first character
            insertAtCursor(tempBangla);

            parent_char = carry;
            old_len = 1;
            return false;

        }
        else if ((bangla == "" && tempBangla != "")) { //that means it has no joint equivalent
            bangla = tempBangla;
            if (bangla == "")
                carry = "";
            else {
                carry = char_e;
                insertAtCursor(bangla);
                old_len = bangla.length;
            }
            return false;
        }
        else if (bangla != "") {//joint equivalent found
            insertJointAtCursor(bangla, old_len);
            parent_char = carry;
            old_len = bangla.length;
            return false;
        }
        //alert(e);
        return true;
    }


    function parsePhonetic1Carry(code, e) {

        if (!phonetic1[code]) // no bangla equivalent for this keystroke
            return '';

        else
            return phonetic1[code];
    }


    function writePhonetic2(evnt) {

        var e = evnt.keyCode ? evnt.keyCode : evnt.which; // get the keycode
        var char_e = String.fromCharCode(e); // get the character equivalent to this keycode
        if (e == 8 || e == 32 || e == 46) {
            return true;
        }

        lastcarry = carry;
        carry += "" + char_e;	 //append the current character pressed to the carry

        bangla = parsePhoneticCarry(carry, e); // get the combined equivalent
        tempBangla = parsePhoneticCarry(char_e, e); // get the single equivalent

        if (old_len == 0) { //first character
            insertJointAtCursor(bangla, 1);
            parent_char = carry;
            old_len = 1;
            return false;
        }
        else if ((bangla == "" && tempBangla != "")) { //that means it has no joint equivalent
            bangla = tempBangla;
            if (bangla == "")
                carry = "";
            else {
                carry = char_e;
                insertAtCursor(bangla);
                old_len = bangla.length;
            }
            return false;
        }
        else if (bangla != "") {//joint equivalent found
            insertJointAtCursor(bangla, old_len);
            parent_char = carry;
            old_len = bangla.length;
            return false;
        }
        //alert(e);
        return true;
    }


    function parsePhoneticCarry(code, e) {
        var len = code.length;
        current_char = code.charAt(len - 1);
        var temp = lastcarry + current_char;
        if (len > 1) {
            prevChar = code.substring(0, len - 1);
            //alert(current_char);

        }


        if (!phonetic[code]) {
            // no bangla equivalent for this keystroke
            if (e < 91) {
                temp = String.fromCharCode(e + 32);
                var pre_val = String.fromCharCode(e);
                carry = pre_val;
            }
            return '';
        }
        else {
            if (!phonetic_c[carry] && phonetic_c[prevChar])
                parent_char = prevChar;

            if (phonetic_v[parent_char] && phonetic_v[code]) {
                //alert(parent_char);
                space = false;
                return ( phonetic_v[code]);
            }
            else if ((prevChar == ' ' || space) && phonetic_v[current_char]) {
                space = false;
                return ( phonetic_v[current_char]);
            }


            else if (code == 'wr' || code == 'oi' || code == 'ou') {
                //alert('hi');
                space = false;
                if (phonetic_c[parent_char])
                    return phonetic[code];
                else
                    return phonetic_v[code];

            }
            else if ((phonetic_v[prevChar] && phonetic_v[code])) {
                space = false;
                return (phonetic_v[code]);
            }
            else {
                //alert(parent_char);
                space = false;
                return ( phonetic[code]);  //found bangla equivalent
            }
        }

    }


    function writeUnijoy(evnt) {
        var e = evnt.keyCode ? evnt.keyCode : evnt.which;
        var char_e = String.fromCharCode(e);
        if (e == 8 || e == 32 || e == 46) {
            return true;
        }

        lastcarry = carry;
        carry += "" + char_e;

        var bangla = '';
        if (carry.length > 1)
            bangla = parseUnijoyCarry(carry, e); // get the combined equivalent
        var tempBangla = parseUnijoyCarry(char_e, e); // get the single equivalent

        if (vowelJoint) {
            if (unijoy3[char_e]) {
                insertJointAtCursor(unijoy3[char_e], 1);
                vowelJoint = false;
                return false;
            }
            else {
                vowelJoint = false;
            }
        }

        if (char_e == 'g') {// found vowel joint
            vowelJoint = true;
        }

        if (old_len == 0) { //first character
            insertAtCursor(tempBangla);
            old_len = 1;
            return false;
        }
        else if ((bangla == "" && tempBangla != "")) { //that means it has no joint equivalent
            bangla = tempBangla;
            if (bangla == "") {
                carry = "";
                return false;
            }
            else {// found one equivalent
                carry = char_e;
                //prev_dis=bangla;
                insertAtCursor(bangla);
                old_len = bangla.length;
                return false;
            }
        }
        else if (bangla != "") {//joint equivalent found
            insertAtCursor(bangla);
            old_len = bangla.length;
            return false;
        }
        return true;
    }


    function parseUnijoyCarry(code, e) {
        if (!unijoy[code]) {
            if (e == 92)
                return 'ত্‍';   // khondo to
            else if (e == 124)
                return 'ঃ';     // bishorgho
            return ''; //return a null value
        }
        else
            return ( unijoy[code]);
    }


    function writeBijoy(evnt) {
        var e = evnt.keyCode ? evnt.keyCode : evnt.which;
        var char_e = String.fromCharCode(e);
        if (e == 8 || e == 32 || e == 46) {
            return true;
        }

        lastcarry = carry;
        carry += "" + char_e;
        var bangla = '';
        if (carry.length > 1)
            bangla = parseBijoyCarry(carry, e); // get the combined equivalent
        var tempBangla = parseBijoyCarry(char_e, e); // get the single equivalent


        if(bijoy_constants.indexOf(char_e) >= 0 && bijoy_constants.indexOf(prevChar) >= 0){
            leftCar = false;
            leftCarForJoint = '';
        }

        if (leftCar) {
            if (bijoy_constants.indexOf(char_e) >= 0) {
                if (vowelJoint) {
                    var tmp_position = active_obj.val().lastIndexOf(bijoy_key_maps[leftCarForJoint], active_obj.getCursorPosition())
                    if (tmp_position >= 0) {
                        tmp_container = []
                        for (var i = active_obj.getCursorPosition() - 1; i >= tmp_position - 1; i--) {
                            tmp_container.push(active_obj.val()[i]);
                        }

                        insertJointAtCursor(tmp_container.pop(), tmp_container.length + 1);
                        for (var j = tmp_container.length - 1; j >= 0; j--) {
                            if (tmp_container[j] != bijoy_key_maps[leftCarForJoint]) {
                                insertAtCursor(tmp_container[j]);
                            }
                        }
                        insertAtCursor(bijoy_key_maps[char_e]);
                        insertAtCursor(bijoy_key_maps[leftCarForJoint]);
                    }
                    leftCar = false;
                    leftCarForJoint = '';
                    vowelJoint = false;

                }
                else {
                    insertJointAtCursor(bijoy_key_maps[char_e], 1);
                    insertAtCursor(bijoy_key_maps[prevChar]);
                    old_len = 1;
                    leftCar = false;
                    leftCarForJoint = prevChar;
                }
                carry = char_e;
                return false;
            }
        }

        if (vowelJoint) {
            if (bijoy_key_maps3[char_e]) {
                if (bijoy_key_maps3[prevChar]) {
                    insertJointAtCursor(unijoy3[char_e], 1);
                }
                else {
                    insertAtCursor(unijoy3[char_e])
                }
                vowelJoint = false;
                carry = '';
                return false;
            }
            else {
                vowelJoint = false;
            }
        }

        if (char_e == 'g') {// found vowel joint
            vowelJoint = true;
            if (leftCarForJoint.length > 0)
                leftCar = true;
        }

        if ('cCd'.indexOf(char_e) >= 0) {// found left car
            leftCar = true;
        }


        if (old_len == 0) { //first character
            insertAtCursor(tempBangla);
            old_len = 1;
            return false;
        }
        else if ((bangla == "" && tempBangla != "")) { // no joint equivalent
            bangla = tempBangla;
            if (bangla == "") {
                carry = "";
                return false;
            }
            else {// found one equivalent
                carry = char_e;
                //prev_dis=bangla;
                insertAtCursor(bangla);
                old_len = bangla.length;
                return false;
            }
        }
        else if (bangla != "") {//joint equivalent found
            insertAtCursor(bangla, old_len);
            old_len = bangla.length;
            return false;
        }
        return true;
    }


    function parseBijoyCarry(code, e) {
        //this function just returns a bangla equivalent for a given keystroke
        //or a joint one
        //just read the array - if found then return the bangla eq.
        //otherwise return a null value
        var len = code.length;
        if (len > 1) {
            prevChar = code.substring(0, len - 1);
        }

        if (code == 'X')
            return 'ৗ';
        else if (!bijoy_key_maps[code]) {
            if (e == 92)
                return 'ত্‍';   // khondo to
            else if (e == 124)
                return 'ঃ';     // bishorgho
            return ''; //return a null value
        }
        else
            return ( bijoy_key_maps[code]);
    }

    function insertJointAtCursor(myValue, len) {

        var myField = active_obj;
        active_obj_scroll_top = active_obj.get(0).scrollTop;
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            if (myField.value.length >= len) {  // here is that first conjunction bug in IE, if you use the > operator
                sel.moveStart('character', -1 * (len));
                //sel.moveEnd('character',-1*(len-1));
            }
            sel.text = myValue;
            sel.collapse(true);
            sel.select();
        }
        //MOZILLA/NETSCAPE support
        else if (myField.selectionStart || myField.selectionStart == 0) {

            var startPos = myField.selectionStart - len;
            var endPos = myField.selectionEnd;
            var scrollTop = myField.scrollTop;
            startPos = (startPos == -1 ? myField.val().length : startPos );
            myField.val(myField.val().substring(0, startPos)
                    + myValue
                    + myField.val().substring(endPos, myField.val().length));

            myField.selectionStart = startPos + myValue.length;
            myField.selectionEnd = startPos + myValue.length;

        } else {
            var scrollTop = myField.scrollTop;
            var curPos = myField.getCursorPosition()
            myField.val(
                    myField.val().substring(0, curPos - len)
                            + myValue
                            + myField.val().substring(curPos + len - 1, myField.val().length)
                    );

        }
        myField.adjustScrollTop(active_obj_scroll_top);
        //document.getElementById("len").innerHTML = len;

    }


    function insertAtCursor(myValue) {

        var myField = $(active_obj);
        active_obj_scroll_top = active_obj.get(0).scrollTop;
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


        } else {
            var curPos = myField.getCursorPosition();
            myField.val(
                    myField.val().substring(0, curPos)
                            + myValue
                            + myField.val().substring(curPos, myField.val().length)
                    );
            myField.setCursorPosition(curPos + myValue.length);

        }
        myField.adjustScrollTop(active_obj_scroll_top);

    }


    return this.each(function() {
        active_obj = $(this);
        if (active_obj.attr('active_keyboard') === undefined)
            active_obj.attr('active_keyboard', opts.keyboard);

        if (active_obj.attr('option_enabled') === undefined) {
            var option_html = '<div bangla_option_for="' + active_obj.attr('id') + '" id="bangla_option_for_' + active_obj.attr('id') + '" class="bangla_input_option">';
            option_html += '<span>Keyboard</span>';
            option_html += '<select class="bangla_option_select"  style="padding:1px"><option value="phonetic1">ফনেটিক</option><option value="unijoy">ইউনিজয়</option><option value="bijoy">বিজয়</option><option value="english">English</option></select>';
            option_html += '</div>';

            $('div.bangla_input_option').each(function() {
                $(this).hide();
                if (!($(this).attr('bangla_option_for') === undefined)) {
                    $('#' + $(this).attr('bangla_option_for')).removeAttr('option_enabled');
                }
            });

            active_obj.parent().append(option_html);
            $('div#bangla_option_for_' + active_obj.attr('id')).css({
                "position": "absolute",
                "left": (active_obj.offset().left + active_obj.width() - 120) + "px",
                "top":active_obj.offset().top - 30 + "px"
            });

            $('select.bangla_option_select').val(active_obj.attr('active_keyboard'));

            $('div.bangla_input_option').show();
            active_obj.attr('option_enabled', 1);
            $('select.bangla_option_select').change(function() {
                active_obj.attr('active_keyboard', $(this).val());
            });
        }

        $('.bangla_input_option').hide();

        $(this).focus(function() {
            active_obj = $(this);
            $('.bangla_input_option').hide();
            $('div#bangla_option_for_' + active_obj.attr('id')).show();

        });

        $(this).focusout(function() {
            // $('div#bangla_option_for_' + active_obj.attr('id')).hide();
        });

        $('select.bangla_option_select').change(function() {
            active_obj.attr('active_keyboard', $(this).val());
        });

        $(this).keydown(function(ev) {

            switch (ev.keyCode) {
                case 16:
                    opts.shiftMode = true;
                    break;
                case 17:
                    opts.ctrlMode = true;
                    break;
                case 18:
                    opts.altMode = true;
                    break;
            }


        });

//        $(this).keyup(function(ev) {
//            switch (ev.keyCode) {
//                /*case 16:
//                 opts.shiftMode = true;
//                 break;*/
//                case 17:
//                    opts.ctrlMode = false;
//                    break;
//                case 18:
//                    opts.altMode = false;
//                    break;
//            }
//
//
//        });
        $(this).keypress(function(evnt) {
            hideKeyboardOption();

            var e = evnt.keyCode ? evnt.keyCode : evnt.which;

            if (e == 8 || e == 32 || e == 13) {
                carry = '';
                lastcarry = '';
                parent_char = '';
                prevChar = '';
                leftCar = false;

                space = true;
                return true;
            }

            if (opts.ctrlMode || opts.altMode) {
                opts.ctrlMode = opts.altMode = false;
                return true;
            }
            //active_obj.onkeydown= docOnKeydown;
            switch ($(this).attr('active_keyboard')) {
                case 'unijoy' :{
                    return writeUnijoy(evnt);
                    break;
                }

                case 'phonetic2' :{
                    writePhonetic2(evnt);
                    break;
                }

                case 'avro' :{
                    return write_avro(evnt);
                    break;
                }

                case 'monir' :{
                    return write_monir(evnt);
                    break;
                }

                case 'english' :{
                    break;
                }

                case 'bijoy' :{
                    return writeBijoy(evnt);
                    break;
                }

                case 'phonetic1' :
                default:{
                    return writePhonetic1(evnt);
                    break;
                }
            }

        });
    });

};


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

$.fn.banglaInput.defaults = {
    //keyboard: 'phonetic1',
    keyboard: 'bijoy',
    space: true,
    shiftMode: false,
    ctrlMode: false,
    altMode: false,
    sac: false,
    noEffect: false
};


// For Unicode characters

var unijoy = {
    'a':'ৃ', //wri kar
    'A':'র্', //ref
    'a':'ঋ', //wri
    's':'ু', //u kar
    'S':'ূ', //U kar
    's':'উ', // wrossho u
    'd':'ি', //i kar
    'D':'ী', //I kar
    'd':'ই', //I kar
    'f':'া', //a kar
    'F':'অ', //shore  o
    'f':'আ', //shore  a
    'g':'্', //
    'G':'|', //dari
    'g':'্‌', //hashant
    'h':'ব', //bo
    'H':'ভ', //vo
    'h':'ৰ', //bo with diagonal
    'j':'ক', //ko
    'J':'খ', //kho
    'k':'ত', //to
    'K':'থ', //tho
    'l':'দ', //do
    'L':'ধ', //dho
    'Z':'্য', //zo fola
    'z':'্র', //ro fola
    'z':'ৢ', // hsnt li
    'x':'ো', //o kar
    'X':'ৌ', //ou kar
    'x':'ৌও', //oo
    'x':'ৗ', //???
    'c':'ে', //e kar
    'C':'ৈ', //oi kar
    'c':'এ', //e
    'c':'ৠ', //wri +wri kar
    'v':'র', //ro
    'V':'ল', //lo
    'v':'ৱ', //ro with diagonal
    'v':'ৣ', //li +li
    'b':'ন', //dontnnoo no
    'B':'ণ', //murdhonno no
    'b':'ৄ', //double wri
    'n':'স', //dontnnoo ssho
    'N':'ষ', //murdhonno sho
    'm':'ম', //mo
    '.':'়', //nukta
    'M':'শ', //talobbo ssho
    'q':'ঙ', //uma
    'Q':'ং', //onursha
    'q':'ঌ', //li
    'w':'য', //zo
    'W':'য়', //ontosto
    'w':'ৡ', //li..
    'e':'ড', //ddo
    'E':'ঢ', //ddho
    'e':'ঈ', //dirgho e
    'r':'প', //po
    'R':'ফ', //fo
    't':'ট', //tto
    'T':'ঠ', //ttho
    'y':'চ', //cho
    'Y':'ছ', //co
    'u':'জ', //b jo
    'U':'ঝ', //jho
    'u':'ঊ', //dirgho u
    'i':'হ', //ho
    'I':'ঞ', //eo
    'i':'ঐ', //oi
//'i'] ='';
    'o':'গ', //go
    'O':'ঘ', //gho
    'o':'ঔ', //ou
    'p':'ড়', //ddo e bindu ro
    'P':'ঢ়', //ddho e bindu ro
//'\'':'ড়';
//'|':'ঢ়', //bishorgho
    '&':'ঁ', //chondrobindu

    '0':'০',
    '0':'৸',
    '1':'১',
    '1':'৴',
    '2':'২',
    '2':'৵',
    '3':'৩',
    '3':'৶',
    '4':'৪',
    '4':'|',
    '$':'৳',
    '5':'৫',
    '5':'৲',
    '6':'৬',
    '^':'÷',
    '7':'৭',
    '7':'৺',
    '8':'৮',
    '9':'৯',
    '-':'৸'
}

var unijoy3 = {
    'a':'ঋ', //wri
    's':'উ', // wrossho u
    'd':'ই', //I kar
    'f':'আ', //shore  a
    'g':'্‌', //hashant
    'h':'ৰ', //bo with diagonal
    'z':'ৢ', // hsnt li
    'x':'ৌও', //oo
    'c':'এ', //e
    'v':'ৱ', //ro with diagonal
    '.':'়', //nukta
    'q':'ঌ', //li
    'e':'ঈ', //dirgho e
    'u':'ঊ', //dirgho u
    'i':'ঐ', //oi
    'o':'ঔ' //ou
}

var unijoy4 = {
    'x':'ৗ', //???
    'c':'ৠ', //wri +wri kar
    'v':'ৣ', //li +li
    'b':'ৄ', //double wri
    'w':'ৡ', //li..
    '0':'৸',
    '1':'৴',
    '2':'৵',
    '3':'৶',
    '4':'|',
    '5':'৲',
    '7':'৺',
    '-':'৸'
}

// phonetic bangla equivalents

var phonetic = {
    'k':'ক', // ko
    'q':'ক', // ko
    'Q':'ক', // ko
    'oi':'ৈ', // oi kar
    'Oi':'ঐ', // oi

    'i':'ি', // hrossho i kar
    'I':'ই', // hrossho i
    'ii':'ী', // dirgho i kar
    'Ii':'ঈ', // dirgho i
    'e':'ে', // e kar
    'E':'এ', // E
    'U':'উ', // hrossho u
    'W':'উ', // hrossho u
    'u':'ু', // hrossho u kar
    'uu':'ূ', // dirgho u kar
    'Uu':'ঊ', // dirgho u
    'Ww':'ঊ', // dirgho u
    'Oo':'ঊ', // dirgho u
    'r':'র', // ro
    'a':'া', // a kar
    'Aa':'আ', // shore a
    'A':'অ', // shore o
    's':'স', // dontyo so
    't':'ত', // to
    'kh':'খ', // Kho ////
    'n':'ন', // dontyo no
    'nH':'ণ', // murdhonyo no
    'tt':'ট', // tto
    'tH':'ঠ', // ttho
    'd':'দ', // do
    'dh':'ধ', // dho
    'b':'ব', // bo
    'v':'ভ', // bho
    'rr':'ড়', // doye bindu ro
    'rh':'ঢ়', // dhoye bindu ro
    'g':'গ', // go
    'gh':'ঘ', // gho
    'h':'হ', // ho
    'nY':'ঞ', // yo
    'z':'জ', // borgio jo
    'zh':'ঝ', // jho
    'jh':'ঝ', // jho
    'ch':'চ', // cho
    'c':'ছ', // ccho
    'th':'থ', // tho
    'p':'প', // po
    'f':'ফ', // fo
    'dd':'ড', // ddo
    'dH':'ঢ', // ddho

    'j':'য', // ontoshyo zo
    'y':'য়', // ontostho yo
    'Y':'য়', // ontostho yo
    'nG':'ঙ', // Uma
    'Ng':'ং', // uniswor
    'l':'ল', // lo
    'm':'ম', // mo
    'sh':'শ', // talobyo sho
    'ss':'ষ', // mordhonyo sho
    'O':'ও', // o
    'o':'ো', //o kar
    'ou':'ৌ', // ou kar
    'Ou':'ঔ', // OU
    'w':'ঔ', // OU
    'tt':'ট', // tto
    ':':'ঃ', // bisworgo
    ".":"|", // dari
    "..":"়", // fullstop
//'tX':'ত্‍', // hosonto
    'tX':'ত্‍‌', //
    'Ny':'ঁ', // chondrobindu
    'x':'্য', // jo fola
    'X':'্য', // jo fola
    'wr':'ৃ', // wri kar
//End Set
///////shift key//////////
    'K':'্ক',
    'Kh':'্খ',
    'G':'্গ',
    'Gh':'্ঘ',
    'NG':'্ঙ',
    'Ch':'্চ',
    'C':'্ছ',
    'Z':'্জ',
    'Zh':'্ঝ',
    'Jh':'্ঝ',
    'NY':'্ঞ',
    'Tt':'্ট',
    'TH':'্ঠ',
    'Dd':'্ড',
    'DH':'্ঢ',
    'NH':'্ণ',
    'T':'্ত',
    'Th':'্থ',
    'D':'্দ',
    'Dh':'্ধ',
    'N':'্ন',
    'P':'্প',
    'F':'্ফ',
    'B':'্ব',
    'V':'্ভ',
    'M':'্ম',
    'J':'্য',
    'R':'্র',
    'L':'্ল',
    'Sh':'্শ',
    'Ss':'্ষ',
    'S':'্স',
    'H':'্হ',
    'Rr':'্ড়',
    'Rh':'্ঢ়',

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


//////////////////////set of vowel//////////
var phonetic_v = {
    'o':'অ',
    'a':'আ',
    'i':'ই',
    'I':'ই',
    'Ii':'ঈ',
    'u':'উ',
//'U']='ঊ',
    'ri':'ঋ',
    'e':'এ',
    'oi':'ঐ',
    'O':'ও',
    'ou':'ঔ',
    'Ou':'ঔ',
    'wr':'ঋ'
}

///////////////////SET OF CONSONANT////////////////
var phonetic_c = {
    'k':'ক',
    'kh':'খ',
    'g':'গ',
    'gh':'ঘ',
//'nG']='ঙ',
    'ch':'চ',
    'c':'ছ',
    'z':'জ',
    'zh':'ঝ',
    'jh':'ঝ',
//'nY']='ঞ',
    'tt':'ট',
    'tH':'ঠ',
    'dd':'ড',
    'dH':'ঢ',
    'nH':'ণ',
    't':'ত',
    'th':'থ',
    'd':'দ',
    'dh':'ধ',
    'n':'ন',
    'p':'প',
    'f':'ফ',
    'b':'ব',
    'v':'ভ',
    'm':'ম',
    'j':'য',
    'r':'র',
    'l':'ল',
    'sh':'শ',
    'ss':'ষ',
    's':'স',
    'h':'হ',
    'rr':'ড়',
    'rh':'ঢ়',
    'x':'্য'
}
/****************** Phonetic 1 (Somewhere type)*************/
var phonetic1 = {
// phonetic1 bangla equivalents
    'k':'ক', // ko
    'kh':'খ', // Kho ////
    'K':'খ', // Kho ////
    'g':'গ',    // go
    'gh':'ঘ',    // gho
    'G':'ঘ',    // gho
    'Ng':'ঙ',    // Uma

    'ch':'চ', // cho
    'c':'চ', // cho
    'C':'ছ', // ccho
    'j':'জ',    // borgio jo
    'jh':'ঝ', // jho
    'J':'ঝ', // jho
    'NG':'ঞ',    // yo

    't':'ট', // tto
    'th':'ঠ', // ttho
    'd':'ড', // ddo
    'dh':'ঢ', // ddho
    'N':'ণ', // murdhonyo no

    'T':'ত', // to
    'Th':'থ', // tho
    'D':'দ', // do
    'Dh':'ধ', // dho
    'n':'ন', // dontyo no

    'p':'প', // po
    'ph':'ফ', // fo
    'f':'ফ', // fo
    'b':'ব', // bo
    'w':'ব', // bo
    'v':'ভ', // bho
    'bh':'ভ', // bho
    'm':'ম',    // mo

    'z':'য',  // ontoshyo zo
    'r':'র', // ro
    'l':'ল',    // lo
    'sh':'শ',    // talobyo sho
//'S']='শ',	// talobyo sho
    'S':'ষ', // mordhonyo sho
    's':'স', // dontyo so

//'h':'\u200c',
    'h':'হ',// ho
    'H':'ঃ',    // bisworgo
    'R':'ড়',     // doye bindu ro
    'Rh':'ঢ়',     // dhoye bindu ro
    'y':'য়',    // ontostho yo


    'tt':'ৎ',
    'ng':'ং',    // uniswor
    'HH':'ঃ', // bisworgo
    'NN':'ঁ', // chondrobindu


    'a':'া', // a kar
    'i':'ি', // hrossho i kar
    'ii':'ী', // dirgho i kar
    'u':'ু', // hrossho u kar
    'uu':'ূ', // dirgho u kar
    'wr':'ৃ', // wri kar
    'e':'ে', // e kar
    'oi':'ৈ', // oi kar
    'o':'ো',  //o kar
    'ou':'ৌ', // ou kar
    '+':'্',
    '++':'+',
    'Hh':'্‌‌‌' + '\u200c',  //Hoshont
    'Y':'্য',
    ".":"।", // dari

    'ao':'অ',
    'A':'আ',
    'I':'ই',
    'II':'ঈ',
    'U':'উ',
    'UU':'ঊ',
    'WR':'ঋ',
    'E':'এ',
    'OI':'ঐ',
    'O':'ও',
    'OU':'ঔ',

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
var bijoy_constants = 'hHjJkKlLvVbBnNmMqwWeErRtTyYuUiIoOpP';

var bijoy_key_maps = {
    "0":"০",
    "1":"১",
    "2":"২",
    "3":"৩",
    "4":"৪",
    "5":"৫",
    "6":"৬",
    "7":"৭",
    "8":"৮",
    "9":"৯",

    "a":"ৃ",
    "A":"র্",
    "d":"ি",
    "D":"ী",
    "s":"ু",
    "S":"ূ",
    "f":"া",
    "F":"অ",
    "g":"্",
    "G":"।",
    "h":"ব",
    "H":"ভ",
    "j":"ক",
    "J":"খ",
    "k":"ত",
    "K":"থ",
    "l":"দ",
    "L":"ধ",
    "z":"্র",
    "Z":"্য",
    "X":"ৗ",
    "c":"ে",
    "C":"ৈ",
    "v":"র",
    "V":"ল",
    "b":"ন",
    "B":"ণ",
    "n":"স",
    "N":"ষ",
    "m":"ম",
    "M":"শ",

    "q":"ঙ",
    "Q":"ং",
    "w":"য",
    "W":"য়",
    "e":"ড",
    "E":"ঢ",
    "r":"প",
    "R":"ফ",
    "t":"ট",
    "T":"ঠ",
    "y":"চ",
    "Y":"ছ",
    "u":"জ",
    "U":"ঝ",
    "i":"হ",
    "I":"ঞ",
    "o":"গ",
    "O":"ঘ",
    "p":"ড়",
    "P":"ঢ়",
    "&":"ঁ",
    "$":"৳",
    "`":"‌",
    "~":"‍",
    "\\":"ৎ",
    "|":"ঃ"
};

//third layer characters
var bijoy_key_maps3 = {
    "a":"ঋ",
    "s":"উ",
    "d":"ই",
    "f":"আ",
    "g":"্" ,
    "h":"ৰ",
    "z":'ৢ' ,
    'x':'ৌও' ,
    'c':'এ',
    'v':'ৱ',
    '.':'়' ,
    'q':'ঌ',
    'D':'ঈ',
    'S':'ঊ',
    'C':'ঐ',
    'X':'ঔ',
    "x":"ও"
};

var bijoy_key_maps4 = {
    'x':'ৗ',
    'c':'ৠ',
    'v':'ৣ',
    'b':'ৄ' ,
    'w':'ৡ',
    '0':'৸',
    '1':'৴',
    '2':'৵',
    '3':'৶',
    '4':'|',
    '5':'৲',
    '7':'৺',
    '-':'৸'
}