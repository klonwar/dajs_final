function debounce(handler: () => void, timeout: number): void {
  setTimeout(() => {
    if (Date.now() - this.lastCalledTime > timeout) {
      handler();
    }
  }, timeout);
}

export default new Proxy(debounce, {
  apply(target: (handler: () => void, timeout: number) => void, thisArg: any, argArray: any[]): any {
    this.lastCalledTime = Date.now();
    target.apply(this, argArray);
  }
});