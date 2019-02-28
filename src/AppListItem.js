import React from 'react';

export default function({ node, onSelect }) {
	const { label, id } = node;
	return (
		<button type="button" className="app-list-item" onClick={() => onSelect(id)}>{label}</button>
	);
}