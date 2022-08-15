import React, {useState} from 'react'
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const ListTable = () => {
  // 카테고리 리스트 가져오기
  const {
    data: categoryListData,
    error: categoryListError,
    mutate: categoryListMutate
  } = useSWR('/api/category/list', fetcher, { suspense: true })

  // 체크박스 리스트 값
  const [selected, setSelected] = useState([]);

  // 리스트 클릭 이벤트
  const listClick = (event, id) => {
    console.log('event', event)
  }

  // 체크 박스 클릭 이벤트
  const checkClick = (event, id) => {
    event.stopPropagation()
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }

  // 체크박스 전체 클릭 이벤트
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = categoryListData.map((v) => v.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };


  return(
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={categoryListData.length > 0 && selected.length === categoryListData.length}
                  onChange={onSelectAllClick}
                  // onChange={onSelectAllClick}
                  // checked={isItemSelected}
                  // onClick={(event) => checkClick(event, v.id)}
                />
              </TableCell>
              <TableCell align="center">카테고리</TableCell>
              <TableCell align="center">순서</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryListData.map(v => {

              return(
                <TableRow
                  key={v.id}
                  hover
                  onClick={(event) => listClick(event, v.id)}
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selected.indexOf(v.id) !== -1}
                      onClick={(event) => checkClick(event, v.id)}
                    />
                  </TableCell>
                  <TableCell scope="row" align="center">{v.category}</TableCell>
                  <TableCell scope="row" align="center">{v.seq}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ListTable