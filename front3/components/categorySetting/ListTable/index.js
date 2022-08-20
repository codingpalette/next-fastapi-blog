import React, {useState} from 'react'
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";
import {Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AlertBox from "../../base/AlertBox";
import {category_get} from "../../../apis/category";
import {useRecoilState} from "recoil";
import {singleCategory} from "../../../stores/categoryState";

const ListTable = ({selected, setSelected, editeModalOpen}) => {
  // 카테고리 상세 데이터 값
  const [useSingleCategory, setUseSingleCategory] = useRecoilState(singleCategory)

  // 카테고리 리스트 가져오기
  const {
    data: categoryListData,
    error: categoryListError,
    mutate: categoryListMutate
  } = useSWR('/api/category/list', fetcher, { suspense: true })

  // 리스트 클릭 이벤트
  const listClick = async (event, id) => {
    event.stopPropagation()
    const res = await category_get(id)
    if (res.data.result === "fail") {
      alertOpen('error', res.data.message)
      return
    } else {
      setUseSingleCategory(res.data.data)
      editeModalOpen()
    }
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

  // 경고창 상태 값
  const [alertActive, setAlertActive] = useState(false)
  // 경고창 텍스트
  const [alertText, setAlertText] = useState('')
  // 경고창 종류
  const [alertType, setAlertType] = useState('success')
  // 경고창 열기 이벤트
  const alertOpen = (type, text) => {
    setAlertType(type)
    setAlertText(text)
    setAlertActive(true)
  }
  // 경고창 닫기 이벤트
  const alertClose = () => {
    setAlertActive(false)
  }

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
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
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

      <AlertBox alertActive={alertActive} alertClose={alertClose} alertText={alertText} alertType={alertType} />
    </>
  )
}

export default ListTable