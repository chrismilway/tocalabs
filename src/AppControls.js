import React from 'react';
import AppControlButton from './AppControlButton';

export default function AppControls({ onAdd }) {
	return (
		<div className="app-controls">
			<AppControlButton
				label="activity"
				onSelect={() => onAdd('activity')}
			/>
			<AppControlButton
				label="decision"
				onSelect={() => onAdd('decision')}
			/>
		</div>
	)
}