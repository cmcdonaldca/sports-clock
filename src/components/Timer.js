import Emitter from 'es6-event-emitter';

class Timer extends Emitter {

    constructor(minutes, seconds, milliseconds) {
        super();
        this.minutes = minutes;
        this.seconds = seconds;
        this.milliseconds = milliseconds;
        this.ctxId = null;
    }

    start() {
        const _this = this;

        this.ctxId = setInterval(
            () => this.tick(),
            100);
    }

    stop() {
        clearInterval(this.ctxId);
        this.ctxId = null;
    }

    isRunning() {
        return this.ctxId !== null;
    }

    tick() {
        if (this.minutes === 0 && this.seconds === 0 && this.milliseconds === 0) {
            this.stop();
            this.trigger('end');
            return;
        }

        if (this.milliseconds === 0) {
            this.milliseconds = 9;
            if (this.seconds === 0) {
                this.seconds = 59;
                this.minutes--;
            } else {
                this.seconds--;
            }
        } else {
            this.milliseconds--;
        }

        this.trigger('tick', {
            minutes: this.minutes,
            seconds: this.seconds
        });
    }
}


export default Timer;
