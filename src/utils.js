export function getId(nodes) {
	return (nodes.length)
		? Math.max(...nodes.map(n => n.id)) + 1
		: 1;
}