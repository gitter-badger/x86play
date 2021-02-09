function analyze(args) {
	args = args.replace(", ",",")
	return args.split(",").map((i) => {
		if(i[1]=="X")
			return i
		else
			return eval(i)
	})
}

function regEncode(w, reg) {
	lookup = {"AX": "000","CX": "001",
	          "DX": "010","BX": "011",
	          "SP": "100","BP": "101",
	          "SI": "110","DI": "111"}
	if(w == "1") return lookup[reg]
	else return null
}

function asm(s) {
	a = s.toUpperCase().split("\n")
	bitcode = ""
	for(i=0;i<a.length;i++) {
		b = a[i].match(/(([A-Fa-f0-9]+[ \t])*)?(.*)(\;.*)?/)[3];
		b = b.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g," ")
		q = b.split(' ')[0].toUpperCase()
		args = analyze(b.toUpperCase().split(" ").slice(1).join(" "))
		if(q == 'MOV') {
			bitcode += "1011" // So far we only need to handle load imm.
			w = "1"           // With AX, BX, CX, DX, etc.
			bitcode += w
			// Now, what's the register?
			bitcode += regEncode(w, args[0])
			literal = args[1].toString(2)
			// Pad literal with 0's
			bitcode += "0".repeat(16-literal.length) + literal
		} else {
			console.log("other")
		}
		// bitcode += "\n"
	}
	bitcode = bitcode.replace(/(\d)(?=(?:\d{8})+$)/g,"$1 ").split(" ")
	bytecode = bitcode.map((i)=>parseInt(i,2))
	return bytecode
}

function Listing(code) {
	// Produces an "instruction listing" with bytecode on the side
	a=code.toUpperCase().split("\n")
	for(i=0;i<a.length;i++)
		console.log(asm(a[i]).map((i) => {
			x=i.toString(16).length;
			return "0".repeat(2-x)+i.toString(16).toUpperCase()
		}).join(" ")+ " " + a[i-1])
	return a
}

function disasm(s) {
	// TODO
}