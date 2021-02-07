import React from 'react';
import PropTypes from 'prop-types';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

import typographyStyle from '@cmsassets/jss/material-dashboard-pro-react/components/typographyStyle.jsx';

function Primary({ ...props }) {
  const { classes, children } = props;
  return (
    <div className={classes.defaultFontStyle + ' ' + classes.primaryText}>
      {children}
    </div>
  );
}

Primary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(Primary);
