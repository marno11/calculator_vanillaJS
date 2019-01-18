var Expression = {
  exp: "",

  append: function(element) {
    this.exp = this.exp.concat(element);
  },

  removeLast: function() {

  },

  allClear: function() {

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
  Expression.input(e.target.innerHTML)
}

const nodeListButtons = document.querySelectorAll('.row__element');

nodeListButtons.forEach(button => {
  button.addEventListener('click', buttonClick)
});
