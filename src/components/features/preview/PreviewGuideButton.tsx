'use client';

import GuideDrawerContainer from '../common/GuideDrawerContainer';

const PREVIEW_DRAWER_ID = 'preview-guide';
export default function PreviewGuideButton() {
  return (
    <GuideDrawerContainer drawerId={PREVIEW_DRAWER_ID}>
      <div className="flex justify-center">
        <label htmlFor={PREVIEW_DRAWER_ID} className="drawer-button btn btn-outline btn-sm m-auto">
          사용가이드 보기
        </label>
      </div>
    </GuideDrawerContainer>
  );
}
