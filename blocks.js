const initOriginalPrint = Blockly.Blocks['text_print'].init;
Blockly.Blocks['text_print'].init = function() {
    initOriginalPrint.call(this); // Mantiene su forma nativa
    this.setColour("#ff6d2e");    // Le cambia el color a naranja
};
javascript.javascriptGenerator.forBlock['text_print'] = function(block, generator) {
    const msg = generator.valueToCode(block, 'TEXT', javascript.javascriptGenerator.ORDER_NONE) || "''";

    return `miTerminal.log(${msg});\n`;
};
// ======Warning======
Blockly.Blocks['text_warn'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("warn");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);    
    this.setStyle('text_blocks');
    this.setColour("#ff6d2e");   
    this.setTooltip("Shows a Warning on the console");
  }
};

javascript.javascriptGenerator.forBlock['text_warn'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || "''";
    return `miTerminal.warn(${msg});\n`;
};
// ======Error======
Blockly.Blocks['text_error'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck("String")
        .appendField("error"); 
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);     
    this.setStyle('text_blocks'); 
    this.setColour("#ff6d2e");         
    this.setTooltip("Shows a Error on the console");
  }
};

javascript.javascriptGenerator.forBlock['text_error'] = function (block, generator) {
    const msg = generator.valueToCode(block, 'TEXT', generator.ORDER_NONE) || "''";
    return `miTerminal.error(${msg});\n`;
};
Blockly.Blocks['switch_container'] = {
  init: function() {
    this.appendDummyInput().appendField("Switch");
    this.appendStatementInput("STACK"); 
    this.setColour("#537FA5");
    this.contextMenu = false; 
  }
};


Blockly.Blocks['switch_case'] = {
  init: function() {
    this.appendDummyInput().appendField("Case");
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null);     
    this.setColour("#537FA5");
    this.contextMenu = false;
  }
};

Blockly.Blocks['switch_default'] = {
  init: function() {
    this.appendDummyInput().appendField("Default");
    this.setPreviousStatement(true, null);
    this.setColour("#537FA5");
    this.contextMenu = false;
  }
};
Blockly.Blocks['controls_switch'] = {
  init: function() {
    this.appendValueInput("SWITCH_VAR")
        .setCheck(null)
        .appendField("Switch");
        
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#537FA5")

    this.caseCount_ = 1;
    this.hasDefault_ = 0; 
    
    
    this.setMutator(new Blockly.icons.MutatorIcon(['switch_case', 'switch_default'], this));
  },
    
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('switch_container');
    containerBlock.initSvg?.();
    
    let connection = containerBlock.getInput('STACK').connection;
    
    
    for (let i = 1; i <= this.caseCount_; i++) {
      const caseBlock = workspace.newBlock('switch_case');
      caseBlock.initSvg?.();
      connection.connect(caseBlock.previousConnection);
      connection = caseBlock.nextConnection;
    }
    
    if (this.hasDefault_) {
      const defaultBlock = workspace.newBlock('switch_default');
      defaultBlock.initSvg?.();
      connection.connect(defaultBlock.previousConnection);
    }
    
    return containerBlock;
  },

  
  compose: function(containerBlock) {
    let clauseBlock = containerBlock.getInputTargetBlock('STACK');
    let cases = 0;
    let hasDefault = 0;
    
    while (clauseBlock) {
      if (clauseBlock.type === 'switch_case') {
        cases++;
      } else if (clauseBlock.type === 'switch_default') {
        hasDefault = 1; // Encontró la pieza default
      }
      clauseBlock = clauseBlock.getNextBlock();
    }
    
   
    if (cases !== this.caseCount_ || hasDefault !== this.hasDefault_) {
      this.caseCount_ = cases;
      this.hasDefault_ = hasDefault;
      this.updateShape_();
    }
  },

  
  updateShape_: function() {
    
    let i = 1;
    while (this.getInput('CASE' + i)) {
      this.removeInput('CASE' + i);
      this.removeInput('DO' + i);
      i++;
    }
    if (this.getInput('DEFAULT')) {
      this.removeInput('DEFAULT');
    }

    
    for (i = 1; i <= this.caseCount_; i++) {
      this.appendValueInput('CASE' + i).setCheck(null).appendField("Case");
      this.appendStatementInput('DO' + i).appendField("do");
    }
    
   
    if (this.hasDefault_) {
      this.appendStatementInput('DEFAULT').appendField("Default");
    }
  },

  
  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('cases', this.caseCount_);
    container.setAttribute('default', this.hasDefault_); // Guardamos el estado del default
    return container;
  },
  domToMutation: function(xmlElement) {
    this.caseCount_ = parseInt(xmlElement.getAttribute('cases'), 10) || 0;
    this.hasDefault_ = parseInt(xmlElement.getAttribute('default'), 10) || 0;
    this.updateShape_();
  }
};
javascript.javascriptGenerator.forBlock['controls_switch'] = function(block, generator) {
    const switchVar = generator.valueToCode(block, 'SWITCH_VAR', generator.ORDER_NONE) || "''";
    let code = `switch (${switchVar}) {\n`;

    for (let i = 1; i <= block.caseCount_; i++) {
        const caseValue = generator.valueToCode(block, 'CASE' + i, generator.ORDER_NONE) || "''";
        const caseStatements = generator.statementToCode(block, 'DO' + i);
        
        code += `  case ${caseValue}:\n`;
        code += caseStatements ? caseStatements : `    // Sin acciones\n`;
        code += `    break;\n`;
    }

    if (block.hasDefault_) {
        const defaultStatements = generator.statementToCode(block, 'DEFAULT');
        code += `  default:\n`;
        code += defaultStatements ? defaultStatements : `    // Acciones por defecto\n`;
    }

    code += `}\n`;
    return code;
};
