import React, { useState } from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';

// material-ui-icons
import AirplayIcon from 'material-ui-icons/Airplay';
import Dvr from 'material-ui-icons/Dvr';
import Close from 'material-ui-icons/Close';
import EditIcon from 'material-ui-icons/Edit';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import IconButton from '@cmscomponents/CustomButtons/IconButton.jsx';

import Button from '@cmscomponents/CustomButtons/Button.jsx';
import SubdirectoryArrowRightIcon from 'material-ui-icons/SubdirectoryArrowRight';
import { subCategoryTables } from '@cmsvariables/general.jsx';
import { useHistory } from 'react-router-dom';
export default function SubCategoryTables(props) {
  const history = useHistory();
  const listTables = (subCategoryTables) => {
    let list = [];

    for (let j = 0; j < subCategoryTables.length; j++) {
      list.push({
        title: subCategoryTables[j].title,
        data: subCategoryTables[j].dataRows.map((prop, key) => {
          return {
            r_id: key,
            stt: prop[0],
            id: prop[1],
            name: prop[2],
            eng: prop[3],
            parent: prop[4],
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                <IconButton
                  onClick={() => {
                    let obj = state.data[j].data.find((o) => o.r_id === key);

                    history.push({
                      pathname: '/manager/forms/category-form',
                      state: {
                        sub: {
                          id: obj.id,
                          name: obj.name,
                          eng: obj.eng,
                          parent: +obj.parent,
                        },
                        main: false,
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
                    let obj = state.data[j].data.find((o) => o.r_id === key);
                    history.push({
                      pathname: '/manager/courses',
                      state: {
                        maincat: obj.parent,
                        subcat: obj.id,
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
                    var data = state.data[j].data;
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
                    //check
                    setState({ data: [...state.data] });
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
      });
    }
    return list;
  };
  const [state, setState] = useState({
    data: listTables(subCategoryTables),
  });

  return (
    <GridContainer>
      {console.log(state.data)}
      {state.data.map((item) => (
        <ItemGrid xs={12}>
          <IconCard
            icon={AirplayIcon}
            title={item.title}
            content={
              <div>
                <GridContainer justify="flex-end">
                  <ItemGrid>
                    <Button
                      color="primary"
                      onClick={() => {
                        history.push('/manager/forms/category-form');
                      }}
                    >
                      <SubdirectoryArrowRightIcon />
                      Thêm danh mục
                    </Button>
                  </ItemGrid>
                </GridContainer>
                <GridContainer>
                  <ItemGrid xs={12}>
                    <ReactTable
                      data={item.data}
                      filterable
                      columns={[
                        {
                          Header: 'STT',
                          accessor: 'stt',
                        },
                        {
                          Header: 'ID',
                          accessor: 'id',
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
                          accessor: 'parent',
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
      ))}
    </GridContainer>
  );
}
