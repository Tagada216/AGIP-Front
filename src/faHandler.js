///////////////////////////////////////////////////////////////////////////////
// Import de la librairie FontAwesome (notamment pour les icones de la sidebar)
import { library } from '@fortawesome/fontawesome-svg-core';
import { dom } from '@fortawesome/fontawesome-svg-core';
dom.watch();

// On rentre toutes les icone nécessaire, leur nom est trouvable ici :
// https://fontawesome.com/icons?d=gallery&s=solid&m=free
// Par rapport au site il faut prefixer par "fa" et ajouter le nom de l'icone en camelCase.
import {
    faHome, //https://fontawesome.com/icons/home?style=solid
    faPen, //https://fontawesome.com/icons/pen?style=solid
    faFile, // etc.
    faArchive,
    faHandsHelping,
    faChartBar,
    faBookOpen,
    faSearch,
    faFileExcel,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faPen,
    faFile,
    faArchive,
    faHome,
    faHandsHelping,
    faChartBar,
    faBookOpen,
    faSearch,
    faFileExcel
);
///////////////////////////////////////////////////////////////////////////////
