import React from 'react'
import useSWR from "swr";
import fetcher from "../../../utils/fetcher";

const ListTable = () => {
  // 카테고리 리스트 가져오기
  const {
    data: categoryListData,
    error: categoryListError,
    mutate: categoryListMutate
  } = useSWR('/api/category/list', fetcher, { suspense: true })


  return(
    <>
      <div>
        dfds
      </div>
    </>
  )
}

export default ListTable