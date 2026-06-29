// settings.js - Gestión de interfaz y variables de configuración
const modal = document.getElementById('settings-modal');

// Guardamos una copia de la función original de reproducir sonido de Blockly
const funcionSonidoOriginal = Blockly.WorkspaceAudio.prototype.play;

// Creamos un tema oscuro personalizado compatible con el renderizador Zelos
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
        'workspaceBackgroundColour': '#1a1a1a', // Fondo del espacio de bloques oscuro
        'toolboxBackgroundColour': '#2d2d2d',   // Fondo del menú lateral oscuro
        'toolboxTextColour': '#ffffff'          // Texto del menú en blanco
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

        // 1. SOLUCIÓN COLORES: Aplicar el tema adecuado según la selección
        if (temaSeleccionado === 'dark') {
            workspace.setTheme(temaOscuroZelos);
        } else {
            workspace.setTheme(Blockly.Themes.Classic);
        }

        // 2. Control de efectos de sonido
        if (sonidosActivos) {
            Blockly.WorkspaceAudio.prototype.play = funcionSonidoOriginal;
        } else {
            Blockly.WorkspaceAudio.prototype.play = function() { };
        }

        this.ocultar();
    }
};