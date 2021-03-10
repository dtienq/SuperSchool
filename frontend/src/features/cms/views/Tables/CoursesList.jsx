<<<<<<< HEAD
/* eslint-disable */
=======
>>>>>>> master
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

// material-ui components
import withStyles from 'material-ui/styles/withStyles';
import Tooltip from 'material-ui/Tooltip';
import Select from 'material-ui/Select';
import MenuItem from 'material-ui/Menu/MenuItem';
import InputLabel from 'material-ui/Input/InputLabel';
import FormControl from 'material-ui/Form/FormControl';
// material-ui-icons
import Refresh from 'material-ui-icons/Refresh';
import Edit from 'material-ui-icons/Edit';
import ArtTrack from 'material-ui-icons/ArtTrack';
import UpdateIcon from 'material-ui-icons/Update';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import HeaderCard from '@cmscomponents/Cards/HeaderCard.jsx';
import ImagePriceCard from '@cmscomponents/Cards/ImagePriceCard.jsx';
import CustomInput from '@cmscomponents/CustomInput/CustomInput.jsx';
import InputAdornment from 'material-ui/Input/InputAdornment';

import SearchIcon from 'material-ui-icons/Search';
import dashboardStyle from '@cmsassets/jss/material-dashboard-pro-react/views/dashboardStyle';

