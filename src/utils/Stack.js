class Stack {
  constructor() {
    this.arr = [];
    this.size = this.arr.length;
  }

  push(data) {
    try {
      this.arr.push(data);
      this.size++;
    } catch (error) {
      throw new Error(error);
    }
  }

  pop() {
    if (this.size > 0) {
      let data = this.arr.pop();
      this.size--;
      return data;
    } else {
      throw new Error("Stack is empty");
    }
  }

  isEmpty() {
    return this.size === 0;
  }

  size() {
    return this.size;
  }
}

export default Stack;
