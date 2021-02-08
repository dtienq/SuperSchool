// ##############################
// // // Info component styles
// #############################

import {
  primaryColor,
  warningColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
} from '@cmsassets/jss/material-dashboard-pro-react.jsx';

const infoStyle = {
  infoArea: {
    maxWidth: '360px',
    margin: '0 auto',
    padding: '0px',
  },
  iconWrapper: {
    float: 'left',
    marginTop: '24px',
    marginRight: '10px',
  },
  primary: {
    color: primaryColor,
  },
  warning: {
    color: warningColor,
  },
  danger: {
    color: dangerColor,
  },
  success: {
    color: successColor,
  },
  info: {
    color: infoColor,
  },
  rose: {
    color: roseColor,
  },
  gray: {
    color: grayColor,
  },
  icon: {
    width: '36px',
    height: '36px',
  },
  descriptionWrapper: {
    color: grayColor,
    overflow: 'hidden',
  },
  title: {
    color: '#3C4858',
    margin: '30px 0 15px',
    textDecoration: 'none',
    fontSize: '18px',
  },
  description: {
    color: grayColor,
    overflow: 'hidden',
    marginTop: '0px',
    fontSize: '14px',
  },
};

export default infoStyle;
