import React, {useEffect, useState} from 'react'
import {useRouter} from "next/router";
import useSWRInfinite from "swr/infinite";
import fetcher from "../../../utils/fetcher";
import {Box, CircularProgress} from "@mui/material";
import ErrorResult from "../../base/ErrorResult";


const PAGE_SIZE = 5;
const PostList = () => {
  const router = useRouter()
  const { category_id } = router.query;
  const [queryParams, setQueryParams] = useState('')

  useEffect(() => {
    if (category_id) {
      setQueryParams(`&category_id=${category_id}`)
    } else {
      setQueryParams('')
    }
  }, [category_id])




  const {data, error, mutate, size, setSize, isValidating} =
    useSWRInfinite((index) => `/api/post/list?page=${index}${queryParams}`, fetcher)



  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore = isLoadingInitialData || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (!isLoadingMore && !isReachingEnd) {
          setSize(size + 1);
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };

  }, [isReachingEnd, isLoadingMore, size]);


  if (!data) return(
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  )

  return(
    <>
      <Box sx={{marginTop: 2}}>
        {data && data[0] && (
          <>
            {posts.map(v => (
              <div key={v.id} style={{width:'100%', height:"500px", border: '1px solid #ccc'}}>{v.title}</div>
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default PostList