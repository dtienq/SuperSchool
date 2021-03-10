// ##############################
// // // RegularForms view styles
// #############################

import customCheckboxRadioSwitch from '@cmsassets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.jsx';
<<<<<<< HEAD

=======
import customSelectStyle from '@cmsassets/jss/material-dashboard-pro-react/customSelectStyle.jsx';
>>>>>>> master
const regularFormsStyle = {
  ...customCheckboxRadioSwitch,
  staticFormGroup: {
    marginLeft: '0',
    marginRight: '0',
    paddingBottom: '10px',
    margin: '8px 0 0 0',
    position: 'relative',
    '&:before,&:after': {
      display: 'table',
      content: '" "',
    },
    '&:after': {
      clear: 'both',
    },
  },
  staticFormControl: {
    marginBottom: '0',
    paddingTop: '8px',
    paddingBottom: '8px',
    minHeight: '34px',
  },
<<<<<<< HEAD
=======

  ...customSelectStyle,
>>>>>>> master
};

export default regularFormsStyle;
