import React from 'react';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Select from 'material-ui/Select';
import InputAdornment from 'material-ui/Input/InputAdornment';
import VpnKeyIcon from 'material-ui-icons/VpnKey';

//material Icon
import HomeIcon from 'material-ui-icons/Home';
import PhoneIcon from 'material-ui-icons/Phone';
import FingerprintIcon from 'material-ui-icons/Fingerprint';
// core components
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';

import customSelectStyle from '@cmsassets/jss/material-dashboard-pro-react/customSelectStyle.jsx';

const style = {
  infoText: {
    fontWeight: '300',
    margin: '10px 0 30px',
    textAlign: 'center',
  },
  ...customSelectStyle,
};

class Step3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      phonenumber: '',
      phonenumberState: '',
      identity: '',
      identityState: '',
      password: '',
      passwordState: '',
      confirm: '',
      comfirmState: '',
      url: 'www.superschool.com',
      urlState: 'success',
    };
  }
  handleSimple = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  isValidated() {
    if (
      this.state.phonenumberState === 'success' &&
      this.state.identityState === 'success' &&
      this.state.passwordState === 'success' &&
      this.state.comfirmState === 'success' &&
      this.state.urlState === 'success'
    ) {
      return true;
    } else {
      if (this.state.phonenumberState !== 'success') {
        this.setState({ phonenumberState: 'error' });
      }
      if (this.state.identityState !== 'success') {
        this.setState({ fullnameState: 'error' });
      }
      if (this.state.passwordState !== 'success') {
        this.setState({ passwordState: 'error' });
      }
      if (this.state.confirmState !== 'success') {
        this.setState({ confirmState: 'error' });
      }
      if (this.state.urlState !== 'success') {
        this.setState({ urlState: 'error' });
      }
      if (this.state.identityState !== 'success') {
        this.setState({ identityState: 'error' });
      }
    }
    return false;
  }
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }
  verifyUrl(value) {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  }
  verifyNumber(value) {
    var numberRex = new RegExp('^[0-9]+$');
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo, maxValue) {
    switch (type) {
      case 'password':
        if (this.verifyLength(event.target.value, 1)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'equalTo':
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'checkbox':
        if (event.target.checked) {
          this.setState({ [stateName + 'State']: '' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'number':
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'length':
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'max-length':
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'url':
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      case 'range':
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + 'State']: 'success' });
        } else {
          this.setState({ [stateName + 'State']: 'error' });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <ItemGrid xs={12} sm={12}>
          <h4 className={classes.infoText}>
            Nhập các thông tin cá nhân để hoàn tất
          </h4>
        </ItemGrid>
        <ItemGrid xs={12} sm={7}>
          <CustomInput
            labelText="Địa chỉ"
            id="streetname"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <HomeIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={3}>
          <CustomInput
            success={this.state.identityState === 'success'}
            error={this.state.identityState === 'error'}
            labelText={<span>Căn cước công dân</span>}
            id="identify"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => this.change(e, 'identity', 'number'),
              type: 'text',
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <FingerprintIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={5}>
          <CustomInput
            success={this.state.phonenumberState === 'success'}
            error={this.state.phonenumberState === 'error'}
            labelText={
              <span>
                Số điện thoại <small>(bắt buộc)</small>
              </span>
            }
            id="phonenumber"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (e) => this.change(e, 'phonenumber', 'number'),
              type: 'text',
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <PhoneIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={5}>
          <CustomInput
            success={this.state.urlState === 'success'}
            error={this.state.urlState === 'error'}
            labelText={
              <span>
                Đường dẫn trang web <small>(nếu có)</small>
              </span>
            }
            id="url"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              defaultValue: this.state.url,
              type: 'text',
              onChange: (e) => this.change(e, 'url', 'url'),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.passwordState === 'success'}
            error={this.state.passwordState === 'error'}
            labelText={
              <span>
                Mật khẩu <small>(bắt buộc)</small>
              </span>
            }
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) => this.change(event, 'password', 'password'),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <VpnKeyIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={12} lg={10}>
          <CustomInput
            success={this.state.confirmState === 'success'}
            error={this.state.confirmState === 'error'}
            labelText={
              <span>
                Nhập lại mật khẩu <small>(bắt buộc)</small>
              </span>
            }
            id="confirm"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              onChange: (event) =>
                this.change(event, 'confirm', 'equalTo', 'password'),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <VpnKeyIcon className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
            }}
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default withStyles(style)(Step3);
