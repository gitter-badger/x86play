function asm(s) {
	a = s.split("\n")
	for(i=0;i<a.length;i++) {
		b = a[i].match(/(([A-Fa-f0-9]+ )*)(.*)(\;.*)/)[3];
		b=b.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g," ")
		console.log(b)
	}
	return s
}