import React from 'react';
import { Editor } from '@toast-ui/react-editor';

import tableMergedCell from '@toast-ui/editor-plugin-table-merged-cell';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';


const WrappedEditor = (props: any) => {
  const { forwardedRef } = props;

  // 3. Pass down forwardRef to Editor(the real component that needs)
  // return <Editor {...props} ref={forwardedRef} theme="dark" usageStatistics={false} plugins={[[colorSyntax, props.colorSyntaxOptions], tableMergedCell]} />;
  // eslint-disable-next-line react/destructuring-assignment
  // return <Editor {...props} ref={forwardedRef} theme="dark" usageStatistics={false} plugins={[[colorSyntax]]} />;
  return <Editor {...props} ref={forwardedRef} usageStatistics={false} plugins={[[colorSyntax]]} />;
};

export default WrappedEditor;