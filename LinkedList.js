const LinkedList = () => {
	const list = {};

	list.head = null;
	list.size = 0;

	const append = (element) => {
		let node = NodeCreate(element);

		let current;

		if (list.head === null) {
			list.head = node;
		} else {
			current = list.head;

			while (current.next) {
				current = current.next;
			}

			current.next = node;
		}
		list.size += 1;
	};

	const prepend = (element) => {
		let node = NodeCreate(element);

		let current;

		list.head = node;
		list.size += 1;
	};

	const size = () => {
		console.log(list.size);
		return list.size;
	};

	const head = () => {
		console.log(list.head.element);
		return list.head.element;
	};

	const tail = () => {
		let current = list.head;

		while (current != null) {
			if (current.next === null) {
				console.log(current.element);
				return current.element;
			}
			current = current.next;
		}
	};

	const at = (index) => {
		let count = 0;
		let current = list.head;

		while (current != null) {
			if (count === index) {
				return current;
			}
			current = current.next;
			count += 1;
		}
		return null;
	};

	const pop = () => {
		let current = list.head;

		while (current != null) {
			if (current.next === null) {
				const index = find(current.element) - 1;
				const element = at(index);
				delete element.next;
				list.size -= 1;
				return `Last element deleted`;
			}
			current = current.next;
		}
	};

	const removeAt = (index) => {
		if (index < 0 || index >= list.size) {
			return prompt('Element at index does not exist');
		} else {
			let curr,
				prev,
				counter = 0;
			curr = list.head;
			prev = curr;

			if (index === 0) {
				list.head = curr.next;
			} else {
				while (counter < index) {
					counter += 1;
					prev = curr;
					curr = curr.next;
				}
				prev.next = curr.next;
			}
			list.size -= 1;
			console.log(curr.element);
		}
	};

	const insertAt = (value, index) => {
		if (index < 0 || index >= list.size) {
			return prompt('Cannot insert at these positions');
		} else {
			let node = NodeCreate(value);
			let curr, prev;
			if (index === 0) {
				node.next = list.head;
				list.head = node;
				list.head.element = value;
			} else {
				curr = list.head;
				let counter = 0;

				while (counter < index) {
					counter += 1;
					prev = curr;
					curr = curr.next;
				}
				node.next = curr;
				prev.next = node;
			}
		}
	};

	const contains = (value) => {
		let current = list.head;

		while (current != null) {
			if (current.element === value) {
				console.log(current.element);
				return true;
			}
			current = current.next;
		}
		return false;
	};

	const find = (value) => {
		let count = 0;
		let current = list.head;

		while (current != null) {
			if (current.element === value) {
				// console.log(count);
				return count;
			}
			current = current.next;
			count += 1;
		}
		return null;
	};

	const toString = () => {
		let current = list.head;
		let print = '';
		while (current) {
			print += `${current.element} -> `;
			current = current.next;
			if (current === null) {
				print += `${current}`;
			}
		}
		console.log(print);
		return print;
	};

	return {
		list,
		append,
		prepend,
		size,
		head,
		tail,
		at,
		pop,
		contains,
		find,
		toString,
		removeAt,
		insertAt
	};
};

const NodeCreate = (element) => {
	return {
		element: element,
		next: null
	};
};

const newList = LinkedList();
//console.log(newList);
newList.append('Hello');
newList.append('World');
newList.append('Bye');
//console.log(newList.pop());
//console.log(newList);
newList.append('Bye');
newList.append('Works');
newList.append(5);
//console.log(newList.contains(5))
// newList.toString()
console.log(newList.removeAt(3));
console.log(newList.list);
console.log(newList.insertAt('Hello', 0));
console.log(newList.list);
