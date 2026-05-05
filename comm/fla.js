function flash(c,d,e) {
 var flash_tag = "";
 flash_tag = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
 flash_tag +='codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0" ';
 flash_tag +='WIDTH="'+d+'" HEIGHT="'+e+'" >';
 flash_tag +='<param name="movie" value="'+c+'">';
//  flash_tag +='<param name="wmode" value="opaque">';
 flash_tag +='<PARAM NAME=wmode VALUE=transparent>';
 flash_tag +='<param name="quality" value="high">';
 flash_tag +='<embed src="'+c+'" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" ';
 flash_tag +='type="application/x-shockwave-flash" wmode="transparent"  WIDTH="'+d+'" HEIGHT="'+e+'"></embed></object>'

 document.write(flash_tag);

}