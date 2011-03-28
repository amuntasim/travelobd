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
    var vowelJoint = false;

    function hideKeyboardOption() {

    }


    function writePhonetic1(evnt) {
        /**************** Somewherein like*****************/

        var e = evnt.keyCode ? evnt.keyCode : evnt.which; // get the keycode
        var char_e = String.fromCharCode(e); // get the character equivalent to this keycode
        if (e == 8 || e == 32 || e == 46) {
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
        //this function just returns a bangla equivalent for a given keystroke
        //or a joint one
        //just read the array - if found then return the bangla eq.
        //otherwise return a null value
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

        if (leftCar) {
            if (unijoy_consonants.indexOf(char_e) >= 0) {
                insertJointAtCursor(unijoy[char_e], 1);
                insertAtCursor(unijoy[prevChar]);
                old_len = 1;
                leftCar = false;
                return false;
            }
            else {
                leftCar = false;
            }
        }

        if ('cCd'.indexOf(char_e) >= 0) {// found left car
            if (prevChar.length == 0 || ( unijoy_consonants.indexOf(prevChar) < 0)) {
                leftCar = true;
                prevChar = char_e;

            }
            else {
                leftCar = false;

            }

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
        else if (!unijoy[code]) {
            if (e == 92)
                return 'ত্‍';   // khondo to
            else if (e == 124)
                return 'ঃ';     // bishorgho
            return ''; //return a null value
        }
        else
            return ( unijoy[code]);
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
                /*case 16:
                 opts.shiftMode = true;
                 break;*/
                case 17:
                    opts.ctrlMode = true;
                    break;
                case 18:
                    opts.altMode = true;
                    break;
            }


        });

        $(this).keyup(function(ev) {
            switch (ev.keyCode) {
                /*case 16:
                 opts.shiftMode = true;
                 break;*/
                case 17:
                    opts.ctrlMode = false;
                    break;
                case 18:
                    opts.altMode = false;
                    break;
            }


        });
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

var unijoy = new Array();
var unijoy3 = new Array();
var unijoy4 = new Array();
//var unijoy_consonants = ['h','H','j', 'J','k','K', 'l', 'L','v','V','b', 'B', 'n','N', 'm', 'M', 'q', 'w', 'W', 'e', 'E', 'r', 'R', 't', 'T', 'y', 'Y', 'u', 'U', 'i', 'I','o', 'O', 'p', 'P'];
var unijoy_consonants = 'hHjJkKlLvVbBnNmMqwWeErRtTyYuUiIoOpP';

