 
 export async function get(id) {
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

export async function post(data) {
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

export async function remove(data) {
        const response = await fetch(`/api/${data.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            })
        const json = await response.json()
        console.log("DELETE " + data.id, json)
        return json.status[0]
}

export async function update(data) {
        const response = await fetch(`/api/${data.id - 1}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
          })
          const json = await response.json()
          console.log("UPDATE " + (data.id - 1), json)
          return json.status[0]
}