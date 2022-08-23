// dont show any boxes until we hit a key
//the key for spacebar is an empty string, so we need to check for that

const insert = document.getElementById('insert');

// window is the top level object in the browser
window.addEventListener('keydown', (e) => {
  //console.log(e);
  insert.innerHTML = `
    <div class="key">
        ${e.key === ' ' ? 'Space' : e.key} 
        <small>event.key</small>
    </div>
    <div class="key">
        ${e.keyCode} 
        <small>event.keyCode</small>
    </div>
    <div class="key">
        ${e.code} 
        <small>event.code</small>
    </div>
  `;
});
