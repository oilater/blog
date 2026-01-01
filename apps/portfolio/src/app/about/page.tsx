import * as styles from './style.css';

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>About Me</h1>
        <p className={styles.subtitle}>
          생각을 표현하는 것을 좋아하고, 성장 욕구가 높은 개발자
        </p>
      </div>

      <div className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎹 재즈에 입문하다</h2>
          <div>
            <p className={styles.paragraph}>
              저는 실용 음악을 전공하진 않았지만, 재즈를 좋아하고 잘
              하고 싶었습니다. '도 미 솔' 같은 기본적인 3화음 코드밖에
              모르는 상태에서 알바를 하면서 재즈 레슨을 받았습니다.
              무언가를 열심히 해본 경험이 있냐고 묻는 질문에 당당히
              대답할 수 있을 정도로 열심히 노력했던 것 같습니다.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            📈 성장은 우상향일까
          </h2>
          <div>
            <p className={styles.paragraph}>
              이렇게 약 2년이 흘렀고, 성장에 대한 나름의 인사이트를
              얻을 수 있었습니다.
            </p>
            <p className={styles.paragraph}>
              성장은 계단식이라는 점이었습니다. 처음에는 우상향 곡선을
              그리며 실력이 늘 줄 알았지만, 아무리 연습해도 그대로인
              것 같은 느낌이 들 때가 대부분이었습니다. 잘 치는
              피아니스트들을 애매하게 따라하다보면 결국 의미 없는
              솔로가 되어버렸고, 반복하다보면 어느새 연습의 방향성을
              잃어버렸습니다.
            </p>
            <p className={styles.paragraph}>
              어느 날,{' '}
              <i>'성공의 단계에 이르는 빌 에반스의 연습 방법'</i>
              이라는 빌 에반스의 인터뷰 영상을 보게 되었습니다.
            </p>
            <div className={styles.quote}>
              <p className={styles.quoteText}>
                "매 단계마다 이루어야 하는, 가장 기본적인 것들을
                정확하게 수행해야 해. 자신이 어느 단계에 있는 줄 알고
                진실되고, 현실적으로 수행해야 해. 성장을 어려워 하는
                사람들은 작은 부분을 현실적으로 해결하려는 대신,
                하나로 뭉뚱그려서 커다란 문제로 보려고만 해. 작은
                것부터 해결하는 과정에서 성장의 즐거움을 느낄 수
                있어."
              </p>
              <p className={styles.quoteAuthor}>- 빌 에반스</p>
            </div>
            <p className={styles.paragraph}>
              이후에는 부족한 기본기에 집중해서 10분 간격으로 스케일,
              코드 진행, 하농 등을 번갈아가며 매일 한 시간이 넘는
              기본기 연습을 마친 뒤에야 본격적인 연습을 시작했고,
              실력이 성장하는 즐거움을 여러 번 경험할 수 있었습니다.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🎺 합주 경험</h2>
          <div>
            <p className={styles.paragraph}>
              서울 삼성동의 한 와인 바에서 피아노 연주 일을 하게
              되었습니다. 가르쳐주는 것을 좋아해서 숨고에서 개인
              레슨을 하기도 하고, 실용음악 전공자들과 재즈 트리오를
              하면서 합주 경험을 쌓았습니다. 개발을 시작한 이후로는
              이렇게 집에서 가끔씩 취미로 치고 있습니다.
            </p>
          </div>
          <div className={styles.videoContainer}>
            <div className={styles.video}>
              <video
                className={styles.videoElement}
                controls
                playsInline
                preload="metadata"
              >
                <track
                  kind="captions"
                  src="/"
                  srcLang="ko"
                  label="track"
                  default
                />
                <source src="/videos/jazz.webm" type="video/webm" />
                <source src="/videos/jazz.mp4" type="video/mp4" />
                <p>비디오를 재생할 수 없습니다.</p>
              </video>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            👨🏼‍💻 성장하는 개발자
          </h2>
          <div>
            <p className={styles.paragraph}>
              제품을 성장시키며, 함께 일하기 좋은 개발자가 되는 것이
              저의 목표입니다.
            </p>
            <p className={styles.paragraph}>
              저는 항상 스스로 ‘왜?’라는 질문을 던지며, 납득할 만한
              이유가 있는 코드를 작성하고자 노력합니다. 서비스의
              첫인상이라 할 수 있는 UX/UI를 중요하게 생각하며,
              최근에는 유지보수성이 높은 코드를 만드는 것에 관심을
              가지고 꾸준히 학습하고 있습니다.
            </p>
            <p className={styles.paragraph}>
              긴 글 읽어주셔서 감사합니다!
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
