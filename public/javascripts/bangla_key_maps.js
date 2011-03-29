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
    'z':'ৢ', // hsnt li
    'x':'ৌও', //oo
    'c':'এ', //e
    'v':'ৱ', //ro with diagonal
    'h':'ৰ', //bo with diagonal
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
    'h':'ৰ', //bo with diagonal
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
    "h":"ৰ",
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