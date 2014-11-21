var Stack = (function(){
  var $head, $tail, $length;

  function Stack() {
    $head = null;
    $tail = null;
    $length = 0;
  }

  Stack.prototype.add = function(data) {
    var node = new Node(data);

    if( $length == 0 ) {
      $head = node;
      $tail = $head;
    } else {
      node.prev = $tail;
      $tail.next = node;

      $tail = $tail.next;
    }

    return $length++;
  };

  Stack.prototype.pop = function() {
    if( $length == 0 ) return null;
    var node, data;

    node = $tail;
    $tail = node.prev;

    data = node.data;

    node = null;
    $length--;

    return data;
  }

  Stack.prototype.getLength = function() {
    return $length;
  }

  Stack.prototype.hasData = function() {
    return $length != 0;
  }

  Stack.prototype.getLastAdded = function() {
    return $tail.data;
  }

  Stack.prototype.clear = function() {
    while( this.hasData() ) this.pop();
  }

  return Stack;
})();