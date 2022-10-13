const arr = ["this was full of car names :D"]
obj={}

arr.forEach(x => {
  obj[x] = {
    track: "",  
    drift: "",
    offroad: "",
    drag: ""  
  }
})

let run=JSON.stringify(obj, null, "\t")
console.log(run);
