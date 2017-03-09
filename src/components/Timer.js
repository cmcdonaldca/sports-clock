import Emitter from 'es6-event-emitter';

class Timer extends Emitter {

    constructor(timerState) {
        super();
        this.timerState = timerState;
        this.ctxId = null;
    }

    getState() {

    }

    start() {
        const _this = this;
        this.timerState.isRunning = true;

        this.ctxId = setInterval(
            () => this.tick(),
            100);
    }

    stop() {
        clearInterval(this.ctxId);
        this.timerState.isRunning = false;
        this.ctxId = null;
    }

    toggleRunningState() {
        if (this.timerState.isRunning) {
            this.stop();
        } else {
            this.start();
        }

        return this.timerState;
    }

    tick() {
        if (this.timerState.minutes === 0 && this.timerState.seconds === 0 && this.timerState.milliseconds === 0) {
            this.stop();
            this.trigger('end');
            return;
        }

        if (this.timerState.milliseconds === 0) {
            this.timerState.milliseconds = 9;
            if (this.timerState.seconds === 0) {
                this.timerState.seconds = 59;
                this.timerState.minutes--;
            } else {
                this.timerState.seconds--;
            }
        } else {
            this.timerState.milliseconds--;
        }

        this.trigger('tick', this.timerState);
    }
}


export default Timer;
