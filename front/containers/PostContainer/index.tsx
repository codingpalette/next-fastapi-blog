import React from 'react'
import {ContentBox} from "./styles";


interface PostContainerProps {
  children: React.ReactNode;
};


const PostContainer = ({children}: PostContainerProps) => {
  return(
    <>
      <ContentBox className="w-full">
        {children}
      </ContentBox>
    </>
  )
}

export default PostContainer