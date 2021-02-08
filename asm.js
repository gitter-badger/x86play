function asm(s) {
	a = s.split("\n")
	bytecode = []
	for(i=0;i<a.length;i++) {
		b = a[i].match(/(([A-Fa-f0-9]+ )*)(.*)(\;.*)/)[3];
		b = b.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g," ")
		switch (b.split(' ')[0].toUpperCase()){
			case 'LODSW':
				bytecode.push(0xAD)
			default:
				console.log("other")
		}
	}
	console.log(bytecode)
	return bytecode
}