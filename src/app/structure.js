const fs = require('fs');
const path = require('path');

const appStructure = {
    // in core vom pune toate lucrurile comune
    core: {
        guards: ['auth.guard.ts', 'module-import.guard.ts', 'no-auth.guard.ts'],
        interceptor: ['token.interceptor.ts', 'error.interceptor.ts'],
        services: [],
        //aici vor fi componentele comune ale fiecarei pagini: navbar, page-not found, buttons, form-field, etc
        components: {
            navbar: [],
            'page-not-found': [],

        },
        constants: ['constants.ts'],
        enums: ['app-enums.ts'],
        models: ['model-a.ts', 'model-b.ts'],
        utils: ['common-functions.ts'],
        directives: [],
        pipes: [],

    },
    //pentru fiecare feature vom crea un folder nou 
    features: {
        'profile': {
            components: [],
            models: ['user.model.ts'],
            services: ['user.service.ts'],
            modals: []
        },
        'auth': {
            components: [],
            models: ['user.model.ts'],
            services: ['user.service.ts'],
            modals: []
        }
    },
    styles: {
        'app-loading.scss': true,
        'company-colors.scss': true,
        'spinners.scss': true,
        'variables.scss': true,
    },
    assets: {
        i18n: [],
        images: [],
        static: [],
        icons: [],
    },
};

function createFolderStructure(parentPath, structure) {
    for (const item in structure) {
        if (typeof structure[item] === 'object') {
            fs.mkdirSync(path.join(parentPath, item));
            createFolderStructure(path.join(parentPath, item), structure[item]);
        } else if (structure[item] === true) {
            fs.writeFileSync(path.join(parentPath, item), '');
        } else if (Array.isArray(structure[item])) {
            const folderPath = path.join(parentPath, item);
            fs.mkdirSync(folderPath);
            structure[item].forEach((file) => {
                fs.writeFileSync(path.join(folderPath, file), '');
            });
        }
    }
}

createFolderStructure(__dirname, appStructure);
console.log('Angular app folder structure generated successfully!');
