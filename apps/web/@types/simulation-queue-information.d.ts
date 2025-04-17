interface SimulationQueueInformation {
  active: number;
  failed: number;
  paused: number;
  delayed: number;
  waiting: number;
  completed: number;
  jobs: {
    id: string;
    data: {
      simulationId: string;
      type: string;
    };
    opts: {
      attempts: number;
      delay: number;
      timestamp: number;
    };
    progress: number;
    delay: number;
    timestamp: number;
    attemptsMade: number;
    stacktrace: [];
    returnvalue: string;
    debounceId: null;
    finishedOn: number;
    processedOn: number;
  }[];
}
