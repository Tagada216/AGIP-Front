//Ce script charge globalement tout les composants (.vue) situées dans "./src/components/"
//Ces (.vue) doivent être préfixé par "Base" suivi d'une majuscule et le reste du nom fichier en CamelCase.

import Vue from 'vue';
var requireComponent = require.context(
    './components/',
    false,
    /Base[A-Z][A-Za-z]*.vue/
);
requireComponent.keys().forEach(function(fileName) {
    var baseComponentConfig = requireComponent(fileName);
    baseComponentConfig = baseComponentConfig.default || baseComponentConfig;
    var baseComponentName =
        baseComponentConfig.name ||
        fileName.replace(/^.+\//, '').replace(/\.\w+$/, '');
    Vue.component(baseComponentName, baseComponentConfig);
});