unijoy['a'] = 'ৃ'; //wri kar
unijoy['A'] = 'র্'; //ref
unijoy3['a'] = 'ঋ';  //wri
unijoy['s'] = 'ু'; //u kar
unijoy['S'] = 'ূ'; //U kar
unijoy3['s'] = 'উ'; // wrossho u
unijoy['d'] = 'ি'; //i kar
unijoy['D'] = 'ী'; //I kar
unijoy3['d'] = 'ই'; //I kar
unijoy['f'] = 'া'; //a kar
unijoy['F'] = 'অ'; //shore  o
unijoy3['f'] = 'আ'; //shore  a
unijoy['g'] = '্'; //
unijoy['G'] = '|'; //dari
unijoy3['g'] = '্‌'; //hashant
unijoy['h'] = 'ব'; //bo
unijoy['H'] = 'ভ'; //vo
unijoy3['h'] = 'ৰ'; //bo with diagonal
unijoy['j'] = 'ক'; //ko
unijoy['J'] = 'খ'; //kho
unijoy['k'] = 'ত'; //to
unijoy['K'] = 'থ'; //tho
unijoy['l'] = 'দ'; //do
unijoy['L'] = 'ধ'; //dho
unijoy['z'] = '্য'; //zo fola
unijoy['Z'] = '্র'; //ro fola
unijoy3['z'] = 'ৢ'; // hsnt li
unijoy['x'] = 'ো'; //o kar
unijoy['X'] = 'ৌ'; //ou kar
unijoy3['x'] = 'ৌও'; //oo
unijoy4['x'] = 'ৗ'; //???
unijoy['c'] = 'ে'; //e kar
unijoy['C'] = 'ৈ'; //oi kar
unijoy3['c'] = 'এ'; //e
unijoy4['c'] = 'ৠ'; //wri +wri kar
unijoy['v'] = 'র'; //ro
unijoy['V'] = 'ল'; //lo
unijoy3['v'] = 'ৱ'; //ro with diagonal
unijoy4['v'] = 'ৣ'; //li +li
unijoy['b'] = 'ন'; //dontnnoo no
unijoy['B'] = 'ণ'; //murdhonno no
unijoy4['b'] = 'ৄ'; //double wri
unijoy['n'] = 'স'; //dontnnoo ssho
unijoy['N'] = 'ষ'; //murdhonno sho
unijoy['m'] = 'ম'; //mo
unijoy3['.'] = '়'; //nukta
unijoy['M'] = 'শ'; //talobbo ssho
unijoy['q'] = 'ঙ'; //uma
unijoy['Q'] = 'ং'; //onursha
unijoy3['q'] = 'ঌ'; //li
unijoy['w'] = 'য'; //zo
unijoy['W'] = 'য়'; //ontosto
unijoy4['w'] = 'ৡ'; //li..
unijoy['e'] = 'ড'; //ddo
unijoy['E'] = 'ঢ'; //ddho
unijoy3['e'] = 'ঈ'; //dirgho e
unijoy['r'] = 'প'; //po
unijoy['R'] = 'ফ'; //fo
unijoy['t'] = 'ট'; //tto
unijoy['T'] = 'ঠ'; //ttho
unijoy['y'] = 'চ'; //cho
unijoy['Y'] = 'ছ'; //co
unijoy['u'] = 'জ'; //b jo
unijoy['U'] = 'ঝ'; //jho
unijoy3['u'] = 'ঊ'; //dirgho u
unijoy['i'] = 'হ'; //ho
unijoy['I'] = 'ঞ'; //eo
unijoy3['i'] = 'ঐ'; //oi
//unijoy4['i'] ='';
unijoy['o'] = 'গ'; //go
unijoy['O'] = 'ঘ'; //gho
unijoy3['o'] = 'ঔ'; //ou
unijoy['p'] = 'ড়'; //ddo e bindu ro
unijoy['P'] = 'ঢ়'; //ddho e bindu ro
//unijoy['\''] = 'ড়';
//unijoy['|'] = 'ঢ়'; //bishorgho
unijoy['&'] = 'ঁ'; //chondrobindu

unijoy['0'] = '০';
unijoy4['0'] = '৸';
unijoy['1'] = '১';
unijoy4['1'] = '৴';
unijoy['2'] = '২';
unijoy4['2'] = '৵';
unijoy['3'] = '৩';
unijoy4['3'] = '৶';
unijoy['4'] = '৪';
unijoy4['4'] = '|';
unijoy['$'] = '৳';
unijoy['5'] = '৫';
unijoy4['5'] = '৲';
unijoy['6'] = '৬';
unijoy['^'] = '÷';
unijoy['7'] = '৭';
unijoy4['7'] = '৺';
unijoy['8'] = '৮';
unijoy['9'] = '৯';
unijoy4['-'] = '৸';


// phonetic bangla equivalents

var phonetic = new Array();
var phonetic_v = new Array();
var phonetic_c = new Array();


phonetic['k'] = 'ক'; // ko
phonetic['q'] = 'ক'; // ko
phonetic['Q'] = 'ক'; // ko
phonetic['oi'] = 'ৈ'; // oi kar
phonetic['Oi'] = 'ঐ'; // oi

