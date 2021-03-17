import React, { useState, useEffect, useRef } from 'react';
// react component for creating dynamic tables
import ReactTable from 'react-table';
// material-ui-icons
import AirplayIcon from 'material-ui-icons/Airplay';
import Dvr from 'material-ui-icons/Dvr';
import EditIcon from 'material-ui-icons/Edit';

import LockIcon from 'material-ui-icons/Lock';
import LockOpenIcon from 'material-ui-icons/LockOpen';
// core components
import GridContainer from '@cmscomponents/Grid/GridContainer.jsx';
import ItemGrid from '@cmscomponents/Grid/ItemGrid.jsx';
import IconCard from '@cmscomponents/Cards/IconCard.jsx';
import IconButton from '@cmscomponents/CustomButtons/IconButton.jsx';
import userApi from '@api/userApi.js';
export default function StudentTable() {
  const [state, setState] = useState({
    title: '',
    data: [],
    table: [],
  });
  let changeStatus = useRef(null);
  changeStatus.current = async (id, status) => {
    try {
      await userApi.userToogleStatus(id, status);
      let newdata = await userApi.userGroupTableFill(2);
      setState({
        ...state,
        data: newdata,
        table: createTable(newdata),
      });
      console.log(state);
    } catch (err) {
      alert('Không thể đổi trạng thái tài khoản');
    }
  };
  const createTable = (table) => {
    return table.dataRows.map((prop, key) => {
      return {
        r_id: key,
        id: prop[0],
        email: prop[1],
        fullname: prop[2],
        status: prop[3],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <IconButton
              onClick={() => {
                //alert(prop[0]);
              }}
              color="infoNoBackground"
              customClass="like"
            >
              <EditIcon />
            </IconButton>{' '}
            {/* use this button to add a edit kind of action */}
            <IconButton
              // onClick={() => {
              //   let obj = state.data.find((o) => o.r_id === key);
              //   alert(
              //     "You've clicked EDIT button on \n{ \nName: " +
              //       obj.id +
              //       ', \nname: ' +
              //       obj.name +
              //       ', \ncode: ' +
              //       obj.reg +
              //       '\n}.'
              //   );
              // }}
              color="warningNoBackground"
              customClass="edit"
            >
              <Dvr />
            </IconButton>{' '}
            {/* use this button to remove the data row */}
            {prop[3] === 'Đang hoạt động' && (
              <IconButton
                onClick={async () => {
                  let id = prop[0];
                  await changeStatus.current(id, false);
                  //check
                }}
                color="dangerNoBackground"
                customClass="remove"
              >
                <LockIcon />
              </IconButton>
            )}
            {prop[3] === 'Đã khoá' && (
              <IconButton
                onClick={async () => {
                  let id = prop[0];
                  await changeStatus.current(id, true);
                  //check
                }}
                color="dangerNoBackground"
                customClass="remove"
              >
                <LockOpenIcon />
              </IconButton>
            )}{' '}
          </div>
        ),
      };
    });
  };

  useEffect(function () {
    setTimeout(async function () {
      const resultTable = await userApi.userGroupTableFill(2);
      setState({
        title: resultTable.title,
        data: resultTable,
        table: createTable(resultTable),
      });
    }, 200);
  }, []);

  return (
    <GridContainer>
      <ItemGrid xs={12}>
        <IconCard
          icon={AirplayIcon}
          title={state.title}
          useResizeColumn
          content={
            <div>
              <GridContainer>
                <ItemGrid xs={12}>
                  <ReactTable
                    data={state.table}
                    filterable
                    columns={[
                      {
                        Header: 'ID',
                        accessor: 'id',
                      },
                      {
                        Header: 'Email',
                        accessor: 'email',
                      },
                      {
                        Header: 'Họ tên',
                        accessor: 'fullname',
                      },
                      {
                        Header: 'Trạng thái',
                        accessor: 'status',
                      },
                      {
                        Header: 'Hành động',
                        accessor: 'actions',
                        sortable: false,
                        filterable: false,
                      },
                    ]}
                    defaultPageSize={10}
                    showPaginationTop={false}
                    showPaginationBottom={true}
                    className="-striped -highlight"
                  />
                </ItemGrid>
              </GridContainer>
            </div>
          }
        />
      </ItemGrid>
    </GridContainer>
  );
}
