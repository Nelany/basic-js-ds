const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode ?? null;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this.rootNode) {
      this.rootNode = newNode;
    } else {
      this._insert(this.rootNode, newNode);
    }
  }

  has(data) {
    return this._search(this.rootNode, data);
  }

  find(data) {
    return this._find(this.rootNode, data);
  }

  remove(data) {
    this.rootNode = this._remove(this.rootNode, data);
  }

  min() {
    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }

    let node = this.rootNode;
    while (node.right) {
      node = node.right;
    }

    return node.data;
  }
  _insert(node, newNode) {
    if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this._insert(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this._insert(node.right, newNode);
      }
    }
  }

  _search(node, data) {
    if (!node) {
      return false;
    }

    if (data === node.data) {
      return true;
    } else if (data < node.data) {
      return this._search(node.left, data);
    } else {
      return this._search(node.right, data);
    }
  }

  _find(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this._find(node.left, data);
    } else {
      return this._find(node.right, data);
    }
  }

  _remove(node, data) {
    if (!node) {
      return null;
    }

    if (data === node.data) {
      if (!node.left && !node.right) {
        return null;
      }

      if (!node.left) {
        return node.right;
      }

      if (!node.right) {
        return node.left;
      }

      const minValue = this._findMin(node.right);
      node.data = minValue;
      node.right = this._remove(node.right, minValue);
    } else if (data < node.data) {
      node.left = this._remove(node.left, data);
    } else {
      node.right = this._remove(node.right, data);
    }

    return node;
  }
  _findMin(node) {
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};