import { TimelineEngine, TimeLineEffectSource } from '@xzdarcy/react-timeline-editor';
import { CustomTimelineAction } from './customRenders';
import anime from 'animejs';

class AnimeControl implements TimeLineEffectSource {
    private animation : anime.AnimeInstance;
    start({ action, engine, isPlaying, time }) {
        if (isPlaying) {
            const animeParams = (action as CustomTimelineAction).data.animeParams;
            if (animeParams) {
                this.animation = anime(animeParams);
                this.animation.play();
            }
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
        this.animation.pause();
    }
}

export default new AnimeControl();