var Calculator = {
  exp: "",

  append: function(element) {
    this.exp = this.exp.concat(element);
  },

  removeLast: function() {
    this.exp = this.exp.slice(0, -1);
  },

  allClear: function() {
    this.exp = "";
  },

  evaluate: function(){

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
        this.evaluate();
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
