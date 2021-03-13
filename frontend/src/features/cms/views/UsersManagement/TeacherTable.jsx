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

import { adminTable } from '@cmsvariables/general.jsx';

export default function TeacherTable(props) {
  const createTable = (adminTable) => {
    return adminTable.dataRows.map((prop, key) => {
      return {
        r_id: key,
        //stt: prop[0],
        id: prop[1],
        email: prop[2],
        fullname: prop[3],
        sdt: prop[4],
        dob: prop[5],
        reg: prop[6],
        actions: (
          // we've added some custom button actions
          <div className="actions-right">
            {/* use this button to add a like kind of action */}
            <IconButton
              onClick={() => {
                let obj = state.data.find((o) => o.r_id === key);
                alert(
                  "You've clicked LIKE button on \n{ \nName: " +
                    obj.id +
                    ', \name: ' +
                    obj.name +
                    ', \ncode: ' +
                    obj.reg +
                    '\n}.'
                );
              }}
              color="infoNoBackground"
              customClass="like"
            >
              <EditIcon />
            </IconButton>{' '}
            {/* use this button to add a edit kind of action */}
            <IconButton
              onClick={() => {
                let obj = state.data.find((o) => o.r_id === key);
                alert(
                  "You've clicked EDIT button on \n{ \nName: " +
                    obj.id +
                    ', \nname: ' +
                    obj.name +
                    ', \ncode: ' +
                    obj.reg +
                    '\n}.'
                );
              }}
              color="warningNoBackground"
              customClass="edit"
            >
              <Dvr />
            </IconButton>{' '}
            {/* use this button to remove the data row */}
            <IconButton
              onClick={() => {
                var data = state.data;
                data.find((o, i) => {
                  if (o.r_id === key) {
                    // here you should add some custom code so you can delete the data
                    // from this component and from your server as well
                    data.splice(i, 1);
                    return true;
                  }
                  return false;
                });
                //check
                setState({ data: state.data });
              }}
              color="dangerNoBackground"
              customClass="remove"
            >
              <Close />
            </IconButton>{' '}
          </div>
        ),
      };
    });
  };
  const [state, setState] = useState({
    title: adminTable.title,
    data: createTable(adminTable),
  });

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
                    data={state.data}
                    filterable
                    columns={[
                      // {
                      //   Header: 'STT',
                      //   accessor: 'stt',
                      // },
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
                        Header: 'Số điện thoại',
                        accessor: 'sdt',
                      },
                      // {
                      //   Header: 'Ngày sinh',
                      //   accessor: 'dob',
                      // },
                      {
                        Header: 'Ngày đăng ký',
                        accessor: 'reg',
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
    </GridContainer>
  );
}
