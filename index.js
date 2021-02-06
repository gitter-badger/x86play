window.onload = function() {
	var code = document.getElementById("code");
	var CodMir = CodeMirror(code, {
		mode: "text/x-ez80",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true
	});
}