phonetic['i'] = 'ি'; // hrossho i kar
phonetic['I'] = 'ই'; // hrossho i
phonetic['ii'] = 'ী'; // dirgho i kar
phonetic['Ii'] = 'ঈ'; // dirgho i
phonetic['e'] = 'ে'; // e kar
phonetic['E'] = 'এ'; // E
phonetic['U'] = 'উ'; // hrossho u
phonetic['W'] = 'উ'; // hrossho u
phonetic['u'] = 'ু'; // hrossho u kar
phonetic['uu'] = 'ূ'; // dirgho u kar
phonetic['Uu'] = 'ঊ'; // dirgho u
phonetic['Ww'] = 'ঊ'; // dirgho u
phonetic['Oo'] = 'ঊ'; // dirgho u
phonetic['r'] = 'র'; // ro
phonetic['a'] = 'া'; // a kar
phonetic['Aa'] = 'আ'; // shore a
phonetic['A'] = 'অ'; // shore o
phonetic['s'] = 'স'; // dontyo so
phonetic['t'] = 'ত'; // to
phonetic['kh'] = 'খ'; // Kho ////
phonetic['n'] = 'ন'; // dontyo no
phonetic['nH'] = 'ণ'; // murdhonyo no
phonetic['tt'] = 'ট'; // tto
phonetic['tH'] = 'ঠ'; // ttho
phonetic['d'] = 'দ'; // do
phonetic['dh'] = 'ধ'; // dho
phonetic['b'] = 'ব'; // bo
phonetic['v'] = 'ভ'; // bho
phonetic['rr'] = 'ড়';	 // doye bindu ro
phonetic['rh'] = 'ঢ়';	 // dhoye bindu ro
phonetic['g'] = 'গ';	// go
phonetic['gh'] = 'ঘ';	// gho
phonetic['h'] = 'হ';	// ho
phonetic['nY'] = 'ঞ';	// yo
phonetic['z'] = 'জ';	// borgio jo
phonetic['zh'] = 'ঝ'; // jho
phonetic['jh'] = 'ঝ'; // jho
phonetic['ch'] = 'চ'; // cho
phonetic['c'] = 'ছ'; // ccho
phonetic['th'] = 'থ'; // tho
phonetic['p'] = 'প'; // po
phonetic['f'] = 'ফ'; // fo
phonetic['dd'] = 'ড'; // ddo
phonetic['dH'] = 'ঢ'; // ddho

phonetic['j'] = 'য';  // ontoshyo zo
phonetic['y'] = 'য়';	// ontostho yo
phonetic['Y'] = 'য়';	// ontostho yo
phonetic['nG'] = 'ঙ';	// Uma
phonetic['Ng'] = 'ং';	// uniswor
phonetic['l'] = 'ল';	// lo
phonetic['m'] = 'ম';	// mo
phonetic['sh'] = 'শ';	// talobyo sho
phonetic['ss'] = 'ষ'; // mordhonyo sho
phonetic['O'] = 'ও'; // o
phonetic['o'] = 'ো';  //o kar
phonetic['ou'] = 'ৌ'; // ou kar
phonetic['Ou'] = 'ঔ'; // OU
phonetic['w'] = 'ঔ'; // OU
phonetic['tt'] = 'ট'; // tto
phonetic[':'] = 'ঃ'; // bisworgo
phonetic["."] = "|"; // dari
phonetic[".."] = "়"; // fullstop
//phonetic['tX'] = 'ত্‍'; // hosonto
phonetic['tX'] = 'ত্‍‌';
phonetic['Ny'] = 'ঁ'; // chondrobindu
phonetic['x'] = '্য'; // jo fola
phonetic['X'] = '্য'; // jo fola
phonetic['wr'] = 'ৃ'; // wri kar
//End Set
///////shift key//////////
phonetic['K'] = '্ক';
phonetic['Kh'] = '্খ';
phonetic['G'] = '্গ';
phonetic['Gh'] = '্ঘ';
phonetic['NG'] = '্ঙ';
phonetic['Ch'] = '্চ';
phonetic['C'] = '্ছ';
phonetic['Z'] = '্জ';
phonetic['Zh'] = '্ঝ';
phonetic['Jh'] = '্ঝ';
phonetic['NY'] = '্ঞ';
phonetic['Tt'] = '্ট';
phonetic['TH'] = '্ঠ';
phonetic['Dd'] = '্ড';
phonetic['DH'] = '্ঢ';
phonetic['NH'] = '্ণ';
phonetic['T'] = '্ত';
phonetic['Th'] = '্থ';
phonetic['D'] = '্দ';
phonetic['Dh'] = '্ধ';
phonetic['N'] = '্ন';
phonetic['P'] = '্প';
phonetic['F'] = '্ফ';
phonetic['B'] = '্ব';
phonetic['V'] = '্ভ';
phonetic['M'] = '্ম';
phonetic['J'] = '্য';
phonetic['R'] = '্র';
phonetic['L'] = '্ল';
phonetic['Sh'] = '্শ';
phonetic['Ss'] = '্ষ';
phonetic['S'] = '্স';
phonetic['H'] = '্হ';
phonetic['Rr'] = '্ড়';
phonetic['Rh'] = '্ঢ়';

