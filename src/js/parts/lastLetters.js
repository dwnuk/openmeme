let paragraphs = document.querySelectorAll('p');
paragraphs.forEach(function(p) {
    var textReplace = p.innerHTML;
   textReplace = textReplace.replace(/(\s)([\S])[\s]+/g, "$1$2&nbsp;");
   textReplace = textReplace.replace(/(\s)([^<][\S]{1})[\s]+/g,"$1$2&nbsp;");
   p.innerHTML = textReplace;
});

