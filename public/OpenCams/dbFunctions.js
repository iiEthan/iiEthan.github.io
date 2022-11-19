 
 export async function get(id) {
	// If no id is given, we will retrieve the entire database
	let api = "/api"
	if (id !== undefined) {
		api = `/api/${id}`
	} 
	
	const response = await fetch(api, {
		method: "GET",
		headers: { "Content-Type": "application/json" },
		cache: "no-store",
	})
	const json = await response.json()
	return json
}

export async function post(data) {
	const response = await fetch(`/api/${data.id}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		cache: "no-store",
		body: JSON.stringify(data)
	})
	const json = await response.json()
	console.log("POST " + data.id, json)
	return json.status[0]
}

export async function remove(data) {
	const response = await fetch(`/api/${data.id}`, {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		cache: "no-store",
		body: JSON.stringify(data)
	})
	const json = await response.json()
	console.log("DELETE " + data.id, json)
	return json.status[0]
}

export async function update(data) {
	const response = await fetch(`/api/${data.id - 1}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		cache: "no-store",
		body: JSON.stringify(data)
	})
	const json = await response.json()
	console.log("UPDATE " + (data.id - 1), json)
	return json.status[0]
}