phonetic['0'] = '০';
phonetic['1'] = '১';
phonetic['2'] = '২';
phonetic['3'] = '৩';
phonetic['4'] = '৪';
phonetic['5'] = '৫';
phonetic['6'] = '৬';
phonetic['7'] = '৭';
phonetic['8'] = '৮';
phonetic['9'] = '৯';
//////////////////////set of vowel//////////
phonetic_v['o'] = 'অ';
phonetic_v['a'] = 'আ';
phonetic_v['i'] = 'ই';
phonetic_v['I'] = 'ই';
phonetic_v['Ii'] = 'ঈ';
phonetic_v['u'] = 'উ';
//phonetic_v['U']='ঊ';
phonetic_v['ri'] = 'ঋ';
phonetic_v['e'] = 'এ';
phonetic_v['oi'] = 'ঐ';
phonetic_v['O'] = 'ও';
phonetic_v['ou'] = 'ঔ';
phonetic_v['Ou'] = 'ঔ';
phonetic_v['wr'] = 'ঋ';

///////////////////SET OF CONSONANT////////////////
phonetic_c['k'] = 'ক';
phonetic_c['kh'] = 'খ';
phonetic_c['g'] = 'গ';
phonetic_c['gh'] = 'ঘ';
//phonetic_c['nG']='ঙ';
phonetic_c['ch'] = 'চ';
phonetic_c['c'] = 'ছ';
phonetic_c['z'] = 'জ';
phonetic_c['zh'] = 'ঝ';
phonetic_c['jh'] = 'ঝ';
//phonetic_c['nY']='ঞ';
phonetic_c['tt'] = 'ট';
phonetic_c['tH'] = 'ঠ';
phonetic_c['dd'] = 'ড';
phonetic_c['dH'] = 'ঢ';
phonetic_c['nH'] = 'ণ';
phonetic_c['t'] = 'ত';
phonetic_c['th'] = 'থ';
phonetic_c['d'] = 'দ';
phonetic_c['dh'] = 'ধ';
phonetic_c['n'] = 'ন';
phonetic_c['p'] = 'প';
phonetic_c['f'] = 'ফ';
phonetic_c['b'] = 'ব';
phonetic_c['v'] = 'ভ';
phonetic_c['m'] = 'ম';
phonetic_c['j'] = 'য';
phonetic_c['r'] = 'র';
phonetic_c['l'] = 'ল';
phonetic_c['sh'] = 'শ';
phonetic_c['ss'] = 'ষ';
phonetic_c['s'] = 'স';
phonetic_c['h'] = 'হ';
phonetic_c['rr'] = 'ড়';
phonetic_c['rh'] = 'ঢ়';
phonetic_c['x'] = '্য';

/****************** Phonetic 1 (Somewhere type)*************/
var phonetic1 = new Array();
// phonetic1 bangla equivalents
phonetic1['k'] = 'ক'; // ko
phonetic1['kh'] = 'খ'; // Kho ////
phonetic1['K'] = 'খ'; // Kho ////
phonetic1['g'] = 'গ';	// go
phonetic1['gh'] = 'ঘ';	// gho
phonetic1['G'] = 'ঘ';	// gho
phonetic1['Ng'] = 'ঙ';	// Uma

