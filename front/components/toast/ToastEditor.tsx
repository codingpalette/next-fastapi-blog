import React, { useState, forwardRef, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./WrappedEditor'), { ssr: false });
// 2. Pass down to child components using forwardRef
const EditorWithForwardedRef = React.forwardRef((props, ref) => <Editor {...props} forwardedRef={ref} />);
EditorWithForwardedRef.displayName = "EditorWithForwardedRef";

const ToastEditor = (props: any) => {
  const { heightMin, onChange, editorRef, content } = props;

  return (
    // 1. Pass down ref
    <EditorWithForwardedRef
      {...props}
      placeholder="내용을 작성해 주세요."
      previewStyle="vertical"
      setMinHeight={heightMin || 250}
      height="600px"
      initialEditType="wysiwyg"
      initialValue={content}
      // useCommandShortcut
      ref={editorRef}
      hideModeSwitch
      // hooks={{
      //   addImageBlobHook: async (blob, callback) => {
      //     await uploadImage(blob, callback);
      //     // console.log(uploadedImageURL);
      //     // callback(uploadedImageURL, 'alt text');
      //     return false;
      //   },
      // }}
    />
  );
}

export default ToastEditor