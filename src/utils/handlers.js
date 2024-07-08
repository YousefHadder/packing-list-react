const handleAddItem = (items, setItems, item) => {
	setItems([...items, item]);
};

const handleDeleteItem = (items, setItems, itemId) => {
	setItems(items.filter((item) => item.id !== itemId));
};

const handleToggleItem = (items, setItems, itemId) => {
	setItems(
		items.map((item) =>
			item.id === itemId ? { ...item, packed: !item.packed } : item
		)
	);
};

const handleClearList = (items, setItems) => {
	if (items.length > 0) {
		const confirmed = window.confirm(
			'Are you sure you want to clear the list?'
		);
		if (confirmed) {
			setItems([]);
		}
	}
};

module.exports = {
	handleAddItem,
	handleDeleteItem,
	handleToggleItem,
	handleClearList,
};
