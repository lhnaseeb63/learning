// want to change the class of each of these

//putting all panels into a node list using querySelectorAll
const panels  = document.querySelectorAll('.panel');

panels.forEach( (panel)=> {
    panel.addEventListener('click', ()=>{
        removeActiveClasses();
        panel.classList.add('active');
    })
} );

function removeActiveClasses() {
    panels.forEach( (panel)=>{
        panel.classList.remove('active');
    } )
};