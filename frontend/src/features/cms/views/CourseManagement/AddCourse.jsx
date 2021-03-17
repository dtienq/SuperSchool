import React, { useState, useEffect } from 'react';

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

//APIS
import categoryApi from '@api/categoryApi';

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
import Button from '@cmscomponents/CustomButtons/Button.jsx';
function AddCourse(props) {
  const [state, setState] = useState({
    checked: [24, 22],
    selectedValue: null,
    selectedEnabled: 'b',
    createCourse: false,
    editCourse: false,
    category: '',
    subcategory: '',
    listcategory: [],
    listsubcategory: [],
  });
  const [course, setCourse] = useState({
    title: '',
    imagePath: '',
    description: '',
    detailDescription: '',
    price: 0,
    status: '',
    categoryid: '',
    teacherid: '',
    numberOfChapters: 5,
  });
  const [coursevid, setCoursevid] = useState({
    couseid: false,
    chapters: [],
  });
  let moneyisValid = course.price < 1000;
  useEffect(() => {
    let chapters = [];
    for (let i = 0; i < course.numberOfChapters; i++) {
      let chapter = {
        orderno: i + 1,
        title: '',
        filename: '',
      };
      chapters.push(chapter);
    }
    setCoursevid({ ...coursevid, chapters: chapters });
  }, [course.numberOfChapters]);
  useEffect(() => {
    setTimeout(async () => {
      try {
        const fetch_maincat = await categoryApi.getMain();
        let fetch_subcat = [];
        if (state.category !== '' && state.subcategory !== '') {
          fetch_subcat = await categoryApi.getSubCategoryByParentId(
            state.category
          );
        }
        setState({
          ...state,
          listcategory: fetch_maincat.data,
          listsubcategory: state.subcategory !== '' ? fetch_subcat.data : [],
        });
      } catch (err) {
        alert(err.message);
      }
    }, 200);
  }, []);
  const handleCategorySelect = async (event) => {
    const subdata = await categoryApi.getSubCategoryByParentId(
      event.target.value
    );
    setState({
      ...state,
      listsubcategory: subdata.data,
      subcategory: '',
      category: event.target.value,
    });
  };
  const handleSubCategorySelect = (event) => {
    setState({ ...state, subcategory: event.target.value });
    setCourse({ ...course, categoryid: +event.target.value });
  };
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
  const detailhandleChange = (e) => {
    setCourse({ ...course, detailDescription: e.target.value });
  };
  const videohandleClick = () => {
    var input = document.createElement('input');
    input.type = 'file';
    input.onchange = handleFileChange;
    input.click();
  };

  const statusChange = function (event) {
    setState({ ...state, selectedValue: event.target.value });
    setCourse({
      ...course,
      status: event.target.value === 'a' ? 'COMPLETE' : 'INCOMPLETE',
    });
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
    coursevid.chapters.forEach((item) => {
      chaparr.push({
        title: `Chương #${item.orderno}`,
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
                    defaultValue: item.title,
                  }}
                />
              </ItemGrid>
            </GridContainer>
            <GridContainer>
              <ItemGrid xs={12} sm={2}>
                <FormLabel className={classes.labelHorizontal}>
                  Đường dẫn video
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
          </ItemGrid>
        ),
      });
    });
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
                            Hình ảnh
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
                                setCourse({
                                  ...course,
                                  imagePath: e.target.value,
                                });
                              },
                            }}
                            helpText="Upload hình ảnh bên dưới và đặt đường dẫn ở đây"
                          />
                        </ItemGrid>
                      </GridContainer>
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
                              htmlFor="category-select"
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
                              value={state.category}
                              onChange={handleCategorySelect}
                              inputProps={{
                                name: 'categorySelect',
                                id: 'category-select',
                              }}
                            >
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                                value=""
                              >
                                Tất cả
                              </MenuItem>
                              {state.listcategory.map((prop) =>
                                +prop.categoryid === state.category ? (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value={+prop.categoryid}
                                    selected={true}
                                  >
                                    {prop.name}
                                  </MenuItem>
                                ) : (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value={+prop.categoryid}
                                  >
                                    {prop.name}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </ItemGrid>
                        <ItemGrid xs={12} sm={5}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="subcategory-select"
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
                              value={state.subcategory}
                              onChange={handleSubCategorySelect}
                              inputProps={{
                                name: 'subcategorySelect',
                                id: 'subcategory-select',
                              }}
                            >
                              <MenuItem
                                classes={{
                                  root: classes.selectMenuItem,
                                }}
                                value=""
                              >
                                Tất cả
                              </MenuItem>
                              {state.listsubcategory.map((prop) =>
                                +prop.categoryid === state.subcategory ? (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    selected={true}
                                    value={+prop.categoryid}
                                  >
                                    {prop.name}
                                  </MenuItem>
                                ) : (
                                  <MenuItem
                                    classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected,
                                    }}
                                    value={prop.categoryid}
                                  >
                                    {prop.name}
                                  </MenuItem>
                                )
                              )}
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
                              onChange: (e) => {
                                setCourse({
                                  ...course,
                                  description: e.target.value,
                                });
                              },
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
                            onChange={(value) =>
                              setCourse({
                                ...course,
                                detailDescription: value,
                              })
                            }
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
                {
                  tabButton: 'Xác nhận',
                  tabContent: (
                    <div>
                      <ItemGrid xs={12} sm={12} md={4}>
                        <Button color="rose" center>
                          Đăng ký khoá học
                        </Button>
                      </ItemGrid>
                    </div>
                  ),
                },
              ]}
            />
          }
        />
      </ItemGrid>
      <ItemGrid xs={12} sm={12} md={12}>
        <HeaderCard
          cardTitle="Upload File"
          headerColor="rose"
          content={
            <form>
              <GridContainer>
                <ItemGrid xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Đường dẫn
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
                    }}
                    helpText="Đường dẫn sẽ hiển thị khi bạn upload file thành công."
                  />
                </ItemGrid>
              </GridContainer>
              <GridContainer>
                <ItemGrid xs={12} sm={2}></ItemGrid>
                <ItemGrid xs={12} sm={10}>
                  <input type="file"></input>
                </ItemGrid>
              </GridContainer>
            </form>
          }
        />
      </ItemGrid>
    </GridContainer>
  );
}

export default withStyles(regularFormsStyle)(AddCourse);
