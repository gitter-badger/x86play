window.onload = function() {
	var code = document.getElementById("code");
	var output = document.getElementById("output");
	var input = document.getElementById("input");
	var CCode = CodeMirror.fromTextArea(code, {
		mode: "text/x-ez80",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		scrollbarStyle: null
	});
	var CInput = CodeMirror.fromTextArea(input, {
		mode: "text/x-ez80",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		scrollbarStyle: null
	});
	var COutput = CodeMirror.fromTextArea(output, {
		mode: "text/x-ez80",
		theme: "material",
		lineNumbers: true,
		lineWrapping: true,
		indentWithTabs: true,
		readOnly: true,
		scrollbarStyle: null
	});
}