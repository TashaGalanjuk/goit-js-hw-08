import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const player = new Player('vimeo-player');
const onTimeUpdate = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
};
player.on('timeupdate', throttle(onTimeUpdate, 1000));
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'));

