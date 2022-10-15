export class Database {
 
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

    async read() {
        const response = await fetch('./db.json')
        if (!response.ok) {
            throw Error(response.statusText)
        }
        return response.json()
    }

    async add(data) {
        const response = await fetch("/api", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
        // Returned response from app.js  
        const json = await response.json()
        console.log("POST", json)
    }
}