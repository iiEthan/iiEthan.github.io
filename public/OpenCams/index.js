import {dbFunctions} from './dbFunctions.js'

let db = new dbFunctions()

const data = {title: "test", url: "http://camera.buffalotrace.com/mjpg/video.mjpg"}

let btn = document.createElement("button");
btn.innerHTML = "post";
btn.onclick = async function(){
    const json = await db.get()
    data.id = json.cam.length
    db.post(data, data.id)
}
document.body.appendChild(btn);

let btn2 = document.createElement("button");
btn2.innerHTML = "get";
btn2.onclick = async function(){
    console.log(await db.get())
}
document.body.appendChild(btn2);

let btn3 = document.createElement("button");
btn3.innerHTML = "get 2";
btn3.onclick = async function(){
    console.log(await db.get(2))
}
document.body.appendChild(btn3);

let btn4 = document.createElement("button");
btn4.innerHTML = "delete 1";
btn4.onclick = async function(){
    await db.remove(1)
}
document.body.appendChild(btn4);

let btn5 = document.createElement("button");
btn5.innerHTML = "update 3";
btn5.onclick = async function(){
    const data2 = {title: "test2", url: "http://google.com"}
    await db.update(data2, 3)
}
document.body.appendChild(btn5);