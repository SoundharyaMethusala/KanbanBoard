let modalcont=document.querySelector('.modal-container');
let addbtn=document.querySelector('.add-btn');

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

let ticketColor=document.querySelectorAll('.palette-color');
for(let i=0;i<ticketColor.length;i++){
    ticketColor[i].addEventListener('click',function(e){
        //console.log(e.target.classList[1]);
        //let color=e.target.classList[1];
        for(let j=0;j<ticketColor.length;j++){
            ticketColor[j].classList.remove('active');
        }
        e.target.classList.add('active');

    });
}

function resetColor(){
    for(let j=0;j<ticketColor.length;j++){
        ticketColor[j].classList.remove('active');
    }
    ticketColor[0].classList.add('active');
}
