import Emitter from 'es6-event-emitter';

class Timer extends Emitter {

    constructor(minutes, seconds) {
        super();
        this.minutes = minutes;
        this.seconds = seconds;
    }

    start() {
        const _this = this;

        this.ctxId = setInterval(
            () => this.tick(),
            1000);
    }

    stop() {
        clearInterval(this.ctxId);
    }

    tick() {
        if (this.minutes === 0 && this.seconds === 0) {            
            this.stop();
            this.trigger('end');
            return;
        }

        if (this.seconds === 0) {
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }

        this.trigger('tick', {
            minutes: this.minutes,
            seconds: this.seconds
        });
    }
}


export default Timer;
