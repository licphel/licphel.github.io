---
title: 'Merge Sort: Divide and Conquer'
description: 'A deep dive into merge sort — analysis, implementation, and intuition behind the divide-and-conquer paradigm.'
date: 2026-06-10
tags: ['algorithms', 'sorting', 'divide-and-conquer']
draft: false
---

Merge sort is one of the most fundamental algorithms in computer science. It's a textbook example of the **divide-and-conquer** paradigm and runs in $O(n \log n)$ time with $O(n)$ auxiliary space.

## The idea

Three steps:

1. **Divide** — split the array into two halves
2. **Conquer** — recursively sort each half
3. **Merge** — combine the two sorted halves into a single sorted array

## Implementation (Rust)

```rust
fn merge_sort<T: Ord + Clone>(arr: &[T]) -> Vec<T> {
    if arr.len() <= 1 {
        return arr.to_vec();
    }

    let mid = arr.len() / 2;
    let left = merge_sort(&arr[..mid]);
    let right = merge_sort(&arr[mid..]);

    merge(&left, &right)
}

fn merge<T: Ord + Clone>(left: &[T], right: &[T]) -> Vec<T> {
    let mut result = Vec::with_capacity(left.len() + right.len());
    let (mut i, mut j) = (0, 0);

    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            result.push(left[i].clone());
            i += 1;
        } else {
            result.push(right[j].clone());
            j += 1;
        }
    }

    result.extend_from_slice(&left[i..]);
    result.extend_from_slice(&right[j..]);
    result
}
```

## Complexity

| | Time | Space |
|---|---|---|
| Best | $O(n \log n)$ | $O(n)$ |
| Average | $O(n \log n)$ | $O(n)$ |
| Worst | $O(n \log n)$ | $O(n)$ |

Unlike quicksort, merge sort is **stable** and guarantees $O(n \log n)$ regardless of input distribution.

## When to use

- When stability matters (preserving relative order of equal elements)
- When you need guaranteed $O(n \log n)$ performance
- **External sorting** — merge sort naturally extends to sorting data that doesn't fit in memory
- Inversion counting — can be adapted to count inversions in $O(n \log n)$
