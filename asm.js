function Literal(value) {
	q=value[value.length-1]
	if(q=="B")
		x="0b"+value.slice(0,value.length-1)
	else if(q=="H")
		x="0x"+value.slice(0,value.length-1)
	else if(q=="'")
		x=value.slice(1,3-1).split("").reduce((y,x)=>y*256+x.charCodeAt(0),0)
	else
		x=value
	return eval(x)
}

function analyze(args) {
	args = args.replace(", ",",")
	return args.split(",").map((i) => {
		if(i[1]=="X")
			return ["16bit-reg", i]
		else if(i[1]=="H" || i[1]=="L")
			return ["8bit-reg", i]
		else if(i[0]=="[")
			return ["address", Literal(i.replace("[","").replace("]",""))]
		else
			return Literal(i)
	})
}

function asm(s) {
	a = s.toUpperCase().split("\n")
	bytecode = []
	for(i=0;i<a.length;i++) {
		try {
			b = a[i].match(/(([A-Fa-f0-9]+ )*)(.*)(\;.*)/)[3];
			b = b.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/g," ")
		} catch {
			continue
		}
		q = b.split(' ')[0].toUpperCase())
		if(q == 'LODSW') {
			bytecode.push(0xAD)
		} else if (q == 'STD') {
			bytecode.push(0xFD)
		} else {
			console.log("other")
		}
	}
	console.log(bytecode)
	return bytecode
}