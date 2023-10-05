import dashboard from './dashboard';

import administration from './administration';
import reclamations from './reclamations';
import travauxProgramer from './travauxProgramer';
import planification from './planification';
import interventions from './interventions';
import stock from './stock';
import reporting from './repporting';

// ==============================|| MENU ITEMS ||============================== //
//travauxProgramer
const menuItems = {
    items: [dashboard, administration, reclamations, interventions, planification, stock, reporting]
};

export default menuItems;
