import React from 'react';

export default function AppConnection({ connection: { start, end } }) {
	console.log({ start, end });
	const nodeOffset = [50, 20]; // center of the node. Should make this betterer
	const offsetCoords = coords => coords.map((c, i) => c + nodeOffset[i]);
	const begin = offsetCoords(start);
	const finish = offsetCoords(end);
	const midpoint = [begin[0], finish[0]].sort((a, b) => b - a).reduce((a, i) => a + i, 0) / 2;
	const c = `${midpoint},${begin[1]} ${midpoint},${finish[1]} ${finish.join(',')}`;
	return (
		<path d={`M ${begin.join(',')} C ${c}}`} stroke="black" strokeWidth="2" fill="none" />
	)
}