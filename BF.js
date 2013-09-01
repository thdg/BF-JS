function Tape(tape) { this.tape=tape, this.head=0; }
Tape.prototype.L = function() { return --this.head; }
Tape.prototype.R = function() { return ++this.head; }
Tape.prototype.G = function() { return this.tape[this.head]; }
Tape.prototype.P = function(val) { return this.tape[this.head] = val; }

// EBNF
// F = TF | '[',F,']'
// T = '+','-','<','>','.',','

var db = function(val) { console.log(val); }

var run = function(program, size) { 
    var memory = new Array(size); while(size--) { memory[size]=0; }
    var memory_tape = new Tape(memory);
    var program_tape = new Tape(program); 

    var T = function() {
        switch (program_tape.G()) {
            case '+': memory_tape.P(memory_tape.G()+1); break;
            case '-': memory_tape.P(memory_tape.G()-1); break;
            case '<': memory_tape.L(); break;
            case '>': memory_tape.R(); break;
            case '.': console.log(memory_tape.G()); break;
            case ',': memory_tape.P(100); break;
        }
    }

    var F = function() {
        if (program_tape.G()=="[") { program_tape.R(); F(); } else
        if (program_tape.G()!="]") { T(); }
        program_tape.R();
    }

    while (program_tape.G()) { F(); } 
}
