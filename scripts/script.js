var Calculator = {
  exp: "",
  ans: "",

  append: function(element) {
    this.exp = this.exp.concat(element);
  },

  removeLast: function() {
    this.exp = this.exp.slice(0, -1);
  },

  allClear: function() {
    this.exp = "";
  },

  evaluate: function(op,op1,op2) {
    switch (op) {
      case "*":
        return Number(op1) * Number(op2)
        break;
      case "/":
        return Number(op1) / Number(op2)
        break;
      case "+":
        return Number(op1) + Number(op2)
        break;
      case "-":
        return Number(op1) - Number(op2)
        break;
      default:
    }
  },

  operate: function(e) {
    ops = /[X|/|\*|\+|\-]/
    order = [/[X|/|\*]/,/[\+|\-]/];

    order.forEach(function(level){
      indexOfOp = e.search(level);
      while (indexOfOp != -1) {
      //if (indexOfOp != -1) {
        endOfOp = indexOfOp + 1;

        operator = e.slice(indexOfOp,endOfOp)

        expBgn = e.slice(0,indexOfOp).split("").reverse().join("").search(ops)
        if (expBgn == -1) {expBgn = e.slice(0,indexOfOp).length}
        expBgn = indexOfOp - expBgn
        operand1 = e.slice(expBgn, indexOfOp)

        expEnd = e.slice(endOfOp).search(ops)
        if (expEnd == -1) {expEnd = e.slice(endOfOp).length}
        expEnd = endOfOp + expEnd
        operand2 = e.slice(endOfOp,expEnd);

        let ans = Calculator.evaluate(operator,operand1,operand2)

        e = e.replace(e.slice(expBgn,expEnd),ans)

        indexOfOp = e.search(level);
      }
    });
    this.ans = e;
  },

  input: function(key){
    switch (key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
      case "X":
      case "/":
      case "+":
      case "-":
      case ".":
      case "E":
        this.append(key);
      break;
      case "DEL":
        this.removeLast();
      break;
      case "AC":
        this.allClear();
      break;
      case "ANS":
        this.append("**previous result**");
      break;
      case "=":
        this.operate(this.exp);
      break;
    };
  }
};

function buttonClick(e) {
  Calculator.input(e.target.innerHTML)
}

const nodeListButtons = document.querySelectorAll('.row__element');

nodeListButtons.forEach(button => {
  button.addEventListener('click', buttonClick)
});

//This is for testing with tape, we need to check if we're in node or if we're
//in the browser, then export if we are in node we ignore it for code coverage
//as it is only here for testing
/*istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buttonClick: buttonClick,
    Calculator: Calculator,
  };
}
