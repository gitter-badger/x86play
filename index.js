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
	var code = document.getElementById("code");
	var output = document.getElementById("output");
	var input = document.getElementById("input");
	var cfmt = document.getElementById("code-format");
	var ifmt = document.getElementById("input-format");
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
	var COutput = CodeMirror.fromTextArea(output, {
		mode: "text",
		theme: "material",
		lineNumbers: false,
		lineWrapping: true,
		indentWithTabs: true,
		readOnly: true,
		scrollbarStyle: null
	});
	CCode.on("change", e => {
		CCode.save()
	})

	document.getElementById("permalink").addEventListener('click', (event) => {
		e = (x) => arrToB64(deflate(x))
		function setfmt(c, i) {o=0;if(c=="raw")o+=1;o<<=1;if(i=="raw")o+=1;return o}
		console.log(encodeURI(location.protocol+"//"
		                    +location.host+location.pathname
		                    +"?c="+e(code.value)
		                    +"?i="+e(input.value)
		                    +"?f="+setfmt(cfmt.value, ifmt.value)
		           ))
	})
}