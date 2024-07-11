export class Stack<T> {
  private _stack: T[];
  public constructor(private capacity = 1) {
    this._stack = [] satisfies T[];
    this.pop = this.pop.bind(this);
    this.push = this.push.bind(this);
    this.top = this.top.bind(this);
  }

  public pop() {
    return this._stack.pop();
  }

  public top(): T | undefined {
    return this._stack[this._stack.length - 1];
  }

  public push(item: T) {
    if (this._stack.length >= this.capacity) {
      this._stack.shift();
    }
    this._stack.push(item);
  }
}
