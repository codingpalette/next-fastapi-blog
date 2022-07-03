import React from 'react'
import Button from "../../base/Button";
import Link from "next/link";

const PostHeader = () => {
  return(
    <>
      <div className="flex justify-end">
        <Link href="post/write">
          <a>
            <Button>포스트 작성</Button>
          </a>
        </Link>
      </div>
    </>
  )
}

export default PostHeader