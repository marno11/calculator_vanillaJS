var Calculator = {
  exp: "",
  ans: "",

  append: function(element, callback) {
    this.exp = this.exp.concat(element);
    callback();
  },

  removeLast: function(callback) {
    this.exp = this.exp.slice(0, -1);
    callback();
  },

  allClear: function(callback) {
    this.exp = "";
    callback();
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

  operate: function(e,callback) {
    ops = /[X|/|\*|\+|\-]/
    order = [/[X|/|\*]/,/[\+|\-]/];

    order.forEach(function(level){
      indexOfOp = e.search(level);
      while (indexOfOp != -1) {
        endOfOp = indexOfOp + 1; //TODO: Handle longer operators

        operator = e.slice(indexOfOp,endOfOp)

        expBgn = e.slice(0,indexOfOp).split("").reverse().join("").search(ops)
        if (expBgn == -1) {expBgn = e.slice(0,indexOfOp).length}
        expBgn = indexOfOp - expBgn
        operand1 = e.slice(expBgn, indexOfOp)

        expEnd = e.slice(endOfOp).search(ops)
        if (expEnd == -1) {expEnd = e.slice(endOfOp).length}
        expEnd = endOfOp + expEnd
        operand2 = e.slice(endOfOp,expEnd);

        //If operand2 is "", check if it's a "sign"
        if (operand2 == "") {
          if (e.slice(endOfOp, endOfOp+1).search(order[1]) != -1) {
            expEnd = e.slice(endOfOp+1).search(ops)
            if (expEnd == -1) {expEnd = e.slice(endOfOp).length}
            expEnd = endOfOp + expEnd
            operand2 = e.slice(endOfOp,expEnd);
          };

          //If operand2 is still blank, that's because:
          //1. There isn't a valid sign following the operator
          //2. There was, but after that there was no number
          if (operand2 == "") {
            e = "Err"
            break;
          }
        };

        if (operand1 == "") {
          //If the operator is multiply or divide, the equation is invalid
          if (operator.search(order[0]) != -1) {
            e = "Err"
          }
          if (operator == "+") {
            e = e.replace(e.slice(expBgn,expEnd),operand2)
          }
          break;
        }

        let ans = Calculator.evaluate(operator,operand1,operand2)

        e = e.replace(e.slice(expBgn,expEnd),ans)

        indexOfOp = e.search(level);
      }
    });
    return(e);
  },

  input: function(key,callback){
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
      case "*":
      case "/":
      case "+":
      case "-":
      case ".":
      case "E":
        this.append(key, callback);
      break;
      case "DEL":
        this.removeLast(callback);
      break;
      case "AC":
        this.allClear(callback);
      break;
      case "ANS":
        this.append("**previous result**",callback);
      break;
      case "=":
        this.ans = this.operate(this.exp,callback);
        callback();
      break;
    };
  }
};

function buttonClick(e) {
  Calculator.input(e.target.innerHTML,updateDisplay)
}

const nodeListButtons = document.querySelectorAll('.row__element');

nodeListButtons.forEach(button => {
  button.addEventListener('click', buttonClick)
});

function updateDisplay() {
  if (Calculator.exp != "") {
    document.querySelector('.row__element--expression').innerHTML = Calculator.exp;
  } else {
    document.querySelector('.row__element--expression').innerHTML = "Expression";
  }
  if (Calculator.ans != "") {
    document.querySelector('.row__element--answer').innerHTML = Calculator.ans;
  } else {
    document.querySelector('.row__element--answer').innerHTML = "Answer";
  }
}

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
