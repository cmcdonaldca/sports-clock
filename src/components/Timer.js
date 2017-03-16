import Emitter from 'es6-event-emitter';

class Timer extends Emitter {

    constructor(tickOffset) {
        super();
        this.tickOffset = tickOffset || 100; // 100 milliseconds
        this.stop();
    }

    // length in milliseconds
    setLength(length) {
        this.length = length;
    }

    isRunning() {
        return this._isRunning;
    }

    reset() {
        this.stop();
    }

    start() {
        this._isRunning = true;
        this.ctxId = setInterval(
            () => this.tick(),
            this.tickOffset);

        this.trigger('started');
    }

    stop() {
        clearInterval(this.ctxId);
        this._isRunning = false;
        this.ctxId = null;
        this.trigger('stopped');
    }

    toggleRunningState() {
        if (this._isRunning) {
            this.stop();
        } else {
            this.start();
        }

        return this._isRunning;
    }

    tick() {
        this.trigger('tick');
    }
}


export default Timer;
