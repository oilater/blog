import { Rally, Timeline } from '@repo/interaction';

export function playIntroduceAnimation() {
  const infoSectionTimeline = Timeline({
    playback: 'stagger',
    staggerDelay: 0.2,
    playables: [
      Rally({
        target: '.info-1',
        playCount: 1,
        motions: [
          {
            duration: 0.4,
            ease: 'power2.out',
            opacity: { from: 0 },
            translateY: { from: '15%' },
          },
        ],
      }),
      Rally({
        target: '.info-2',
        playCount: 1,
        motions: [
          {
            duration: 0.4,
            ease: 'power2.out',
            opacity: { from: 0 },
            translateY: { from: '15%' },
          },
        ],
      }),
      Rally({
        target: '.info-3',
        playCount: 1,
        motions: [
          {
            duration: 0.4,
            ease: 'power2.out',
            opacity: { from: 0 },
            translateY: { from: '15%' },
          },
        ],
      }),
    ],
  });

  return infoSectionTimeline;
}
