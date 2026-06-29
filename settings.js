const modal = document.getElementById('settings-modal');

const funcionSonidoOriginal = Blockly.WorkspaceAudio.prototype.play;

const temaOscuroZelos = Blockly.Theme.defineTheme('zelos_dark', {
    'base': Blockly.Themes.Classic,
    'categoryStyles': {
        'logic_category': { 'colour': '#5b6770' },
        'loop_category': { 'colour': '#4a5560' },
        'math_category': { 'colour': '#3a4454' },
        'text_category': { 'colour': '#2c3540' }
    },
    'blockStyles': {},
    'componentStyles': {
        'workspaceBackgroundColour': '#1a1a1a', 
        'toolboxBackgroundColour': '#2d2d2d',   
        'toolboxTextColour': '#ffffff'          
    }
});

const ConfigManager = {
    mostrar: function() {
        modal.style.display = 'flex';
    },
    ocultar: function() {
        modal.style.display = 'none';
    },
    aplicarConfiguraciones: function() {
        const temaSeleccionado = document.getElementById('setting-theme').value;
        const sonidosActivos = document.getElementById('setting-sounds').checked;

       
        if (temaSeleccionado === 'dark') {
            workspace.setTheme(temaOscuroZelos);
        } else {
            workspace.setTheme(Blockly.Themes.Classic);
        }

        if (sonidosActivos) {
            Blockly.WorkspaceAudio.prototype.play = funcionSonidoOriginal;
        } else {
            Blockly.WorkspaceAudio.prototype.play = function() { };
        }

        this.ocultar();
    }
};
