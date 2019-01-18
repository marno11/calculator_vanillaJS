var Expression = {
   exp: "",

   evaluate: function(){
     console.log("this is just a test");
   }
};

function buttonClick(e) {
  Expression.exp = Expression.exp.concat(e.target.innerHTML)
}

const nodeListButtons = document.querySelectorAll('.row__element');

nodeListButtons.forEach(button => {
  button.addEventListener('click', buttonClick)
});
