import React from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';

// material-ui-icons
import Assignment from 'material-ui-icons/Assignment';
import Dvr from 'material-ui-icons/Dvr';
import Close from 'material-ui-icons/Close';
import AddBoxIcon from 'material-ui-icons/AddBox';
import EditIcon from 'material-ui-icons/Edit';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import IconButton from '@cmscomponents/CustomButtons/IconButton.jsx';
import Button from '@cmscomponents/CustomButtons/Button.jsx';
import { mainCategoryTable } from '@cmsvariables/general.jsx';
class MainCategoryTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: mainCategoryTable.dataRows.map((prop, key) => {
        return {
          r_id: key,
          stt: prop[0],
          id: prop[1],
          name: prop[2],
          eng: prop[3],
          code: prop[4],
          actions: (
            // we've added some custom button actions
            <div className="actions-right">
              {/* use this button to add a like kind of action */}
              <IconButton
                onClick={() => {
                  let obj = this.state.data.find((o) => o.r_id === key);

                  this.props.history.push({
                    pathname: '/manager/forms/category-form/',
                    state: {
                      main: {
                        id: obj.id,
                        name: obj.name,
                        eng: obj.eng,
                        code: obj.code,
                      },
                      sub: false,
                    },
                  });
                }}
                color="infoNoBackground"
                customClass="like"
              >
                <EditIcon />
              </IconButton>{' '}
              {/* use this button to add a edit kind of action */}
              <IconButton
                onClick={() => {
                  let obj = this.state.data.find((o) => o.r_id === key);
                  this.props.history.push({
                    pathname: '/manager/courses',
                    state: {
                      maincat: obj.id,
                      subcat: '',
                    },
                  });
                }}
                color="warningNoBackground"
                customClass="edit"
              >
                <Dvr />
              </IconButton>{' '}
              {/* use this button to remove the data row */}
              <IconButton
                onClick={() => {
                  var data = this.state.data;
                  data.find((o, i) => {
                    if (o.r_id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      data.splice(i, 1);
                      console.log(data);
                      return true;
                    }
                    return false;
                  });
                  this.setState({ data: data });
                }}
                color="dangerNoBackground"
                customClass="remove"
              >
                <Close />
              </IconButton>{' '}
            </div>
          ),
        };
      }),
    };
  }
  render() {
    return (
      <GridContainer>
        <ItemGrid xs={12}>
          <IconCard
            icon={Assignment}
            title="Bảng danh mục chính"
            content={
              <div>
                <GridContainer justify="flex-end">
                  <ItemGrid>
                    <Button
                      color="primary"
                      onClick={() =>
                        this.props.history.push('/manager/forms/category-form')
                      }
                    >
                      <AddBoxIcon />
                      Thêm danh mục
                    </Button>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12}>
                    <ReactTable
                      data={this.state.data}
                      filterable
                      columns={[
                        {
                          Header: 'STT',
                          accessor: 'stt',
                        },
                        {
                          Header: 'ID',
                          accessor: `id`,
                        },
                        {
                          Header: 'Tên danh mục',
                          accessor: 'name',
                        },
                        {
                          Header: 'Tên tiếng anh',
                          accessor: 'eng',
                        },
                        {
                          Header: 'Mã danh mục',
                          accessor: 'code',
                        },
                        {
                          Header: 'Hành động',
                          accessor: 'actions',
                          sortable: false,
                          filterable: false,
                        },
                      ]}
                      defaultPageSize={10}
                      showPaginationTop
                      showPaginationBottom={false}
                      className="-striped -highlight"
                    />
                  </ItemGrid>
                </GridContainer>
              </div>
            }
          />
        </ItemGrid>
        )
      </GridContainer>
    );
  }
}

export default MainCategoryTables;
