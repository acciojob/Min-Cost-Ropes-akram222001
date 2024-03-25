function mincost(arr) {
    // Create a priority queue or min-heap
    let pq = new MinHeap();

    // Insert all elements of the array into the priority queue or min-heap
    for (let i = 0; i < arr.length; i++) {
        pq.insert(arr[i]);
    }

    let totalCost = 0;

    // While there are more than one rope in the priority queue or min-heap
    while (pq.size() > 1) {
        // Remove the two smallest ropes
        let rope1 = pq.extractMin();
        let rope2 = pq.extractMin();

        // Calculate the cost of connecting them
        let cost = rope1 + rope2;

        // Add the cost to the total cost
        totalCost += cost;

        // Add the combined rope back to the priority queue or min-heap
        pq.insert(cost);
    }

    return totalCost;
}

// MinHeap implementation (same as before)
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    extractMin() {
        if (this.isEmpty()) {
            return null;
        }

        const min = this.heap[0];
        const last = this.heap.pop();

        if (!this.isEmpty()) {
            this.heap[0] = last;
            this.heapifyDown();
        }

        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[currentIndex] >= this.heap[parentIndex]) {
                break;
            }
            [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
            currentIndex = parentIndex;
        }
    }

    heapifyDown() {
        let currentIndex = 0;
        let nextIndex = null;

        while (true) {
            const leftChildIndex = currentIndex * 2 + 1;
            const rightChildIndex = currentIndex * 2 + 2;
            nextIndex = null;

            if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[currentIndex]) {
                nextIndex = leftChildIndex;
            }

            if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[currentIndex] && this.heap[rightChildIndex] < this.heap[leftChildIndex]) {
                nextIndex = rightChildIndex;
            }

            if (nextIndex === null) {
                break;
            }

            [this.heap[currentIndex], this.heap[nextIndex]] = [this.heap[nextIndex], this.heap[currentIndex]];
            currentIndex = nextIndex;
        }
    }
}

module.exports = mincost;
