import React from 'react';

export default function AppControlButton({ label, onSelect }) {
	return <button type="button" onClick={() => onSelect() }>{label}</button>;
}