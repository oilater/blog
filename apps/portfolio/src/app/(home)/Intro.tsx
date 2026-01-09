import {
  baseTitle,
  titleOrigin,
  titleSection,
  wrapper,
} from './Intro.css';

export function Intro() {
  return (
    <div className={wrapper}>
      <div className={titleSection}>
        <h1 className={`${baseTitle} ${titleOrigin}`}>
          안녕하세요,
          <br />
          프론트엔드 개발자
          <br />
          <span className="subTitle">김성현</span>입니다.
        </h1>
      </div>
    </div>
  );
}
