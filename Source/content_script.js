var exprs = [
  [/\bspecial counsel\b/g, "star guardian"],
  [/\bSpecial Counsel\b/g, "Star Guardian"],
  [/\bSpecial-Counsel\b/g, "Star-Guardian"],
]

function replaceTextInNode(node) {
  var value = node.nodeValue
  var expr
  for (expr of exprs) {
    value = value.replace(expr[0], expr[1])
  }
  node.nodeValue = value
}

// Based on http://is.gd/mwZp7E
function walk(node) {
  var child, next

  if (node.tagName == 'input' || node.tagName == 'textarea') {
  		return;
   }

  switch (node.nodeType) {
    case 1:   // element
    case 9:   // document
    case 11:  // fragment
      child = node.firstChild
      while (child) {
        next = child.nextSibling
        walk(child)
        child = next
      }
      break

    case 3:   // text
      replaceTextInNode(node)
      break
  }
}

document.addEventListener("DOMContentLoaded", function(e) {
  walk(document.body)
})

document.addEventListener("DOMNodeInserted", function(e) {
  walk(e.target)
})
