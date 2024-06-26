let modalcont=document.querySelector('.modal-container');
let addbtn=document.querySelector('.add-btn');
let maincont=document.querySelector('.main-cont');
let ticketColor=document.querySelectorAll('.palette-color');
let allPriorityColors=document.querySelectorAll('.color');


var uid = new ShortUniqueId();

let ticketsArr=[];
let color='red';
const colors=['red','blue','green','pink'];

let clicktimer;
const delay=300;

for(let i=0;i<allPriorityColors.length;i++){
    allPriorityColors[i].addEventListener('click',function(e){
        if(clicktimer){
            clearTimeout(clicktimer);
            clicktimer=null;
        }
        else{
            clicktimer=setTimeout(()=>{
                clicktimer=null;
                let selectedcolor=allPriorityColors[i].classList[1];
                //console.log(selectedcolor);
                let alltickets=document.querySelectorAll('.ticket-cont');
                for(let j=0;j<alltickets.length;j++){
                   // console.log(alltickets[j]);
                    let color=alltickets[j].querySelector('.ticket-color');
                    //console.log(ticketcolor.classList[1]);
                    if(color.classList[1]==selectedcolor){
                        alltickets[j].style.display='block';
                    }
                    else{
                        alltickets[j].style.display='none';
                    }
                }
            },delay);
        }
    });
    allPriorityColors[i].addEventListener('dblclick',function(e){
        if(clicktimer){
            clearTimeout(clicktimer);
            clicktimer=null;
        }
        //console.log('double clicked');
        let alltickets=document.querySelectorAll('.ticket-cont');
        for(let j=0;j<alltickets.length;j++){
            alltickets[j].style.display='block';
        }
    });
}


let isModalOpen=false;
addbtn.addEventListener('click',function(){
    if(isModalOpen){
        //close/hide the modal
        modalcont.style.display='none';
    }
    else{
        modalcont.style.display='flex';
    }
    isModalOpen=!isModalOpen;
});

for(let i=0;i<ticketColor.length;i++){
    ticketColor[i].addEventListener('click',function(e){
        for(let j=0;j<ticketColor.length;j++){
            if(ticketColor[j].classList.contains('active')){
                ticketColor[j].classList.remove('active');
            }
        }
        e.target.classList.add('active');
       // console.log(ticketColor[i].classList[1]);
       color=e.target.classList[1];
    });
}

let deletebtn=document.querySelector('.remove-btn');
let deleteflag=false;

deletebtn.addEventListener('click',function(e){
    if(deleteflag){
        deletebtn.style.color='black';
        deleteflag=false;
    }
    else{
        deletebtn.style.color='red';
        deleteflag=true;
    }
});



let taskarea=document.querySelector('.task-content');
taskarea.addEventListener('keydown',function(e){
    if(e.key=='Enter'){
        modalcont.style.display='none';
        let task=e.target.value;
        //console.log(task);
        isModalOpen='false';
        taskarea.value='';
        createTicket(undefined,task,color);
    }
});


if(localStorage.getItem('ticketsDB')){
    let arr=JSON.parse(localStorage.getItem('ticketsDB'));
    for(let i=0;i<arr.length;i++){
        let ticketobj=arr[i];
        createTicket(ticketobj.id,ticketobj.task,ticketobj.color);
    }
}

function createTicket(ticketid,task,color){
    if(task==""){
        alert("Please add a task");
        return;
    }
    let ticketdiv=document.createElement('div');
    ticketdiv.className='ticket-cont';
    let id;
    if(ticketid){
        id=ticketid;
    }
    else{
        id=uid.rnd();
    }
    ticketdiv.innerHTML=`<div class="ticket-color ${color}"></div>
            <div class="ticket-id">${id}</div>
            <div class="task-area">${task}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
                </div>`;
    maincont.appendChild(ticketdiv);
    let ticketobj={id:id,task:task,color:color};
    ticketsArr.push(ticketobj);
    updatelocalstorage();
    //console.log(ticketsArr);
    ticketdiv.addEventListener('click',function(e){
        if(deleteflag){
            ticketdiv.remove();
            let index=ticketsArr.findIndex(function(ticketobj){
                return ticketobj.id==id;
            });
            ticketsArr.splice(index,1);
            let stringifyarr=JSON.stringify(ticketsArr);
            localStorage.setItem('ticketsDB',stringifyarr);       
        }
    });
        let lock=true;
        let ticketlock=ticketdiv.querySelector('.ticket-lock');
        let taskarea=ticketdiv.querySelector('.task-area');
        ticketlock.addEventListener('click',function(e){
            if(lock){
                ticketlock.className='ticket-unlock';
                taskarea.setAttribute('contenteditable','true');
                ticketlock.innerHTML='<i class="fa-solid fa-lock-open"></i>';
            }
            else{
                ticketlock.className='ticket-lock';
                ticketlock.innerHTML='<i class="fa-solid fa-lock"></i>';
                taskarea.setAttribute('contenteditable','false');
            }
            lock=!lock;
        });

    let ticketpalettecolor=ticketdiv.querySelector('.ticket-color');
    ticketpalettecolor.addEventListener('click',function(e){
       // console.log(e.target.classList[1]);
       let currentcolor=e.target.classList[1];
       e.target.classList.remove(currentcolor);
       let currentcolorindex=colors.findIndex(function(color){
            return currentcolor==color
       });
       //console.log(currentcolorindex);
       let nextcolorindex=(currentcolorindex+1)%colors.length;
       //console.log(nextcolorindex);
       let nextcolor=colors[nextcolorindex];
       //console.log(nextcolor);
       //console.log(e.target.classList);
       e.target.classList.add(nextcolor);
       let index=ticketsArr.findIndex(function(ticketobj){
            return ticketobj.id==id;
       });
       console.log(ticketsArr[index]);
       ticketsArr[index].color=nextcolor;
       updatelocalstorage();
    });
}

function updatelocalstorage(){
    let Stringifyticketsarr=JSON.stringify(ticketsArr);
    localStorage.setItem('ticketsDB',Stringifyticketsarr);
}
