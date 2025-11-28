function lengthErr({ min, max }) {
	if (min && max) {
		return `must be between ${min} and ${max} characters.`
	}

	if (min && !max) {
		return `must be at least ${min} characters.`
	}

	if (!min && max) {
		return `must be no more than ${max} characters.`
	}

	return null
}

function formQueryErr(err) {
	const regex = /Key \((\w+)\)=\(([^)]+)\)\s(.+)$/

	const match = err.detail.match(regex)

	if (match) {
		const [, path, value, msg] = match

		return {
			type: "field",
			value,
			msg: `${path.charAt(0).toUpperCase() + path.slice(1)} ${msg}`,
			path,
			location: "body",
		}
	}

	return err
}

export { lengthErr, formQueryErr }
