function Tape(tape) { this.tape=tape, this.head=0; }
Tape.prototype.L = function() { return --this.head; }
Tape.prototype.R = function() { return ++this.head; }
Tape.prototype.G = function() { return this.tape[this.head]; }
Tape.prototype.P = function(val) { return this.tape[this.head] = val; }
Tape.prototype.J = function(cell) { return this.head = cell; }

var run = function(program, size, input) { 
    var memory = new Array(size); while(size--) { memory[size]=0; }
    var memory_tape = new Tape(memory);
    var program_tape = new Tape(program);
    var input_tape = new Tape(input); 
    var T = function() {
        switch (program_tape.G()) {
            case '+': memory_tape.P(memory_tape.G()+1); break;
            case '-': memory_tape.P(memory_tape.G()-1); break;
            case '<': memory_tape.L(); break;
            case '>': memory_tape.R(); break;
            case '.': console.log(String.fromCharCode(memory_tape.G())); break;
            case ',': memory_tape.P(input_tape.G().charCodeAt()); input_tape.R(); break;
            case ']': console.log('Unexpected bracket "]"'); break;
            case '[': var start = program_tape.head;
                      while (memory_tape.G()!=0) { 
                          program_tape.R();
                          while ( program_tape.G()!=']' ) { T(); }
                          program_tape.J(start);
                      }
                      var skip = 1;
                      while (skip>0) { 
                        program_tape.R(); 
                        if (program_tape.G()=='[') { skip++; }
                        if (program_tape.G()==']') { skip--; }
                      }
        }
        program_tape.R();
    }
    while (program_tape.G()) { T(); } 
}
