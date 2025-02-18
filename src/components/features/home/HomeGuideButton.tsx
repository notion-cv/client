'use client';

import GuideDrawerContainer from '../common/GuideDrawerContainer';

const HOME_GUIDE_ID = 'home-guide';
export default function HomeGuideButton() {
  return (
    <GuideDrawerContainer drawerId={HOME_GUIDE_ID}>
      <label
        htmlFor={HOME_GUIDE_ID}
        className="drawer-button btn btn-ghost btn-md bg-transparen text-primary hover:border-transparent hover:bg-blue-50"
      >
        사용가이드 보기
      </label>
    </GuideDrawerContainer>
  );
}
