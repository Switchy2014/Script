const workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos', 
    sound: true        
});

function actualizarCodigoVisual() {
    const codigo = javascript.javascriptGenerator.workspaceToCode(workspace);
    const output = document.getElementById('js-code-output');
    output.textContent = codigo || "// Drag blocks to generate code!";
}

workspace.addChangeListener(actualizarCodigoVisual);