function CoursesList(props) {
  let location = useLocation();
  console.log(location);
  const [state, setState] = useState({
    category: location.state
      ? location.state.maincat
        ? +location.state.maincat
        : ''
      : '',
    subcategory: location.state
      ? location.state.subcat
        ? +location.state.subcat
        : ''
      : '',
    search: '',
    listcategory: [],
    listsubcategory: [],
    data: [],
  });

  useEffect(() => {
    const fetchData = {
      category: state.category,
      subcategory: state.subcategory,
      listcategory: [
        { id: 1, name: 'Lập trình' },
        { id: 2, name: 'Thiết kế đố hoạ' },
      ],
      listsubcategory: [
        { id: 3, name: 'Lập trình Java' },
        { id: 4, name: 'Lập trình Android' },
      ],
      search: '',
      data: [
        {
          courseid: 1,
          imagePath:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
          title: 'Lập trình Python',
          description:
            'This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3',
          detailDescription: `What you'll learn
              Have a fundamental understanding of the Python programming language.
              Have the skills and understanding of Python to confidently apply for Python programming jobs.
              Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..
              Add the Python Object-Oriented Programming (OOP) skills to your résumé.
              Understand how to create your own Python programs.
              Learn Python from experienced professional software developers.
              Understand both Python 2 and Python 3.`,
          views: '50',
          price: '100000',
          categoryId: 3,
          parentcategoryId: 1,
          teacherId: '4',
          status: 'INCOMPLETE',
          teacherName: 'Damond James',
          updateDate: '26/01/2021',
          promotion: 'FREE',
        },
        {
          courseid: 2,
          imagePath:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
          title: 'Lập trình Java',
          description:
            'This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3',
          detailDescription: `What you'll learn
              Have a fundamental understanding of the Python programming language.
              Have the skills and understanding of Python to confidently apply for Python programming jobs.
              Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..
              Add the Python Object-Oriented Programming (OOP) skills to your résumé.
              Understand how to create your own Python programs.
              Learn Python from experienced professional software developers.
              Understand both Python 2 and Python 3.`,
          views: '50',
          price: '200000',
          categoryId: 4,
          parentcategoryId: 1,
          teacherId: '4',
          status: 'INCOMPLETE',
          teacherName: 'Damond James',
          updateDate: '26/01/2021',
          promotion: 'FREE',
        },
        {
          courseid: 3,
          imagePath:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
          title: 'Thiết kế Powerpoint',
          description:
            'This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3',
          detailDescription: `What you'll learn
              Have a fundamental understanding of the Python programming language.
              Have the skills and understanding of Python to confidently apply for Python programming jobs.
              Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..
              Add the Python Object-Oriented Programming (OOP) skills to your résumé.
              Understand how to create your own Python programs.
              Learn Python from experienced professional software developers.
              Understand both Python 2 and Python 3.`,
          views: '50',
          price: '200000',
          categoryId: 4,
          parentcategoryId: 1,
          teacherId: '4',
          status: 'INCOMPLETE',
          teacherName: 'Damond James',
          updateDate: '26/01/2021',
          promotion: 'FREE',
        },
        {
          courseid: 2,
          imagePath:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',
          title: 'Lập trình Java',
          description:
            'This Python For Beginners Course Teaches You The Python Language Fast. Includes Python Online Training With Python 3',
          detailDescription: `What you'll learn
              Have a fundamental understanding of the Python programming language.
              Have the skills and understanding of Python to confidently apply for Python programming jobs.
              Acquire the pre-requisite Python skills to move into specific branches - Machine Learning, Data Science, etc..
              Add the Python Object-Oriented Programming (OOP) skills to your résumé.
              Understand how to create your own Python programs.
              Learn Python from experienced professional software developers.
              Understand both Python 2 and Python 3.`,
          views: '50',
          price: '200000',
          categoryId: 3,
          parentcategoryId: 1,
          teacherId: '4',
          status: 'INCOMPLETE',
          teacherName: 'Damond James',
          updateDate: '26/01/2021',
          promotion: 'FREE',
        },
      ],
    };
    setState(fetchData);
  }, []);
  const handleCategorySelect = (event) => {
    setState({ ...state, subcategory: '', category: event.target.value });
  };
  const handleSubCategorySelect = (event) => {
    setState({ ...state, subcategory: event.target.value });
  };
  const { classes } = props;
  return (
    <div>
      {console.log(state)}
      <GridContainer>
        <ItemGrid xs={12}>
          <HeaderCard
            cardTitle="Tìm kiếm khoá học"
            headerColor="rose"
            content={
              <div>
                <GridContainer>
                  <ItemGrid xs={12}>
                    <legend>Tìm kiếm theo danh mục</legend>
                  </ItemGrid>
                  <ItemGrid xs={6}>
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
                          prop.id === state.category ? (
                            <MenuItem
                              classes={{
                                root: classes.selectMenuItem,
                                selected: classes.selectMenuItemSelected,
                              }}
                              value={prop.id}
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
                              value={prop.id}
                            >
                              {prop.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={6}>
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
                        {state.listsubcategory.map((prop) => (
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected,
                            }}
                            value={prop.id}
                          >
                            {prop.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <InputLabel></InputLabel>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <legend>Tìm kiếm theo từ khoá</legend>
                  </ItemGrid>
                  <ItemGrid xs={12}>
                    <CustomInput
                      labelText="Nhập từ khoá"
                      id="search"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: 'text',
                        onChange: (e) =>
                          setState({ ...state, search: e.target.value }),
                        endAdornment: (
                          <InputAdornment
                            position="end"
                            className={classes.inputAdornment}
                          >
                            <SearchIcon
                              className={classes.inputAdornmentIcon}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </ItemGrid>
                </GridContainer>
              </div>
            }
          />
        </ItemGrid>
      </GridContainer>
      <br />
      <GridContainer>
        {state.data
          .filter((item) =>
            JSON.stringify(item)
              .toLowerCase()
              .includes(state.search.toLowerCase())
          )
          .map(function (item) {
            if (state.category === '' && state.subcategory === '') {
              return (
                <ItemGrid xs={12} sm={12} md={4}>
                  <ImagePriceCard
                    image={item.imagePath}
                    title={item.title}
                    text={item.description}
                    price={item.status}
                    statIcon={UpdateIcon}
                    statText={`Cập nhật:${item.updateDate}`}
                    hover
                    underImage={
                      <div>
                        <Tooltip
                          id="tooltip-top"
                          title="View"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="defaultNoBackground" justIcon>
                            <ArtTrack className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="successNoBackground" justIcon>
                            <Refresh className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Remove"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="dangerNoBackground" justIcon>
                            <Edit className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                      </div>
                    }
                  />
                </ItemGrid>
              );
            }
            if (
              state.category !== '' &&
              state.category === +item.parentcategoryId &&
              state.subcategory === ''
            ) {
              return (
                <ItemGrid xs={12} sm={12} md={4}>
                  <ImagePriceCard
                    image={item.imagePath}
                    title={item.title}
                    text={item.description}
                    price={item.status}
                    statIcon={UpdateIcon}
                    statText={`Cập nhật:${item.updateDate}`}
                    hover
                    underImage={
                      <div>
                        <Tooltip
                          id="tooltip-top"
                          title="View"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="defaultNoBackground" justIcon>
                            <ArtTrack className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="successNoBackground" justIcon>
                            <Refresh className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Remove"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="dangerNoBackground" justIcon>
                            <Edit className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                      </div>
                    }
                  />
                </ItemGrid>
              );
            } else if (
              state.subcategory !== '' &&
              item.categoryId === state.subcategory
            ) {
              return (
                <ItemGrid xs={12} sm={12} md={4}>
                  <ImagePriceCard
                    image={item.imagePath}
                    title={item.title}
                    text={item.description}
                    price={item.status}
                    statIcon={UpdateIcon}
                    statText={`Cập nhật:${item.updateDate}`}
                    hover
                    underImage={
                      <div>
                        <Tooltip
                          id="tooltip-top"
                          title="View"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="defaultNoBackground" justIcon>
                            <ArtTrack className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Edit"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="successNoBackground" justIcon>
                            <Refresh className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          id="tooltip-top"
                          title="Remove"
                          placement="bottom"
                          classes={{ tooltip: classes.tooltip }}
                        >
                          <Button color="dangerNoBackground" justIcon>
                            <Edit className={classes.underChartIcons} />
                          </Button>
                        </Tooltip>
                      </div>
                    }
                  />
                </ItemGrid>
              );
            }
            return <div></div>;
          })}
      </GridContainer>
    </div>
  );
}

CoursesList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle)(CoursesList);
