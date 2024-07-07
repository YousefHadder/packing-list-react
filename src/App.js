import { useState } from 'react';
import './App.css';

const initialItems = [
	{ id: 1, description: 'Passports', quantity: 2, packed: false },
	{ id: 2, description: 'Socks', quantity: 12, packed: false },
];
export default function App() {
	return (
		<div className="app">
			<Logo />
			<Form />
			<PackingList />
			<Stats />
		</div>
	);
}

function Logo() {
	return <h1>🏝️ Far Away 🧳</h1>;
}
function Form() {
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

		console.log('Adding new item: ', newItem);

		setDescription('');
		setQuantity(1);
	};
	return (
		<form className="add-form" onSubmit={handleSubmit}>
			<h3>what do you need for your trip?</h3>
			<select
				value={quantity}
				onChange={(event) => setQuantity(Number(event.target.value))}>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
					<option value={num} key={num}>
						{num}
					</option>
				))}
			</select>
			<input
				type="text"
				placeholder="Item..."
				value={description}
				onChange={(event) => setDescription(event.target.value)}
			/>
			<button>Add</button>
		</form>
	);
}
function PackingList() {
	return (
		<div className="list">
			<ul>
				{initialItems.map((item) => (
					<Item item={item} key={item.id} />
				))}
			</ul>
		</div>
	);
}

function Item({ item }) {
	return (
		<li>
			<span style={item.packed ? { textDecoration: 'line-through' } : {}}>
				{item.quantity} {' ' + item.description}
			</span>
			<span>{item.packed ? '✅' : '❌'}</span>
		</li>
	);
}

function Stats() {
	return (
		<footer className="stats">
			<em>
				You have X items on your list, and you already packed Y (Z%)
			</em>
		</footer>
	);
}
