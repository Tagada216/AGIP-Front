import Main_Courante from '@/services/agiproAPI/main_courante';
import Cosip from '@/services/agiproAPI/cosip';
import Enum_Form_Fields from '@/services/agiproAPI/enum_form_fields';

export default (context, inject) => {
    // Initialize API factories
    const factories ={
        main_courante : Main_Courante(context.$axios),
        cosip : Cosip(context.$axios),
        enum_form_fields: Enum_Form_Fields(context.$axios),
    };
    inject ("api_agipro", factories);
}