!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

var GLOBAL_INFO = {};

function main(text)
{
	var arr = textToArr(text);

	document.getElementById("res").innerHTML = "";
	GLOBAL_INFO = {};

	for(var i=0; i<arr.length; i++) {
		document.getElementById("res").innerHTML += xenkwanki_segseg(i,arr[i]);
	}
	GLOBAL_INFO.box_length = arr.length;
	GLOBAL_INFO.orig_strs = arr;
	return;
}

function search(kanzi)
{
	var a = [];
	for(var i=0; i<zihom.length; i++) {
		if(zihom[i][1].indexOf(kanzi)+1) {
			a.push(zihom[i][0]);
		}
	}
	return a;
}

function xenkwanki_segseg(num,hanzis)
{
	var res = '<div class="outer" id="outer_'+num+'">';
				
	for(var i=0; i<hanzis.length; i++) {
		var k = hanzis[i];
		res += '<div class="box">';
			var index = num + '_' + i;
			res += '<div class="b"><ruby><rb>' + k + '</rb><rt id="box_' + index + '"></rt></ruby>'  +'</div>';
			res += '<div>';
			var info = search(k);
			if(info.length >= 1) {
				for(var j=0; j<info.length; j++){
					res += '<label><input type="radio" name="radio_' + index + '" value="' + info[j] + 
					'" onclick="ev(\'box_' + index + '\', \'' + info[j] + '\')">' + info[j] + '</label><br>';
				}
			} else {
				res += '(´・ω・`)<br>'
			}
			res += '</div>';
		res += '</div>'
	}
	GLOBAL_INFO['box_'+num+'_length'] = hanzis.length;

	res += '</div>';
	return res;
}

// "正書法 熟語変換器" -> ["正書法","熟語変換器"]
function textToArr(text)
{
	var kanzi = /([\u4E00-\u9FFF\uF900-\uFAFF])+/g;
	var arr = [];
	var tmp;
	while ((tmp = kanzi.exec(text)) !== null) {
	  arr.push(tmp[0]);
	}
	return arr;
}


function ev(id, zihom)
{
	var dom = document.getElementById(id);
	dom.innerHTML = zihom_to_gendaikana(zihom);
	GLOBAL_INFO[id] = zihom;

	kagsin();
}

function kagsin()
{
	var str = generate_str();
	if(str){
		createShareButton(str);
	} else {
		removeShareButton();
	}
}

function createShareButton(text){
	document.getElementById('container').innerHTML = "";
	twttr.widgets.createShareButton(
  'https://sozysozbot.github.io/Zyukugo-xenkwan-ki/index.html',
  document.getElementById('container'),
  {
    text: text
  }
);}

function removeShareButton(){document.getElementById('container').innerHTML=""}

function generate_str(){
	var res = "";
	for(var i=0; i<GLOBAL_INFO.box_length;i++){
		res += GLOBAL_INFO.orig_strs[i] + " "
		for(var j=0;j<GLOBAL_INFO["box_"+i+"_length"];j++){
			if(! GLOBAL_INFO["box_"+i+"_"+j]){
				return null;
			} else {
				res += GLOBAL_INFO["box_"+i+"_"+j];
			}
		}
		res += "\n"
	}
	var ret = res 
		+ "#segsyoxafu " 
		+ (document.getElementById("temsaku_xuheu").checked ? "" : "#temsaku") 
		+ "\n";

	return ret;
}




