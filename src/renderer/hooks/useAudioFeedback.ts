import tickSound from 'renderer/assets/tick.wav';
import bellSound from 'renderer/assets/bell.mp3';

const useAudioFeedback = () => {
  const countdownTick = new Audio(tickSound);
  const lessonBell = new Audio(bellSound);

  return { countdownTick, lessonBell };
};

export default useAudioFeedback;
