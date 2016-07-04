module OPENSets.Services {
  export class TriesCounterService {
    private counter: number;

    constructor() {
      this.counter = 0;
    }

    reset(): void {
      this.counter = 0;
    }

    getTries(): number {
      return this.counter;
    }

    isThresholdPassed(treshold: number): boolean {
      this.counter++;
      return this.counter >= treshold;
    }
  }
}
