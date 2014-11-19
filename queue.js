var Queue = (function(){
  var $head, $tail, $length;

  function Queue() {
    $head = null;
    $tail = null;
    $length = 0;
  }

  Queue.prototype.add = function(data) {
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

  Queue.prototype.shift = function() {
    if( $length == 0 ) return null;
    var node, data;

    node = $head;
    $head = node.next;

    data = node.data;

    node = null;
    $length--;

    return data;
  }

  Queue.prototype.getLength = function() {
    return $length;
  }

  Queue.prototype.hasData = function() {
    return $length != 0;
  }

  Queue.prototype.getFirstAdded = function() {
    return $head.data;
  }

  return Queue;
})();