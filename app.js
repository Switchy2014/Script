// app.js - Director de eventos y ejecución principal del entorno
document.getElementById('btn-limpiar').addEventListener('click', () => {
    miTerminal.clear();
});

document.getElementById('btn-config').addEventListener('click', () => {
    ConfigManager.mostrar();
});

document.getElementById('btn-guardar-config').addEventListener('click', () => {
    ConfigManager.aplicarConfiguraciones();
});

document.getElementById('btn-ejecutar').addEventListener('click', () => {
    miTerminal.clear();
    const codigoJS = javascript.javascriptGenerator.workspaceToCode(workspace);
    
    if (!codigoJS.trim()) {
        miTerminal.warn("The workspace is empty, consider placing some blocks before running");
        return;
    }

    try {
        eval(codigoJS);
    } catch (err) {
        miTerminal.error(err.message);
    }
});