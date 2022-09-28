// classes for BTS and Node

class Node {
	constructor(data) {
		this.value = data;
		this.right = null;
		this.left = null;
		// this.count = 0;
	}
}

class BinarySearchTree {
	constructor(arr) {
		this.array = [ ...new Set(mergeSort(arr)) ];
		this.root = this.buildTree(this.array, 0, this.array.length - 1);
		this.inOrderArray = [];
		this.preOrderArray = [];
		this.postOrderArray = [];
	}

	buildTree = (arr, start, end) => {
		if (start > end) return null;

		let midPoint = parseInt((start + end) / 2);

		let root = new Node(arr[midPoint]);

		root.left = this.buildTree(arr, start, midPoint - 1);
		root.right = this.buildTree(arr, midPoint + 1, end);

		return root;
	};

	insert = (value) => {
		const newNode = new Node(value);

		if (this.root === null) {
			this.root = newNode;
			return this;
		}

		let current = this.root;

		while (current) {
			if (value === current.value) return undefined;
			if (value < current.value) {
				if (current.left === null) {
					current.left = newNode;
					return this;
				}
				current = current.left;
			} else {
				if (current.right === null) {
					current.right = newNode;
					return this;
				}
				current = current.right;
			}
		}
	};

	delete = (value) => {
		if (this.root == null) return this.root;

		let removedVal = this.preOrder(this.root);
		removedVal = removedVal.filter((item) => item !== value);

		const newTree = new BinarySearchTree(removedVal);

		return (this.root = newTree.root);
	};

	find = (value) => {
		if (!this.root) return false;

		let current = this.root;
		let found = false;

		while (current && !found) {
			if (value < current.value) {
				current = current.left;
			} else if (value > current.value) {
				current = current.right;
			} else {
				found = current;
			}
		}
		if (!found) return undefined;
		return found;
	};

	levelOrder = (root) => {
		if (!root) return [];

		let result = [];
		let queue = [ root ];

		while (queue.length != 0) {
			let subarr = [];
			const n = queue.length;
			for (let i = 0; i < n; i += 1) {
				let node = queue.pop();

				subarr.push(node.value);
				if (node.left) queue.unshift(node.left);
				if (node.right) queue.unshift(node.right);
			}
			result.push(subarr);
		}
		return result;
	};
	inOrder = (node) => {
		if (node !== null) {
			this.inOrder(node.left);
			this.inOrderArray.push(node.value);
			this.inOrder(node.right);
		}
		return this.inOrderArray;
	};

	preOrder = (node) => {
		if (node !== null) {
			this.preOrderArray.push(node.value);
			this.preOrder(node.left);
			this.preOrder(node.right);
		}
		return this.preOrderArray;
	};

	postOrder = (node) => {
		if (node !== null) {
			this.postOrder(node.left);
			this.postOrder(node.right);
			this.postOrderArray.push(node.value);
		}
		return this.postOrderArray;
	};

	height = (node) => {
		if (node === null) return -1;
		else {
			let heightL = this.height(node.left);
			let heightR = this.height(node.right);

			if (heightL > heightR) return heightL + 1;
			else return heightR + 1;
		}
	};

	depth = (node, root) => {
		let depth = -1;
		console.log(root);
		if (node === null) return depth;
		console.log(root);
		if (
			root === node ||
			depth === this.depth(node, root.left) >= 0 ||
			depth === this.depth(node, root.right) >= 0
		) {
			return depth + 1;
		}
		return depth;
	};

	isBalanced = () => {
		if (this.root === null) return false;

		const rootLeft = this.root.left;
		const rootRight = this.root.right;

		if (Math.abs(this.height(rootLeft) - this.height(rootRight)) > 1) {
			return false;
		} else return true;
	};

	rebalance = () => {
		if (this.isBalanced(this.root)) return this.root;

		let balancedTree = new BinarySearchTree(this.inOrder(this.root));

		return (this.root = balancedTree.root);
	};
}

// Helper functions

const merge = (left, right) => {
	let arr = [];
	// Break out of loop if any one of the array gets empty
	while (left.length && right.length) {
		// Pick the smaller among the smallest element of left and right sub arrays
		if (left[0] < right[0]) {
			arr.push(left.shift());
		} else {
			arr.push(right.shift());
		}
	}

	// Concatenating the leftover elements
	// (in case we didn't go through the entire left or right array)
	return [ ...arr, ...left, ...right ];
};

const mergeSort = (array) => {
	const half = array.length / 2;

	// Base case or terminating case
	if (array.length < 2) {
		return array;
	}

	const left = array.splice(0, half);

	return merge(mergeSort(left), mergeSort(array));
};

const prettyPrint = (node, prefix = '', isLeft = true) => {
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
	}
	console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
	}
};

function minValue(root) {
	let min = root.value;
	while (root != null) {
		min = root.value;
		root = root.leftPart;
	}
	return min;
}

// Testing
console.log('Binary Search Tree created');
const tree = new BinarySearchTree([ 2, 5, 6, 235, 5, 236, 23, 62, 52, 345, 21, 35, 45, 346 ]);

console.log('Balanced:', tree.isBalanced());
console.log('Inserting new elements...');
tree.insert(120);
tree.insert(123);
tree.insert(150);
tree.insert(129);
tree.insert(145);
tree.insert(133);
tree.insert(155);
console.log('Balanced:', tree.isBalanced());
console.log('Tree is being rebalanced...');
tree.rebalance();
console.log('Balanced:', tree.isBalanced());
console.log('------------Printing tree-----------');
prettyPrint(tree.root);
console.log('------------END-----------');
console.log('Level-order:', tree.levelOrder(tree.root));
console.log('Pre-order:', tree.inOrder(tree.root));
console.log('In-order:', tree.preOrder(tree.root));
console.log('Post-order:', tree.postOrder(tree.root));
