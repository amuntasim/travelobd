
(function() {
    tinymce.create('tinymce.plugins.BanglaInput', {
		

        init : function(ed, url) {
			
           

            ed.onKeyUp.add(function(ed, e) {
                //alert(phonetic1['1']);
                alert(ed.dom.content);
                e = e.target;
               
            });

            
        },

		

        getInfo: function() {
            return {
                longname : 'Bangla Input plugin',
                author : 'Muntasim Ahmed',
                authorurl : '',
                //infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/banglainput',
                version : tinymce.majorVersion + "." + tinymce.minorVersion
            };
        }
    });

    tinymce.PluginManager.add('banglainput', tinymce.plugins.BanglaInput);
})();
