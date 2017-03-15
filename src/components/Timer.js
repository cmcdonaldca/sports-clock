import Emitter from 'es6-event-emitter';

class Timer extends Emitter {

    constructor() {
        super();
        this.length = 0;
        this.counter = 0;
        this.tickOffset = 100; // 100 milliseconds
        this.stop();
    }

    // length in milliseconds
    setLength(length) {
        this.length = length;
    }

    reset() {
        this.stop();
        this.counter = 0;
    }

    start() {
        const _this = this;
        this.isRunning = true;
        this.trigger('start');

        this.ctxId = setInterval(
            () => this.tick(),
            this.tickOffset);
    }

    stop() {
        clearInterval(this.ctxId);
        this.isRunning = false;
        this.ctxId = null;
    }

    toggleRunningState() {
        if (this.isRunning) {
            this.stop();
        } else {
            this.start();
        }

        return this.isRunning;
    }

    tick() {
        if (this.counter === this.length) {
            this.stop();
            this.trigger('end');
            return;
        }

        this.counter += this.tickOffset;
        this.trigger('tick', this.counter);
    }
}


export default Timer;
