export interface Page {
  attach(): void;

  detach(): void;

  notify(): void;

  getStatus(): any;

  setStatus(newState: any): void;
}
