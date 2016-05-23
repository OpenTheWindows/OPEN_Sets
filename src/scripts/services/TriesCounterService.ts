module OPENSets.Services {
  export class TriesCounterService {
    public counter: number;
    public threshold: number = 6;

    constructor() {
      this.counter = 0;
    }

    isThresholdPassed(): boolean {
      this.counter++;
      return this.counter >= this.threshold;
    }
  }
}
