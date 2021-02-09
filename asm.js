function asm(s) {
	a = s.toUpperCase().split("\n")
	bytecode = []
	for(i=0;i<a.length;i++) {
		b = a[i].match(/(([A-Fa-f0-9]+ )*)(.*)(\;.*)/)[3];
		b = b.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g," ")
		switch (b.split(' ')[0].toUpperCase()){
			case 'LODSW':
				bytecode.push(0xAD)
				break;
			case 'STD':
				bytecode.push(0xFD)
				break;
			default:
				console.log("other")
				break;
		}
	}
	console.log(bytecode)
	return bytecode
}