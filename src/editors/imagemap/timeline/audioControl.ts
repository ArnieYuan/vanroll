import { Howl } from 'howler';
import { TimelineEngine, TimeLineEffectSource } from '@xzdarcy/react-timeline-editor';
import { CustomTimelineAction } from './customRenders';

class AudioControl implements TimeLineEffectSource {
  cacheMap: Record<string, Howl> = {};
  listenerMap: Record<
    string,
    {
      time?: (data: { time: number }) => void;
      rate?: (data: { rate: number }) => void;
    }
  > = {};

  start({ action, engine, isPlaying, time }) {
    if (isPlaying) {
      const src = (action as CustomTimelineAction).data.src;
      this.startAudio({ id: src, src, startTime: action.start, engine, time });
    }
  }
  enter({ action, engine, isPlaying, time }) {
    if (isPlaying) {
      const src = (action as CustomTimelineAction).data.src;
      this.startAudio({ id: src, src, startTime: action.start, engine, time });
    }
  }
  leave({ action, engine }) {
    const src = (action as CustomTimelineAction).data.src;
    this.stopAudio({ id: src, engine });
  }
  stop({ action, engine }) {
    const src = (action as CustomTimelineAction).data.src;
    this.stopAudio({ id: src, engine });
  }
  
  startAudio(data: { id: string; engine: TimelineEngine; src: string; startTime: number; time: number }) {
    const { id, src, startTime, time, engine } = data;
    let item: Howl;
    if (this.cacheMap[id]) {
      item = this.cacheMap[id];
      item.rate(engine.getPlayRate());
      item.seek((time - startTime) % item.duration());
      item.play();
    } else {
      item = new Howl({ src, loop: true, autoplay: true });
      this.cacheMap[id] = item;
      item.on('load', () => {
        item.rate(engine.getPlayRate());
        item.seek((time - startTime) % item.duration());
      });
    }

    const timeListener = (data: { time: number }) => {
      const { time } = data;
      item.seek(time);
    };
    const rateListener = (data: { rate: number }) => {
      const { rate } = data;
      item.rate(rate);
    };
    if (!this.listenerMap[id]) this.listenerMap[id] = {};
    engine.on('afterSetTime', timeListener);
    engine.on('afterSetPlayRate', rateListener);
    this.listenerMap[id].time = timeListener;
    this.listenerMap[id].rate = rateListener;
  }

  stopAudio(data: { id: string; engine: TimelineEngine }) {
    const { id, engine } = data;
    if (this.cacheMap[id]) {
      const item = this.cacheMap[id];
      item.stop();
      if (this.listenerMap[id]) {
        this.listenerMap[id].time && engine.off('afterSetTime', this.listenerMap[id].time);
        this.listenerMap[id].rate && engine.off('afterSetPlayRate', this.listenerMap[id].rate);
        delete this.listenerMap[id];
      }
    }
  }
}

export default new AudioControl();