function Tape(tape) { this.tape=tape, this.head=0; }
Tape.prototype.L = function() { return --this.head; }
Tape.prototype.R = function() { return ++this.head; }
Tape.prototype.G = function() { return this.tape[this.head]; }
Tape.prototype.P = function(val) { return this.tape[this.head] = val; }

// EBNF
// F = TF | '[',F,']'
// T = '+','-','<','>','.',','

var run = function(program) { 
    var program_tape = new Tape(program); 
    var memory_tape = new Tape(new Array()); 
    while (program_tape.R()) { F(); } 
}

var F = function() {
    if (program_tape.G()!="]") { T(); }
    else if (memory_tape!=0) { 
        var skip = 0; 
        while (program_tape.G()!='[' || skip!=0) { program_tape.L(); } } 
    else { program_tape.R(); }
    F();
}

var T = function() {
    switch (program_tape.G()) {
        case '+': memory_tape.P(++memory_tape.G()); break;
        case '-': memory_tape.P(--memory_tape.G()); break;
        case '.': console.log(memory_tape.G()); break;
        case ',': break;
        case '<': memory_tape.L(); break;
        case '>': memory_tape.R(); break;
    }
    program_tape.R();
}
        