phonetic1['ch'] = 'চ'; // cho
phonetic1['c'] = 'চ'; // cho
phonetic1['C'] = 'ছ'; // ccho
phonetic1['j'] = 'জ';	// borgio jo
phonetic1['jh'] = 'ঝ'; // jho
phonetic1['J'] = 'ঝ'; // jho
phonetic1['NG'] = 'ঞ';	// yo

phonetic1['t'] = 'ট'; // tto
phonetic1['th'] = 'ঠ'; // ttho
phonetic1['d'] = 'ড'; // ddo
phonetic1['dh'] = 'ঢ'; // ddho
phonetic1['N'] = 'ণ'; // murdhonyo no

phonetic1['T'] = 'ত'; // to
phonetic1['Th'] = 'থ'; // tho
phonetic1['D'] = 'দ'; // do
phonetic1['Dh'] = 'ধ'; // dho
phonetic1['n'] = 'ন'; // dontyo no

phonetic1['p'] = 'প'; // po
phonetic1['ph'] = 'ফ'; // fo
phonetic1['f'] = 'ফ'; // fo
phonetic1['b'] = 'ব'; // bo
phonetic1['w'] = 'ব'; // bo
phonetic1['v'] = 'ভ'; // bho
phonetic1['bh'] = 'ভ'; // bho
phonetic1['m'] = 'ম';	// mo

phonetic1['z'] = 'য';  // ontoshyo zo
phonetic1['r'] = 'র'; // ro
phonetic1['l'] = 'ল';	// lo
phonetic1['sh'] = 'শ';	// talobyo sho
//phonetic1['S']='শ';	// talobyo sho
phonetic1['S'] = 'ষ'; // mordhonyo sho
phonetic1['s'] = 'স'; // dontyo so

//phonetic1['h'] = '\u200c';
phonetic1['h'] = 'হ';// ho
phonetic1['H'] = 'ঃ';	// bisworgo
phonetic1['R'] = 'ড়';	 // doye bindu ro
phonetic1['Rh'] = 'ঢ়';	 // dhoye bindu ro
phonetic1['y'] = 'য়';	// ontostho yo


phonetic1['tt'] = 'ৎ';
phonetic1['ng'] = 'ং';	// uniswor
phonetic1['HH'] = 'ঃ'; // bisworgo
phonetic1['NN'] = 'ঁ'; // chondrobindu


phonetic1['a'] = 'া'; // a kar
phonetic1['i'] = 'ি'; // hrossho i kar
phonetic1['ii'] = 'ী'; // dirgho i kar
phonetic1['u'] = 'ু'; // hrossho u kar
phonetic1['uu'] = 'ূ'; // dirgho u kar
phonetic1['wr'] = 'ৃ'; // wri kar
phonetic1['e'] = 'ে'; // e kar
phonetic1['oi'] = 'ৈ'; // oi kar
phonetic1['o'] = 'ো';  //o kar
phonetic1['ou'] = 'ৌ'; // ou kar
phonetic1['+'] = '্';
phonetic1['++'] = '+';
phonetic1['Hh'] = '্‌‌‌' + '\u200c';  //Hoshont
phonetic1['Y'] = '্য';
phonetic1["."] = "।"; // dari

phonetic1['ao'] = 'অ';
phonetic1['A'] = 'আ';
phonetic1['I'] = 'ই';
phonetic1['II'] = 'ঈ';
phonetic1['U'] = 'উ';
phonetic1['UU'] = 'ঊ';
phonetic1['WR'] = 'ঋ';
phonetic1['E'] = 'এ';
phonetic1['OI'] = 'ঐ';
phonetic1['O'] = 'ও';
phonetic1['OU'] = 'ঔ';

phonetic1['0'] = '০';
phonetic1['1'] = '১';
phonetic1['2'] = '২';
phonetic1['3'] = '৩';
phonetic1['4'] = '৪';
phonetic1['5'] = '৫';
phonetic1['6'] = '৬';
phonetic1['7'] = '৭';
phonetic1['8'] = '৮';
phonetic1['9'] = '৯';


