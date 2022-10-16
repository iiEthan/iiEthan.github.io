export class dbFunctions {
 
    async get(id) {
        // If no id is given, we will retrieve the entire database
        let api = "/api"
       if (id !== undefined) {
        api = `/api/${id}`
       } 
        const response = await fetch(api)
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    }

    async post(data, id) {
        const response = await fetch(`/api/${id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
        const json = await response.json()
        console.log("POST " + id, json)
    }

    async remove(id) {
        const response = await fetch(`/api/${id}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const res = await response.json()
        console.log("DELETE " + id, res)
    }

    async update(data, id) {
        const response = await fetch(`/api/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
        const res = await response.json()
        console.log("UPDATE " + id, res)
    }

}