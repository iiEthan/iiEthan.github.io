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

    async post(data) {
        const response = await fetch(`/api/${data.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
        const json = await response.json()
        console.log("POST " + data.id, json)
        return json.status[0]
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

    async update(data) {
        const response = await fetch(`/api/${data.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
          const json = await response.json()
          console.log("POST " + data.id, json)
          return json.status[0]
    }
    
}