import JSZip from 'jszip';

export const checkHasHtmlFile = (zipContents: JSZip) => {
  // HTML 파일과 이미지 찾기
  let hasHtmlFile = false;

  for (const [filename] of Object.entries(zipContents.files)) {
    if (filename.endsWith('.html')) {
      hasHtmlFile = true;
      break;
    }
  }
  return hasHtmlFile;
};
