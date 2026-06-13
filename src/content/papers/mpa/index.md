---
title: 'Multi-Pivot Attribution: Attributing Distributed Privacy Leaks in LLM Agent Trajectories'
authors: ''
venue: ''
year: 2026
tags: ["LLM agent"]
url: ''
pdf: 'mpa.pdf'
notes: false
description: 'Privacy violations in LLM agent trajectories often arise through distributed information flow: multiple individually benign steps that collectively leak sensitive data, with no single step bearing full responsibility. We formalize this as a post-violation attribution problem and propose Multi-Pivot Attribution (MPA), a method that selects multiple trajectory steps for sanitization using context-aware risk scoring and greedy ranking. We benchmark five strategies spanning a safety-cost Pareto frontier---from single-pivot to full sanitization---on 180 agent trajectories with step-level violation labels. Results show that multi-pivot strategies substantially outperform single-pivot, and one variant achieves strong coverage at a fraction of the cost of full sanitization. The framework is model-agnostic and fully reproducible.'
---

Privacy violations in LLM agent trajectories often arise through distributed information flow: multiple individually benign steps that collectively leak sensitive data, with no single step bearing full responsibility. We formalize this as a post-violation attribution problem and propose Multi-Pivot Attribution (MPA), a method that selects multiple trajectory steps for sanitization using context-aware risk scoring and greedy ranking. We benchmark five strategies spanning a safety-cost Pareto frontier---from single-pivot to full sanitization---on 180 agent trajectories with step-level violation labels. Results show that multi-pivot strategies substantially outperform single-pivot, and one variant achieves strong coverage at a fraction of the cost of full sanitization. The framework is model-agnostic and fully reproducible.
