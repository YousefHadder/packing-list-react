import { useState } from 'react';
import './App.css';
export default function App() {
	const [items, setItems] = useState([]);

	const handleAddItem = (item) => {
		setItems(() => [...items, item]);
	};
	const handleDeleteItem = (itemId) => {
		setItems(() => items.filter((items) => items.id !== itemId));
	};
	const handleToggleItem = (itemId) => {
		setItems(() =>
			items.map((item) =>
				item.id === itemId ? { ...item, packed: !item.packed } : item
			)
		);
	};

	return (
		<div className="app">
			<Logo />
			<Form items={items} onAddItems={handleAddItem} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
			/>
			<Stats items={items} />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far Away 🧳</h1>;
}
function Form({ onAddItems }) {
	const [description, setDescription] = useState('');
	const [quantity, setQuantity] = useState(1);

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!description) return;

		const newItem = {
			id: Date.now(),
			description,
			quantity,
			packed: false,
		};

		onAddItems(newItem);

		setDescription('');
		setQuantity(1);
	};

	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>what do you need for your trip?</h3>
			<select
				name="list"
				value={quantity}
				onChange={(event) => setQuantity(Number(event.target.value))}>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				name="item"
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}
function PackingList({ items, onDeleteItem, onToggleItem }) {
	return (
		<div className="list">
			<ul>
				{items.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItem={onDeleteItem}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
		</div>
	);
}

function Item({ item, onDeleteItem, onToggleItem }) {
	return (
		<li>
			<input
				type="checkbox"
				value={item.packed}
				onChange={() => onToggleItem(item.id)}
			/>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {' ' + item.description}
			</span>
			<button onClick={() => onDeleteItem(item.id)}>'❌'</button>
		</li>
	);
}

function Stats({ items }) {
	const totalItems = items.reduce((sum, curr) => sum + curr.quantity, 0);
	const packedItems = items.reduce(
		(sum, curr) => sum + (curr.packed ? curr.quantity : 0),
		0
	);

	const packedPercentage =
		totalItems === 0 ? 0 : ((packedItems / totalItems) * 100).toFixed(2);

	return (
		<footer className="stats">
			<em>
				{packedItems === totalItems
					? 'All items packed!'
					: `You have ${totalItems} items on your list, and you already packed 
				${packedItems} (${packedPercentage}%)`}
			</em>
		</footer>
	);
}
