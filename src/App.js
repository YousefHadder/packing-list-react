import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import PackingList from './components/PackingList';
import Stats from './components/Stats';
import Logo from './components/Logo';
import {
	handleAddItem,
	handleDeleteItem,
	handleToggleItem,
	handleClearList,
} from './utils/handlers';

export default function App() {
	const [items, setItems] = useState([]);

	return (
		<div className="app">
			<Logo />
			<Form onAddItems={(item) => handleAddItem(items, setItems, item)} />
			<PackingList
				items={items}
				onDeleteItem={(itemId) =>
					handleDeleteItem(items, setItems, itemId)
				}
				onToggleItem={(itemId) =>
					handleToggleItem(items, setItems, itemId)
				}
				onClearList={() => handleClearList(items, setItems)}
			/>
			<Stats items={items} />
		</div>
	);
}
