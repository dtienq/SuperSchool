import React from 'react';

// React boot-strap
import SweetAlert from 'react-bootstrap-sweetalert';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';

// material ui icons
import Check from 'material-ui-icons/Check';
//Material components
import Checkbox from 'material-ui/Checkbox';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import FormControl from 'material-ui/Form/FormControl';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import NavPills from '@cmscomponents/NavPills/NavPills.jsx';
import { maincategory } from '@cmsvariables/general.jsx';
// style for this view

import extendedFormsStyle from '@cmsassets/jss/material-dashboard-pro-react/views/extendedFormsStyle.jsx';
import { InputLabel } from 'material-ui';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.hideAlert = this.hideAlert.bind(this);
    if (this.props.location.state) {
      this.state = {
        title: 'Sửa đổi danh mục',
        main: this.props.location.state.main
          ? this.props.location.state.main
          : false,
        sub: this.props.location.state.sub
          ? this.props.location.state.sub
          : false,
        selectedValue: null,
        selectedEnabled: 'b',
        mainName: this.props.location.state.main.name
          ? this.props.location.state.main.name
          : '',
        subName: this.props.location.state.sub.name
          ? this.props.location.state.sub.name
          : '',
        mainEng: this.props.location.state.main.eng
          ? this.props.location.state.main.eng
          : '',
        subEng: this.props.location.state.sub.eng
          ? this.props.location.state.sub.eng
          : '',
        categorySelect: this.props.location.state.sub.parent
          ? +this.props.location.state.sub.parent
          : '',
        checkedMain: false,
        checkedSub: false,
        alert: null,
        show: false,
        listcategory: maincategory,
      };
    } else
      this.state = {
        title: 'Thêm danh mục',
        main: false,
        sub: false,
        selectedValue: null,
        selectedEnabled: 'b',
        categorySelect: '',
        mainName: '',
        subName: '',
        mainEng: '',
        subEng: '',
        checkedMain: false,
        checkedSub: false,
        alert: null,
        show: false,
        listcategory: maincategory,
      };
  }
  hideAlert() {
    this.setState({ alert: null });
  }
  mainSubmit() {
    const { mainName, mainEng, checkedMain } = this.state;
    if (mainName === '' || mainEng === '') {
      this.setState({
        alert: (
          <SweetAlert
            error
            style={{ display: 'block', marginTop: '-100px' }}
            title="Không đủ thông tin!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + ' ' + this.props.classes.success
            }
          >
            Vui lòng điền đầy đủ tên danh mục và tên tiếng anh của nó.
          </SweetAlert>
        ),
      });
    } else if (!checkedMain) {
      this.setState({
        alert: (
          <SweetAlert
            style={{ display: 'block', marginTop: '-100px' }}
            title="Vui lòng xác nhận đồng ý!"
            onConfirm={() => this.hideAlert()}
            showConfirm={false}
          >
            Thông báo tự tắt trong 2s
          </SweetAlert>
        ),
      });
      setTimeout(this.hideAlert, 2000);
    } else {
      //Thêm category vào db và hiện thông báo
    }
  }
  subSubmit() {
    const { categorySelect, subName, subEng, checkedSub } = this.state;
    if (categorySelect === '') {
      this.setState({
        alert: (
          <SweetAlert
            error
            style={{ display: 'block', marginTop: '-100px' }}
            title="Không đủ thông tin!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + ' ' + this.props.classes.success
            }
          >
            Vui lòng chọn danh mục chính.
          </SweetAlert>
        ),
      });
    } else if (subName === '' || subEng === '') {
      this.setState({
        alert: (
          <SweetAlert
            error
            style={{ display: 'block', marginTop: '-100px' }}
            title="Không đủ thông tin!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnCssClass={
              this.props.classes.button + ' ' + this.props.classes.success
            }
          >
            Vui lòng điền đầy đủ tên danh mục và tên tiếng anh của nó.
          </SweetAlert>
        ),
      });
    } else if (!checkedSub) {
      this.setState({
        alert: (
          <SweetAlert
            style={{ display: 'block', marginTop: '-100px' }}
            title="Vui lòng xác nhận đồng ý!"
            onConfirm={() => this.hideAlert()}
            showConfirm={false}
          >
            Thông báo tự tắt trong 2s
          </SweetAlert>
        ),
      });
      setTimeout(this.hideAlert, 2000);
    } else {
      //Thêm category vào db và hiện thông báo
    }
  }
  handleSimple = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleToggleMain() {
    const { checkedMain } = this.state;
    if (checkedMain) {
      this.setState({
        checkedMain: false,
      });
    } else {
      this.setState({
        checkedMain: true,
      });
    }
  }
  handleToggleSub() {
    const { checkedSub } = this.state;
    if (checkedSub) {
      this.setState({
        checkedSub: false,
      });
    } else {
      this.setState({
        checkedSub: true,
      });
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        {this.state.alert}
        {console.log(this.state)}
        <ItemGrid xs={12}>
          <HeaderCard
            cardTitle={
              <span>
                {this.state.title}{' '}
                {this.props.maincat && <small> - {this.props.maincat}</small>}
              </span>
            }
            headerColor="rose"
            content={
              <NavPills
                color="warning"
                tabs={
                  !this.state.main && !this.state.sub
                    ? [
                        {
                          tabButton: 'Danh mục cha',
                          tabContent: (
                            <span>
                              <form>
                                <CustomInput
                                  labelText="Nhập tên danh mục"
                                  id="cat_name"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                    onChange: (e) =>
                                      this.setState({
                                        mainName: e.target.value,
                                      }),
                                  }}
                                />
                                <CustomInput
                                  labelText="Nhập tên tiếng anh"
                                  id="cate_name"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                    onChange: (e) =>
                                      this.setState({
                                        mainEng: e.target.value,
                                      }),
                                  }}
                                />
                                <div className={classes.checkboxAndRadio}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        tabIndex={-1}
                                        onClick={() => this.handleToggleMain()}
                                        checkedIcon={
                                          <Check
                                            className={classes.checkedIcon}
                                          />
                                        }
                                        icon={
                                          <Check
                                            className={classes.uncheckedIcon}
                                          />
                                        }
                                        classes={{
                                          checked: classes.checked,
                                        }}
                                      />
                                    }
                                    classes={{
                                      label: classes.label,
                                    }}
                                    label="Đồng ý"
                                  />
                                </div>
                                <Button
                                  id="main-submit"
                                  onClick={() => this.mainSubmit()}
                                  color="rose"
                                >
                                  Submit
                                </Button>
                              </form>
                            </span>
                          ),
                        },
                        {
                          tabButton: 'Danh mục con',
                          tabContent: (
                            <span>
                              <form>
                                <ItemGrid xs={12}>
                                  <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                  >
                                    <InputLabel
                                      htmlFor="simple-select"
                                      className={classes.selectLabel}
                                    >
                                      Chọn danh mục chính
                                    </InputLabel>
                                    <Select
                                      MenuProps={{
                                        className: classes.selectMenu,
                                      }}
                                      classes={{
                                        select: classes.select,
                                      }}
                                      value={this.state.categorySelect}
                                      onChange={this.handleSimple}
                                      inputProps={{
                                        name: 'categorySelect',
                                        id: 'simple-select',
                                      }}
                                    >
                                      <MenuItem
                                        disabled
                                        classes={{
                                          root: classes.selectMenuItem,
                                        }}
                                      >
                                        Chọn danh mục
                                      </MenuItem>
                                      {this.state.listcategory.map((item) => (
                                        <MenuItem
                                          classes={{
                                            root: classes.selectMenuItem,
                                            selected:
                                              classes.selectMenuItemSelected,
                                          }}
                                          value={item.id}
                                        >
                                          {item.name}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                  </FormControl>
                                  <CustomInput
                                    labelText="Nhập tên danh mục con"
                                    id="cat_name"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: 'text',
                                      onChange: (e) =>
                                        this.setState({
                                          subName: e.target.value,
                                        }),
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Nhập tên tiếng anh"
                                    id="cate_name"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: 'text',
                                      onChange: (e) =>
                                        this.setState({
                                          subEng: e.target.value,
                                        }),
                                    }}
                                  />
                                  <div className={classes.checkboxAndRadio}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggleSub()}
                                          checkedIcon={
                                            <Check
                                              className={classes.checkedIcon}
                                            />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                          }}
                                        />
                                      }
                                      classes={{
                                        label: classes.label,
                                      }}
                                      label="Đồng ý"
                                    />
                                  </div>
                                  <Button
                                    id="sub-sumit"
                                    onClick={() => this.subSubmit()}
                                    color="rose"
                                  >
                                    Submit
                                  </Button>
                                </ItemGrid>
                              </form>
                            </span>
                          ),
                        },
                      ]
                    : this.state.main
                    ? [
                        {
                          tabButton: 'Danh mục cha',
                          tabContent: (
                            <span>
                              <form>
                                <CustomInput
                                  labelText="Nhập tên danh mục"
                                  id="cat_name"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                    onChange: (e) =>
                                      this.setState({
                                        mainName: e.target.value,
                                      }),
                                    value: this.state.main.name,
                                  }}
                                />
                                <CustomInput
                                  labelText="Nhập tên tiếng anh"
                                  id="cate_name"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                  inputProps={{
                                    type: 'text',
                                    onChange: (e) =>
                                      this.setState({
                                        mainEng: e.target.value,
                                      }),
                                    value: this.state.main.eng,
                                  }}
                                />
                                <div className={classes.checkboxAndRadio}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        tabIndex={-1}
                                        onClick={() => this.handleToggleMain()}
                                        checkedIcon={
                                          <Check
                                            className={classes.checkedIcon}
                                          />
                                        }
                                        icon={
                                          <Check
                                            className={classes.uncheckedIcon}
                                          />
                                        }
                                        classes={{
                                          checked: classes.checked,
                                        }}
                                      />
                                    }
                                    classes={{
                                      label: classes.label,
                                    }}
                                    label="Đồng ý thêm danh mục mới"
                                  />
                                </div>
                                <Button
                                  id="main-submit"
                                  onClick={() => this.mainSubmit()}
                                  color="rose"
                                >
                                  Submit
                                </Button>
                              </form>
                            </span>
                          ),
                        },
                      ]
                    : this.state.sub
                    ? [
                        {
                          tabButton: 'Danh mục con',
                          tabContent: (
                            <span>
                              <form>
                                <ItemGrid xs={12}>
                                  <FormControl
                                    fullWidth
                                    className={classes.selectFormControl}
                                  >
                                    <InputLabel
                                      htmlFor="simple-select"
                                      className={classes.selectLabel}
                                    >
                                      Chọn danh mục chính
                                    </InputLabel>
                                    <Select
                                      MenuProps={{
                                        className: classes.selectMenu,
                                      }}
                                      classes={{
                                        select: classes.select,
                                      }}
                                      value={this.state.categorySelect}
                                      onChange={this.handleSimple}
                                      inputProps={{
                                        name: 'categorySelect',
                                        id: 'simple-select',
                                      }}
                                    >
                                      <MenuItem
                                        disabled
                                        classes={{
                                          root: classes.selectMenuItem,
                                        }}
                                      >
                                        Chọn danh mục
                                      </MenuItem>
                                      {this.state.listcategory.map((item) =>
                                        item.id ===
                                        this.state.categorySelect ? (
                                          <MenuItem
                                            classes={{
                                              root: classes.selectMenuItem,
                                              selected:
                                                classes.selectMenuItemSelected,
                                            }}
                                            value={item.id}
                                            selected={true}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        ) : (
                                          <MenuItem
                                            classes={{
                                              root: classes.selectMenuItem,
                                              selected:
                                                classes.selectMenuItemSelected,
                                            }}
                                            value={item.id}
                                          >
                                            {item.name}
                                          </MenuItem>
                                        )
                                      )}
                                    </Select>
                                  </FormControl>
                                  <CustomInput
                                    labelText="Nhập tên danh mục con"
                                    id="cat_name"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: 'text',
                                      onChange: (e) =>
                                        this.setState({
                                          subName: e.target.value,
                                        }),
                                      value: this.state.sub.name,
                                    }}
                                  />
                                  <CustomInput
                                    labelText="Nhập tên tiếng anh"
                                    id="cate_name"
                                    formControlProps={{
                                      fullWidth: true,
                                    }}
                                    inputProps={{
                                      type: 'text',
                                      onChange: (e) =>
                                        this.setState({
                                          subEng: e.target.value,
                                        }),
                                      value: this.state.sub.eng,
                                    }}
                                  />
                                  <div className={classes.checkboxAndRadio}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          tabIndex={-1}
                                          onClick={() => this.handleToggleSub()}
                                          checkedIcon={
                                            <Check
                                              className={classes.checkedIcon}
                                            />
                                          }
                                          icon={
                                            <Check
                                              className={classes.uncheckedIcon}
                                            />
                                          }
                                          classes={{
                                            checked: classes.checked,
                                          }}
                                        />
                                      }
                                      classes={{
                                        label: classes.label,
                                      }}
                                      label="Đồng ý"
                                    />
                                  </div>
                                  <Button
                                    id="sub-sumit"
                                    onClick={() => this.subSubmit()}
                                    color="rose"
                                  >
                                    Submit
                                  </Button>
                                </ItemGrid>
                              </form>
                            </span>
                          ),
                        },
                      ]
                    : []
                }
              />
            }
          />
        </ItemGrid>
      </GridContainer>
    );
  }
}

export default withStyles(extendedFormsStyle)(CategoryForm);
