// js/editor.js - Inicialización y renderizado del espacio Blockly
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos', 
    sound: true        
});

function actualizarCodigoVisual() {
    // CORRECCIÓN: Usamos el generador moderno para obtener el texto
    const codigo = javascript.javascriptGenerator.workspaceToCode(workspace);
    const output = document.getElementById('js-code-output');
    output.textContent = codigo || "// Drag blocks to generate code!";
}

// Escucha activa de movimientos en el canvas
workspace.addChangeListener(actualizarCodigoVisual);