import { TimelineEngine, TimeLineEffectSource } from '@xzdarcy/react-timeline-editor';

class AnimeControl implements TimeLineEffectSource {
    start({ action, engine, isPlaying, time }) {
        if (isPlaying) {
        }
    }
    enter({ action, engine, isPlaying, time }) {
        if (isPlaying) {
        }
    }
    leave({ action, engine }) {
    }
    stop({ action, engine }) {
    }
}