import { InfoCard } from '#components/InfoCard';
import { IMAGES } from '#constants/images';
import {
  infoSection,
  introduceWrapper,
  mainDescription,
} from './Introduce.css';

export function Introduce() {
  return (
    <div className={introduceWrapper}>
      <div className={mainDescription}>
        <p>사용자 경험을 개선하며</p>
        <p>더 좋은 서비스를 만듭니다.</p>
      </div>

      <div className={infoSection}>
        <InfoCard
          title="Modern Frotend"
          description="Next.js를 중심으로 개발하지만, 특정 프레임워크에 종속되지 않는 브라우저의 동작 원리와 웹 표준을 이해하고 있습니다."
          image={IMAGES.LANGUAGES}
          isHighPriority={true}
        />
        <InfoCard
          title="Performance"
          description="성능 개선의 원리를 바탕으로 다양한 웹 성능 개선 경험을 쌓고 있습니다."
          image={IMAGES.PERFORMANCE}
        />
        <InfoCard
          title="Co-working"
          description="혼자보단 함께 성장하는 것을 좋아합니다."
          image={IMAGES.COMMUNICATION}
        />
      </div>
    </div>
  );
}
