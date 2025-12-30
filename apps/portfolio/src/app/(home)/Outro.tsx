import {
  contactContainer,
  contactItem,
  contactLabel,
  contactValue,
  outroSection,
  thankTitle,
  wrapper,
} from './Outro.css';

export function Outro() {
  return (
    <div className={wrapper}>
      <div className={`outroTitle ${thankTitle}`}>
        <p>감사합니다</p>
        <p>더 궁금한 점이 있다면</p>
        <p>편하게 연락주세요</p>
      </div>

      <div className={`outroSection ${outroSection}`}>
        <div className={contactContainer}>
          <div className={contactItem}>
            <span className={contactLabel}>전화번호</span>
            <span className={contactValue}>010-2717-6906</span>
          </div>

          <div className={contactItem}>
            <span className={contactLabel}>이메일</span>
            <span className={contactValue}>oilater@naver.com</span>
          </div>

          <div className={contactItem}>
            <span className={contactLabel}>Linkedin</span>
            <a
              href="https://www.linkedin.com/in/seonghyeonkim"
              target="_blank"
              rel="noopener noreferrer"
              className={contactValue}
            >
              Seonghyeon Kim
            </a>
          </div>
          <div className={contactItem}>
            <span className={contactLabel}>Github</span>
            <a
              href="https://github.com/oilater"
              target="_blank"
              rel="noopener noreferrer"
              className={contactValue}
            >
              @oilater
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
