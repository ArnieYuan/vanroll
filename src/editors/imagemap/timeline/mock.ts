import { TimelineEffect } from '@xzdarcy/react-timeline-editor';
import audioControl from './audioControl';
import lottieControl from './lottieControl';
import animeControl from './animeControl';
import { CustomTimelineRow } from './customRenders';

export const scaleWidth = 160;
export const scale = 5;
export const startLeft = 20;

export const mockEffect: Record<string, TimelineEffect> = {
  effect0: {
    id: 'effect0',
    name: '播放音效',
    source: audioControl,
  },
  effect1: {
    id: 'effect1',
    name: '播放动画',
    source: lottieControl,
  },
  effect2: {
    id: 'effect2',
    name: '播放动画',
    source: animeControl,
  }
};

export const mockData: CustomTimelineRow[] = [
  {
    id: '0',
    actions: [
      {
        id: 'action0',
        start: 9.5,
        end: 16,
        effectId: 'effect1',
        data: {
          src: '/lottie/lottie1/data.json',
          name: '点赞',
        },
      },
    ],
  },
  {
    id: '1',
    actions: [
      {
        id: 'action1',
        start: 5,
        end: 9.5,
        effectId: 'effect1',
        data: {
          src: '/lottie/lottie2/data.json',
          name: '工作',
        },
      },
    ],
  },
  {
    id: '2',
    actions: [
      {
        id: 'action2',
        start: 0,
        end: 5,
        effectId: 'effect1',
        data: {
          src: '/lottie/lottie3/data.json',
          name: '奶牛',
        },
      },
    ],
  },
  {
    id: '3',
    actions: [
      {
        id: 'action3',
        start: 0,
        end: 20,
        effectId: 'effect0',
        data: {
          src: '/audio/bg.mp3',
          name: '背景音乐',
        },
      },
    ],
  },
];