export default function Stats({ items }) {
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
				{totalItems === 0
					? 'Please Start Adding Items!'
					: packedItems === totalItems
					? 'All items packed!'
					: `You have ${totalItems} items on your list, and you already packed 
				${packedItems} (${packedPercentage}%)`}
			</em>
		</footer>
	);
}
