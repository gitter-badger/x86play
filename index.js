function deflate(arr) {
	return pako.deflate(arr, { "level": 9 });
}

function inflate(arr) {
	return pako.inflate(arr);
}

function arrToB64(arr) {
	var bytestr = "";
	arr.forEach(c => bytestr += String.fromCharCode(c));
	return btoa(bytestr).replace(/\+/g, "@").replace(/=+/, "");
}

function b64ToArr(str) {
	return new Uint8Array([...atob(decodeURIComponent(str).replace(/@/g, "+"))].map(c => c.charCodeAt()))
}

window.onload = function() {
	const urlParams = new URLSearchParams(window.location.search)
	var code = document.getElementById("code");
	var output = document.getElementById("output");
	var input = document.getElementById("input");
	var cfmt = document.getElementById("code-format");
	var ifmt = document.getElementById("input-format");
	function d(x) {
		return new TextDecoder("ascii").decode(inflate(b64ToArr(x)))
	}
	code.value=d(urlParams.get("c")||"")
	input.value=d(urlParams.get("i")||"")
	cifmt=urlParams.get("f")
	if(cifmt&2)cfmt.value="xxd"
	if(cifmt&1)ifmt.value="xxd"
	var CCode = CodeMirror.fromTextArea(code, {
		mode: "text/x-ez80",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		scrollbarStyle: null
	});
	var CInput = CodeMirror.fromTextArea(input, {
		mode: "text",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		scrollbarStyle: null
	});
	CCode.on("change", e => {
		CCode.save()
	})
	CInput.on("change", e => {
		CInput.save()
	})
	document.getElementById("permalink").addEventListener('click', (event) => {
		e = (x) => arrToB64(deflate(x))
		function setfmt(c, i) {o=0;if(c=="xxd")o+=1;o<<=1;if(i=="xxd")o+=1;return o}
		link = encodeURI(location.protocol+"//"
		                    +location.host+location.pathname
		                    +"?c="+e(code.value)
		                    +"&i="+e(input.value)
		                    +"&f="+setfmt(cfmt.value, ifmt.value)
		           )
		output.innerText=link
	})
}