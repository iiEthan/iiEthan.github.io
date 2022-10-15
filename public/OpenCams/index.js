import {Database} from './dbFunctions.js'

let db = new Database()
//let data = await db.read()

//console.log(data.cam[0].camURL)

const data2 = {test: "test4"}

let btn = document.createElement("button");
btn.innerHTML = "post";
btn.onclick = function(){
    db.add(data2)
}
document.body.appendChild(btn);


let btn2 = document.createElement("button");
btn2.innerHTML = "get";
btn2.onclick = async function(){
    let data3 = await db.read()
    console.log("GET", data3)
}
document.body.appendChild(btn2);