---
title: 'Gradient Descent Variants: SGD, Momentum, Adam'
description: 'An overview of gradient-based optimization algorithms used in modern deep learning.'
date: 2026-06-05
tags: ['machine-learning', 'optimization', 'deep-learning']
draft: false
---

Gradient descent is the workhorse of modern machine learning. Understanding its variants is essential for training neural networks effectively.

## Batch Gradient Descent

$$
\theta_{t+1} = \theta_t - \eta \nabla_\theta J(\theta_t)
$$

Uses the **entire dataset** to compute the gradient. Guaranteed to converge to a local minimum for convex problems, but very slow for large datasets.

## Stochastic Gradient Descent (SGD)

$$
\theta_{t+1} = \theta_t - \eta \nabla_\theta J(\theta_t; x^{(i)}, y^{(i)})
$$

Updates parameters using **one sample** at a time. Very noisy but fast. The noise can actually help escape shallow local minima.

## Mini-batch SGD

$$
\theta_{t+1} = \theta_t - \eta \frac{1}{B} \sum_{i=1}^{B} \nabla_\theta J(\theta_t; x^{(i)}, y^{(i)})
$$

The sweet spot — uses a batch of $B$ samples (typically 32–256). Balances gradient accuracy with computation speed. Scales well to GPUs.

## SGD with Momentum

$$
\begin{aligned}
v_{t+1} &= \beta v_t + \eta \nabla_\theta J(\theta_t) \\
\theta_{t+1} &= \theta_t - v_{t+1}
\end{aligned}
$$

Accumulates a velocity vector — dampens oscillations and accelerates in consistent directions. $\beta \approx 0.9$.

## Adam (Adaptive Moment Estimation)

Combines momentum with adaptive learning rates per parameter:

$$
\begin{aligned}
m_t &= \beta_1 m_{t-1} + (1 - \beta_1) g_t \\
v_t &= \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 \\
\hat{m}_t &= m_t / (1 - \beta_1^t) \\
\hat{v}_t &= v_t / (1 - \beta_2^t) \\
\theta_{t+1} &= \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
\end{aligned}
$$

Default choice for most deep learning tasks today. Works well out of the box with default hyperparameters ($\beta_1=0.9$, $\beta_2=0.999$, $\eta=0.001$).

## Quick comparison

| Optimizer | Adaptive LR | Momentum | Best for |
|---|---|---|---|
| SGD | No | No | Baselines, fine-tuning |
| SGD+Momentum | No | Yes | Vision tasks |
| Adam | Yes | Yes | Default choice |
| AdamW | Yes | Yes | Transformers, LLMs |
