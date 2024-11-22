import { TimelineEngine, TimeLineEffectSource } from '@xzdarcy/react-timeline-editor';
import { CustomTimelineAction } from './mock';

class AnimeControl implements TimeLineEffectSource {
    start({ action, engine, isPlaying, time }) {
        if (isPlaying) {
            const animeParams = (action as CustomTimelineAction).data.animeParams;
        }
    }
    enter({ action, engine, isPlaying, time }) {
        if (isPlaying) {
        }
    }
    update({ action, time }) {

    }
    leave({ action, engine }) {
    }
    stop({ action, engine }) {
    }
}

export default new AnimeControl();