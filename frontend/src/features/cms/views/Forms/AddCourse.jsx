import React, { useState } from 'react';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import FormLabel from 'material-ui/Form/FormLabel';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import Radio from 'material-ui/Radio';
// material-ui-icons
import FiberManualRecord from 'material-ui-icons/FiberManualRecord';
//React quill
import Editor from '@cmscomponents/Editor/Editor.jsx'; // ES6

//Money
import CurrencyTextField from '@unicef/material-ui-currency-textfield';

// core components
import FileUpload from '@cmscomponents/CustomUpload/FileUpload';
import NavPills from '@cmscomponents/NavPills/NavPills.jsx';
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import Accordion from '@cmscomponents/Accordion/Accordion.jsx';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import FormControl from 'material-ui/Form/FormControl';
import InputLabel from 'material-ui/Input/InputLabel';
import regularFormsStyle from '@cmsassets/jss/material-dashboard-pro-react/views/regularFormsStyle';
function AddCourse(props) {
  const [state, setState] = useState({
    checked: [24, 22],
    selectedValue: null,
    selectedEnabled: 'b',
    createCourse: false,
    editCourse: false,
  });
  const [course, setCourse] = useState({
    title: '',
    imagePath: '',
    description: '',
    detailDescription: '',
    price: 0,
    status: '',
    teacherid: '',
    numberOfChapters: 5,
  });
  const [coursevid, setCoursevid] = useState({
    couseid: false,
    chapters: [
      //Chapter gồm có mã chapter,tên video, tên chương,tài liệu (nếu có), giá trị preview
      {
        orderno: '1',
        title: 'Giới thiệu hàm trong javascript',
        coursevideoid: '',
        videopath: '',
        document: '',
        preview: false,
      },
    ],
  });
  let moneyisValid = course.price < 1000;
  const handleFileChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const filehandleClick = () => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFileChange;
    input.click();
  };
  const videohandleClick = () => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFileChange;
    input.click();
  };

  const statusChange = function (event) {
    setState({ ...state, selectedValue: event.target.value });
  };
  const handleChangeEnabled = function (event) {
    setState({ ...state, selectedEnabled: event.target.value });
  };
  const EditChapter = function (order, value) {
    for (var chapter in coursevid.chapters) {
      if (coursevid.chapters[chapter].orderno === order) {
        let newChap = coursevid.chapters;
        newChap[chapter] = [...newChap[chapter], value];
        setCoursevid({ ...coursevid, chapters: newChap });
        break;
      }
    }
  };
  const loadChapters = function () {
    let chaparr = [];
    let i = 0;
    if (coursevid.courseid) {
      coursevid.chapters.map((item) =>
        chaparr.push({
          title: `Chương #${item.orderno}`,
          content: 'Roar',
        })
      );
    } else
      for (i = 0; i < course.numberOfChapters; i++) {
        chaparr.push({
          title: `Chương #${i + 1}`,
          content: (
            <ItemGrid xs={12} sm={12} md={12}>
              <GridContainer>
                <ItemGrid xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tên chương
                  </FormLabel>
                </ItemGrid>
                <ItemGrid xs={12} sm={10}>
                  <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      onChange: (e) => {},
                    }}
                  />
                </ItemGrid>
              </GridContainer>
              <GridContainer>
                <ItemGrid xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Tài liệu
                  </FormLabel>
                </ItemGrid>
                <ItemGrid xs={12} sm={10}>
                  {/* <CustomInput
                    id="help-text"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: 'text',
                      onChange: (e) => {},
                    }}
                  /> */}
                  {/* <Button round color="rose" onClick={filehandleClick()}>
                    Thêm tài liệu
                  </Button> */}
                  <input type="file" accept=".pdf"></input>
                </ItemGrid>
              </GridContainer>
              <GridContainer>
                <ItemGrid xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Video
                  </FormLabel>
                </ItemGrid>
                <ItemGrid xs={12} sm={10}>
                  <input type="file"></input>
                </ItemGrid>
              </GridContainer>
            </ItemGrid>
          ),
        });
      }

    return chaparr;
  };

  const handleToggle = function (value) {
    const { checked } = state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setState({ ...state, checked: newChecked });
  };
  const { classes } = props;
  return (
    <GridContainer>
      {console.log(coursevid)}
      {console.log(course)}
      <ItemGrid xs={12} sm={12} md={12}>
        <HeaderCard
          cardTitle="Thông tin khoá học"
          headerColor="rose"
          content={
            <NavPills
              color="rose"
              tabs={[
                {
                  tabButton: 'Thông tin chung',
                  tabContent: (
                    <form>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Tên khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="help-text"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'text',
                              onChange: (e) => {
                                setCourse({ ...course, title: e.target.value });
                              },
                            }}
                            helpText="Tên khoá học sẽ được hiển thị kèm hình ảnh và mô tả ở đầu khoá học"
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Danh mục
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={5}>
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
                              value=""
                              onChange={'dasasdasd'}
                              inputProps={{
                                name: 'simpleSelect',
                                id: 'simple-select',
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                              >
                                Chọn danh mục chính
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                                value="2"
                              >
                                Paris
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={5}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="simple-select"
                              className={classes.selectLabel}
                            >
                              Chọn danh mục phụ
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu,
                              }}
                              classes={{
                                select: classes.select,
                              }}
                              value=""
                              onChange={'dasasdasd'}
                              inputProps={{
                                name: 'simpleSelect',
                                id: 'simple-select',
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                              >
                                Chọn danh mục phụ
                              </MenuItem>
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected,
                                }}
                                value="2"
                              >
                                Paris
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Mô tả khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="description"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              placeholder: 'Mô tả bằng 10-20 từ',
                            }}
                            helpText="Mô tả sơ lược về khoá học."
                          />
                        </ItemGrid>
                      </GridContainer>
                      <br />
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Thông tin chi tiết
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <Editor
                            id="detailDescription"
                            placeholder={'Mô tả chi tiết khoá học của bạn...'}
                            value={course.detailDescription}
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <br />
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Giá tiền
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CurrencyTextField
                            label="Nhập số tiền"
                            value="0"
                            currencySymbol="VND"
                            decimalCharacter="."
                            digitGroupSeparator=","
                            error={moneyisValid}
                            onChange={(e) =>
                              setCourse({ ...state, price: e.target.value })
                            }
                            helperText={
                              moneyisValid &&
                              'Giá tiền thấp nhất của khoá học là 1,000VND'
                            }
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel className={classes.labelHorizontal}>
                            Số chương của khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <CustomInput
                            id="help-text"
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: 'number',
                              defaultValue: course.numberOfChapters,
                              onChange: (e) =>
                                setCourse({
                                  ...course,
                                  numberOfChapters: e.target.value,
                                }),
                            }}
                            helpText=""
                          />
                        </ItemGrid>
                      </GridContainer>
                      <GridContainer>
                        <ItemGrid xs={12} sm={2}>
                          <FormLabel
                            className={
                              classes.labelHorizontal +
                              ' ' +
                              classes.labelHorizontalRadioCheckbox
                            }
                          >
                            Trạng thái khoá học
                          </FormLabel>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={10}>
                          <div className={classes.inlineChecks}>
                            <div className={classes.checkboxAndRadioHorizontal}>
                              <FormControlLabel
                                control={
                                  <Radio
                                    tabIndex={-1}
                                    checked={state.selectedValue === 'a'}
                                    onChange={statusChange}
                                    value="a"
                                    name="radio button demo"
                                    aria-label="A"
                                    icon={
                                      <FiberManualRecord
                                        className={classes.radioUnchecked}
                                      />
                                    }
                                    checkedIcon={
                                      <FiberManualRecord
                                        className={classes.radioChecked}
                                      />
                                    }
                                    classes={{
                                      checked: classes.radio,
                                    }}
                                  />
                                }
                                classes={{
                                  label: classes.label,
                                }}
                                label="Hoàn thành"
                              />
                              <FormControlLabel
                                control={
                                  <Radio
                                    tabIndex={-1}
                                    checked={state.selectedValue === 'b'}
                                    onChange={statusChange}
                                    value="b"
                                    name="radio button demo"
                                    aria-label="B"
                                    icon={
                                      <FiberManualRecord
                                        className={classes.radioUnchecked}
                                      />
                                    }
                                    checkedIcon={
                                      <FiberManualRecord
                                        className={classes.radioChecked}
                                      />
                                    }
                                    classes={{
                                      checked: classes.radio,
                                    }}
                                  />
                                }
                                classes={{
                                  label: classes.label,
                                }}
                                label="Chưa hoàn thành"
                              />
                            </div>
                          </div>
                        </ItemGrid>
                      </GridContainer>
                    </form>
                  ),
                },
                {
                  tabButton: 'Chương khoá học',
                  tabContent: (
                    <form>
                      <Accordion
                        active={0}
                        collapses={
                          loadChapters()
                          // coursevid.chapters.map((item, index) => ({
                          //   title: `Chương #1`,
                          //   content: 'rarsfsdfsdf',
                          // })),
                          // {
                          //   title: 'Collapsible group Item #1',
                          //   content:
                          //     'Anim pariatur cliche reprehenderit, enim eiusmod hi',
                          // },
                        }
                      />
                    </form>
                  ),
                },
              ]}
            />
          }
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={12}></ItemGrid>
    </GridContainer>
  );
}

export default withStyles(regularFormsStyle)(AddCourse);
