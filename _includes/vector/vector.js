function Vector() {
  this.elements = [].slice.call(arguments)

  var any_non_number = this.elements.some(function(d) {
    return typeof d != "number"
  }
  if (any_non_number) {
    throw("All arguments must have type number")
  }
}

var cons = Vector
  , proto = cons.prototype

proto.toString = function(all) {
   out = [
        "Vector("
      , this.elements.slice(0,10).toSring()
      , this.elements.length > 20 ? this.elements.slice(-10).toString() : ""
      , ")"
      ]
}
