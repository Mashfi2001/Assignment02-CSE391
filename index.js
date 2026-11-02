var quotearr = ["The price good men pay for indifference to public affairs is to be ruled by evil men.",
    "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
    "The unexamined life is not worth living.",
    "Wise men speak because they have something to say; fools because they have to say something.",
    "The first and greatest victory is to conquer yourself; to be conquered by yourself is of all things most shameful and vile.",
    "Education is teaching our children to desire the right things.",
    "Opinion is the medium between knowledge and ignorance.",
    "The measure of a man is what he does with power.",
    "You can discover more about a person in an hour of play than in a year of conversation.",
    "The beginning is the most important part of the work."
];
const box = document.getElementById("fortune");
box.textContent = quotearr[Math.floor(Math.random() * quotearr.length)]; 

const time = document.getElementById("time");


const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
const button4 = document.getElementById("btn4");
const timestart = document.getElementById("start");
const timestop = document.getElementById("stop");
const timereset = document.getElementById("reset");

const button1theme = {
    text: "black",
    bg: "skyblue",
    border: "navy",
    size: "12px",
    font: "Georgia"
};
const button2theme = {
    text: "navy",
    bg: "orange",
    border: "saddlebrown",
    size: "14px",
    font: "Arial"
}

const button3theme = {
    text: "white",
    bg: "darkgreen",
    border: "black",
    size: "13px",
    font: "Verdana"    
}
const button4theme = {
    text: "lightyellow",
    bg: "maroon",
    border: "darkorange",
    size: "15px",
    font: "Times New Roman"


}

function applytheme(theme) {
    box.style.color = theme.text
    box.style.background = theme.bg
    box.style.borderColor = theme.border
    box.style.fontSize = theme.size;
    box.style.fontFamily = theme.font
}



const fonts = ["Redaction 70", "Arial", "Courier New", "Verdana","Times New Roman","Lucida Console"];
button1.addEventListener('click', function() {
    applytheme(button1theme)
  });
button2.addEventListener('click', function() {
    applytheme(button2theme)
  });
button3.addEventListener('click', function() {
    applytheme(button3theme)
  });
button4.addEventListener('click', function() {
    applytheme(button4theme)
  });

function tick(){
    seconds+=3;
    showtime()
    if(seconds===30){
    stop() ;   
    }
}

function start(){ 
    if(timerID !== null || seconds === 30){
        return;
    }
    timerID = setInterval(tick, 3000);
}
function stop(){
    clearInterval(timerID);
    timerID = null;
}
function reset(){
    stop();
    seconds = 0;
    showtime();
}
timestart.addEventListener("click", start);
timestop.addEventListener("click", stop);
timereset.addEventListener("click", reset);

let seconds = 0;
let timerID = null;

function showtime(){
    const text = String(seconds).padStart(2, '0');
    time.textContent = text
}
showtime();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const task = document.getElementById("taskInput");
const addbtn = document.getElementById("add");
const list = document.getElementById("list");


function showTask(){
    list.innerHTML = "";
    for (let i = 0; i< tasks.length;i++){
        const item = document.createElement("li");
        item.textContent=tasks[i].text;
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tasks[i].done;
        checkbox.addEventListener("change",function(){    
            tasks[i].done = checkbox.checked;
            saveTasks(); 
            showTask();
        });
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", function () { 
            tasks.splice(i, 1);
            saveTasks();   
            showTask();
        });
        item.appendChild(delBtn);
        item.prepend(checkbox);
        if (tasks[i].done) {
            item.style.textDecoration = "line-through";
        }
        list.appendChild(item);
    }
}

function addtask(){
    const text = task.value;
    task.value = "";
    if (text.trim() === "") { 
        return;
    }
    tasks.push({ text: text, done: false});
    saveTasks();
    showTask();
}

addbtn.addEventListener("click",addtask);

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
showTask();