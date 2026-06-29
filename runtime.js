// runtime.js - Control operacional de la Consola Virtual
const terminal = document.getElementById('virtual-terminal');

const miTerminal = {
    log: function(texto) {
        this.crearLinea(`> ${texto}`, "#00ff00"); 
    },
    warn: function(texto) {
        this.crearLinea(`⚠ Warning: ${texto}`, "#ffcc00"); 
    },
    error: function(texto) {
        this.crearLinea(`X Error: ${texto}`, "#ff5555"); 
    },
    clear: function() {
        terminal.innerHTML = '';
    },
    crearLinea: function(texto, color) {
        const p = document.createElement('p');
        p.textContent = texto;
        p.style.color = color;
        terminal.appendChild(p);
        terminal.scrollTop = terminal.scrollHeight; // Auto-scroll hacia abajo
    }
};