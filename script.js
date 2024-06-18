let modalcont=document.querySelector('.modal-container');
let addbtn=document.querySelector('.add-btn');
let maincont=document.querySelector('.main-cont');
let toolboxcolor=document.querySelectorAll('.color');

var uid = new ShortUniqueId();


let isModalOpen=false;
addbtn.addEventListener('click',function(){
    if(isModalOpen){
        //close/hide the modal
        modalcont.style.display='none';
    }
    else{
        resetColor();
        modalcont.style.display='flex';
    }
    isModalOpen=!isModalOpen;
});

let color='red';

let ticketColor=document.querySelectorAll('.palette-color');
for(let i=0;i<ticketColor.length;i++){
    ticketColor[i].addEventListener('click',function(e){
        for(let j=0;j<ticketColor.length;j++){
            ticketColor[j].classList.remove('active');
        }
        e.target.classList.add('active');
       // console.log(ticketColor[i].classList[1]);
       color=ticketColor[i].classList[1];
    });
}

function resetColor(){
    for(let j=0;j<ticketColor.length;j++){
        ticketColor[j].classList.remove('active');
    }
    ticketColor[0].classList.add('active');
}

let deletebtn=document.querySelector('.remove-btn');
let deleteflag=false;

deletebtn.addEventListener('click',function(e){
    if(deleteflag){
        deletebtn.style.color='black';
    }
    else{
        deletebtn.style.color='red';
    }
    deleteflag=!deleteflag;
});



let taskarea=document.querySelector('.task-content');
taskarea.addEventListener('keydown',function(e){
    if(e.key=='Enter'){
        modalcont.style.display='none';
        let task=e.target.value;
        //console.log(task);
        taskarea.value='';
        createTicket(task,color);
    }
});

function createTicket(task,color){
    let ticketdiv=document.createElement('div');
    ticketdiv.className='ticket-cont';
    ticketdiv.innerHTML=`<div class="ticket-color ${color}"></div>
            <div class="ticket-id">${uid.rnd()}</div>
            <div class="task-area">${task}</div>
            <div class="ticket-lock">
                <i class="fa-solid fa-lock"></i>
                </div>`;
    maincont.appendChild(ticketdiv);
    let alltickets=document.querySelectorAll('.ticket-cont');
    for(let i=0;i<alltickets.length;i++){
        alltickets[i].addEventListener('click',function(e){
            if(deleteflag){
                alltickets[i].remove();
            }
        });
        let lock=true;
        let ticketlock=alltickets[i].querySelector('.ticket-lock');
        let taskarea=alltickets[i].querySelector('.task-area');
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
    }
}

for(let i=0;i<toolboxcolor.length;i++){
    toolboxcolor[i].addEventListener('click',function(e){
        console.log('clicked');
    });
}
