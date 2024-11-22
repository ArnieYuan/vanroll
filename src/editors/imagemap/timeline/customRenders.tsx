import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor';
import React, { FC } from 'react';

export interface CustomTimelineAction extends TimelineAction {
  data: {
    src?: string;
    name: string;
    animeParams?: anime.AnimeParams;
  };
}

export interface CustomTimelineRow extends TimelineRow {
  actions: CustomTimelineAction[];
}

export const CustomRender0: FC<{ action: CustomTimelineAction; row: CustomTimelineRow }> = ({ action, row }) => {
  return (
    <div className={'effect0'}>
      <div className={`effect0-text`}>{`播放音频: ${action.data.name}`}</div>
    </div>
  );
};

export const CustomRender1: FC<{ action: CustomTimelineAction; row: CustomTimelineRow }> = ({ action, row }) => {
  return (
    <div className={'effect1'}>
      <div className={`effect1-text`}>{`播放动画: ${action.data.name}`}</div>
    </div>
  );
};