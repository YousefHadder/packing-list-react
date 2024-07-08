import { useState } from 'react';
import { Item } from './Item';

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	onClearList,
}) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;
	if (sortBy === 'input') {
		sortedItems = items;
	} else if (sortBy === 'description') {
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));
	} else {
		sortedItems = items.slice().sort((a, b) => {
			const packedA = Number(b.packed);
			const packedB = Number(a.packed);
			if (packedA === packedB)
				return a.description.localeCompare(b.description);
			return packedA - packedB;
		});
	}
	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div>
				<select
					name="sort"
					id="sort"
					value={sortBy}
					onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort By Input Order</option>
					<option value="description">Sort By Description</option>
					<option value="packed">Sort By Packed Status</option>
				</select>
				<button name="clear" id="clear" onClick={() => onClearList()}>
					Clear List
				</button>
			</div>
		</div>
	);
}
