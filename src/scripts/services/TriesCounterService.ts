module OPENSets.Services {
  export class TriesCounterService {
    private counter: number;

    constructor(private treshold: number) {
      this.counter = 0;
    }

    reset(): void {
      this.counter = 0;
    }

    getTries(): number {
      return this.counter;
    }

    isThresholdPassed(): boolean {
      this.counter++;
      return this.counter >= this.treshold;
    }
  }
}
