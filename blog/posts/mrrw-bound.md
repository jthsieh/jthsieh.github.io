In the summer of 2026, [OpenAI](https://cdn.openai.com/pdf/ten-proofs-oai.pdf) and [Alrabiah-Guruswami](https://arxiv.org/abs/2608.09347) posted their breakthrough results on improving the upper bound on the rate of binary codes, a bound that had stood for decades. In this 2-post series, I want to share a proof of the new bound that I extracted from OpenAI's proof, presented in a way that, at least to me, feels like a sequence of natural design choices that could have led to the result (in hindsight of course).

In this first note, I will prove the 1st McEliece-Rodemich-Rumsey-Welch (MRRW) bound (there are many known alternative proofs). In the [next post](post.html?slug=improved-mrrw), I will show how one different design choice leads to the improved bound.

## Background

What's the largest size of a binary code with a given minimum distance? This is one of the most fundamental and classical questions in coding theory and combinatorics. From the coding-theoretic perspective, it asks for the optimal trade-off between rate and distance. Geometrically, it can be viewed as a sphere-packing problem in $\mathbb{F}_2^n$.

> [!NOTE] Main question
>
> Let $\mathcal{C} \subseteq \{0,1\}^n$ be a set of binary strings such that every distinct $x, y\in \mathcal{C}$ have relative distance $\operatorname{dist}(x,y) \ge \delta$. How large can $\mathcal{C}$ be?
>
> The optimal size is usually denoted by $A_2(n,\delta n)$. We are interested in the optimal asymptotic *rate* as $n\to \infty$: $$R_2(\delta) := \limsup_{n\to \infty} \frac{1}{n} \log_2 A_2(n,\delta n) \,.$$

Many researchers (including myself) have thought about both upper and lower bounds. For several decades, the following is the best known bounds for all $\delta < 1/2$: $$1 - h_2(\delta) \leq R_2(\delta) \leq  h_2 \left(\frac{1}{2} - \sqrt{\delta(1-\delta)}\right) \,.$$

The lower bound is the [Gilbert-Varshamov (GV) bound](https://en.wikipedia.org/wiki/Gilbert%E2%80%93Varshamov_bound), and the upper bound is the 1st MRRW bound. For $\delta \lesssim 0.273$, we know a better upper bound known as the 2nd MRRW bound (but I won't go into this).

In this note, we will prove the 1st MRRW bound in a way that can be generalized to obtain the improved bounds (in the [next post](post.html?slug=improved-mrrw)).

**Notations.** Instead of working with $\{0,1\}^n$, I will switch to $\{\pm1\}^n$ for convenience. The distance of two vectors $x,y \in \{\pm1\}^n$ is $\operatorname{dist}(x,y) = \frac{1}{n}|\{i\in [n]: x_i \neq y_i\}|$. We define the expected inner product as $\left\langle x,y \right\rangle = \frac{1}{n} \sum_{i=1}^n x_i y_i$. Then, we have $\left\langle x,y \right\rangle = 1 - 2 \operatorname{dist}(x,y)$.

## Independence number of the noisy hypercube graph

Let's start with an equivalent formulation of the question.

> [!NOTE] Independence number of the noisy hypercube graph
>
> Define a graph $G$ with vertex set $\{\pm1\}^n$ by connecting two distinct vertices $x,y\in \{\pm1\}^n$ whenever $\operatorname{dist}(x,y) < \delta$. (This is sometimes called the "noisy hypercube graph".)
>
> Then, $A_2(n,\delta n)$ is the *independence number* of $G$, i.e., the size of the largest independent set in $G$.

How can we upper bound this independence number? For people familiar with spectral graph theory, there is a natural strategy: the *Lovasz theta function*. There are many equivalent definitions, but here's a standard formulation: $$\begin{aligned}
    \vartheta(G) = \min_{X \text{ symmetric}} \, \lambda_{\max}(X) \quad \text{subject to} \quad X_{ij} \geq 1  \text{ if } i=j \text{ or } (i,j)\notin E
\end{aligned}$$ (Actually, the standard definition of $\vartheta(G)$ requires $X_{ij} = 1$, which may give a weaker bound.)

This definition is the one I am most familiar with, that's why I wrote it first. However, there is an equivalent definition that is more convenient for the MRRW argument.

Let $M \in \mathbb{R}^{|V| \times |V|}$ be a symmetric matrix such that

1.  $M \succeq a_0 \mathbf{1} \mathbf{1}^\top$, where $a_0 > 0$ and $\mathbf{1}$ is the all-1s vector.

2.  $M_{i,j} \leq 0$ for all $i\neq j$ such that $(i,j) \notin E$,

3.  $M_{i,i} \leq D$ for all $i$.

Then, any independent set $S$ satisfies $$a_0 |S|^2 \leq \mathbf{1}_S^\top M \mathbf{1}_S = \sum_{i,j\in S} M_{i,j} \leq D |S| \implies  |S| \leq \frac{D}{a_0} \,.$$

For our noisy hypercube graph, the 3 requirements become the following,

> [!NOTE] Goal: feasible solution for the Lovasz theta function
>
> Given $\delta \in (0,1/2)$, design a matrix $M \in \mathbb{R}^{2^n \times 2^n}$ such that
>
> 1.  $M \succeq a_0 \mathbf{1}\mathbf{1}^\top$ for some $a_0 > 0$,
>
> 2.  $M_{x,y} \leq 0$ for all $x, y \in \{\pm1\}^n$ with $\left\langle x,y \right\rangle \leq 1-2\delta$,
>
> 3.  $M_{x,x} \leq D$ for all $x$.
>
> Conclude that $A_2(n,\delta n) \le D/a_0$.

From here on, we write $M(x,y)$ instead of $M_{x,y}$, and $M(x,y)$ is sometimes called a *kernel*. It does not change anything, but this notation looks better.

## Symmetry leads to a Boolean function

The matrix $M$ can be designed arbitrarily. However, there are very strong symmetries in the graph that we can exploit (to reduce the search space).

The first assumption is that $M(x,y)$ depends only on $x \odot y \in \{\pm1\}^n$, the entry-wise product. $$\begin{aligned}
    M(x,y) = f(x \odot y) \,, \text{ for some function } f : \{\pm1\}^n \to \mathbb{R} \,.
\end{aligned}$$ Since $f$ is over $\{\pm1\}^n$, we can write out its Fourier expansion: $$f(z) = \sum_{S \subseteq [n]} a_S \chi_S(z) \,,
    \text{ where } \chi_S(z) = \prod_{i\in S} z_i \,.$$ The $\{a_S\}_{S \subseteq [n]}$ are called the Fourier coefficients.

Given this, one can verify that $M$ is PSD if and only if its Fourier coefficients are non-negative.

> [!EXERCISE] Exercise
>
> $M \succeq a_{\varnothing} \mathbf{1}\mathbf{1}^\top \iff a_S \geq 0$ for all $S \neq \varnothing$.

*Note*: We will first focus on getting $M \succeq 0$. Then, we can tweak it a little to get $a_{\varnothing} > 0$.

To summarize, we have reduced the matrix problem to a problem about one Boolean function.

> [!NOTE] Goal: design a function $f$
>
> Given $\delta \in (0,1/2)$, design a function $f(z) = \sum_{S \subseteq [n]} a_S \chi_S(z)$ over $\{\pm1\}^n$ such that
>
> 1.  $a_S \geq 0$ for all $S \subseteq [n]$, with $a_{\varnothing} > 0$,
>
> 2.  $f(z) \leq 0$ for all $\left\langle z, \mathbf{1} \right\rangle \leq 1-2\delta$.
>
> Then, conclude that $$A_2(n,\delta n) \leq \frac{f(\mathbf{1})}{a_{\varnothing}} \,.$$

**How the Delsarte linear program appears.** One further restriction we can make is that $a_S$ depends only on $|S|$. Then, it's not too hard to see that the above becomes a *linear program* with variables $a_1,\dots,a_n$, after normalizing $a_0 = 1$. This is the form that is perhaps most commonly seen in papers or [lecture notes](https://errorcorrectingcodes.wordpress.com/2010/02/07/notes-5-1-fourier-transform-macwillams-identities-and-lp-bound/) on the MRRW bound, and it is called the Delsarte linear program. Accordingly, the MRRW bound is often referred to as the *linear programming bound*.

## Designing $f$

Here's a natural candidate for $f$ that automatically satisfies the 2nd requirement.

> [!NOTE] Design choice for $f$
>
> Choose $f(z) = (\left\langle z,\mathbf{1} \right\rangle - \rho) g(z)$ such that $f$ and $g$ have non-negative Fourier coefficients, and $g(z) \geq 0$ for all $z$.

Operationally, what we will do is:

1.  Design $g$ first (with some parameter $t$ to choose later).

2.  Find the largest $\lambda = \lambda(t)$ such that $(\left\langle z,\mathbf{1} \right\rangle -\lambda) g(z)$ has non-negative Fourier coefficients.

3.  Set $\rho = 1-2\delta = \lambda - o(1)$, solve for $t$, and see what final bound we get.

The requirements on $g$ are somewhat unusual. We need *both* its function values and its Fourier coefficients to be non-negative. That said, there is a straightforward way to enforce both conditions.

> [!NOTE] Design choice for $g$
>
> Set $g(z) = h(z)^2$, where $h$ has non-negative Fourier coefficients. Moreover, restrict $h$ to degree at most $t$.
>
> The degree $t$ is the parameter that will affect $\lambda$, and we choose it at the end.

Here's a trick that we will use repeatedly to show non-negativity of Fourier coefficients:

> [!EXERCISE] Exercise
>
> For any $f, g$ with non-negative Fourier coefficients, $f\cdot g$ also has non-negative Fourier coefficients.
>
> (This also follows from the fact that for any two PSD matrices $A$ and $B$, their entry-wise product $(A_{ij} B_{ij})_{ij}$ is also a PSD matrix.)

## Designing $h$

We now need to understand $(\left\langle z,\mathbf{1} \right\rangle - \lambda) h(z)^2$. Let $h(z) = \sum_{S} b_S \chi_S(z)$, where we assume $b_S \geq 0$ and $b_S = 0$ for $|S| > t$. Let's first understand $\left\langle z,\mathbf{1} \right\rangle \cdot h(z)$, that is, how multiplication by $\left\langle z,\mathbf{1} \right\rangle$ acts on the coefficients $b$. $$\left\langle z,\mathbf{1} \right\rangle \cdot h(z) = \frac{1}{n} \sum_{i \in [n]} z_i \sum_{S\subseteq [n]} b_S \chi_S(z)
    = \frac{1}{n} \sum_{T \subseteq [n]} \chi_T(z) \left(\sum_{i\in [n]} b_{T \Delta \{i\}} \right) \,.$$ Here, $\Delta$ denotes the symmetric difference. Suppose $\left\langle z,\mathbf{1} \right\rangle \cdot h(z)$ has Fourier coefficients $(c_T)_T$, then we have the following relation: $$c_T = \begin{cases}
        \frac{1}{n} \sum_{i\in [n]} b_{T \Delta \{i\}} , & |T| \le t , \\
        \frac{1}{n} \sum_{i\in T} b_{T \setminus \{i\}} , & |T| = t+1 , \\
        0, & |T| > t+1.
    \end{cases}$$ Let's forget about the terms with $|T| = t+1$ for a second. We can write the terms with $|T| \leq t$ in a very succinct way: $$\vec{c} = A \vec{b} \,,$$ where $A$ is the matrix such that $A(S,T) = 1/n$ if $|S \Delta T| = 1$, restricted to $|S| \leq t$. That is, $A$ is a *submatrix* of the $2^n \times 2^n$ transition matrix of the hypercube graph. Note that $A$ has dimension $\sum_{\ell=0}^t \binom{n}{\ell} \approx 2^{n \cdot h_2(t/n)}$.

We are interested in the Fourier coefficients of $(\left\langle z, \mathbf{1} \right\rangle - \lambda) h(z)$, which we can write in a clean way.

> [!NOTE] Fourier coefficients of $(\left\langle z, \mathbf{1} \right\rangle - \lambda) h(z)$
>
> The degree-$\le t$ Fourier coefficient vector of $(\left\langle z, \mathbf{1} \right\rangle - \lambda) h(z)$ is $$\vec{c} - \lambda \vec{b} = (A - \lambda I) \vec{b} \,.$$

We are trying to maximize $\lambda$ such that $\vec{b} \geq 0$ and $(A-\lambda I) \vec{b} \geq 0$. Seeing this form, the obvious question is: what are the eigenvalues and eigenvectors of $A$?

**Perron eigenvalue and eigenvector of $A$.** By the [Perron-Frobenius theorem](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem), $A$ has a positive Perron eigenvalue, and the corresponding eigenvector has non-negative entries!

> [!NOTE] Choice for the Fourier coefficients of $h$
>
> Choose $\vec{b}$ to be the Perron eigenvector of $A$, which has non-negative entries.
>
> Let $\gamma = t/n < 1/2$ be a constant as $n\to \infty$. The Perron eigenvalue of $A$ is $$\lambda = 2\sqrt{\gamma (1-\gamma)} + o(1) \,.$$

This is very well studied, and we can just use this a black box. It is actually quite easy to determine $\lambda$ up to $o(1)$ error. If you're interested, see [the last section](#perron-eigenvalue-of-a).

**Degree-$(t+1)$ terms.** Earlier, we ignored $c_T$ with $|T| = t+1$. However, since $b_S = 0$ for all $|S| > t$, all we need is that $c_T \geq 0$, and this follows directly from $\vec{b} \geq 0$.

## Putting things together

We set $f(z) = (\left\langle z,\mathbf{1} \right\rangle - \rho) h(z)^2$, and we have chosen $h$ such that both $h(z)$ and $(\left\langle z,\mathbf{1} \right\rangle-\lambda) h(z)$ have non-negative Fourier coefficients. We can then set $\rho = 1-2\delta$ to be $\lambda - o(1)$, just slightly smaller than $\lambda$. This tells us how to choose the degree $t = \gamma n$. Then, we can write $f$ as $$f(z) = (\left\langle z,\mathbf{1} \right\rangle-\lambda) h(z)^2 + (\lambda-\rho) h(z)^2 \,.$$

> [!EXERCISE] Exercise
>
> Verify the requirements on $f(z)$.
>
> 1.  $f(z)$ has non-negative Fourier coefficients.
>
> 2.  For $\gamma = t/n < 1/2$, $$2\sqrt{\gamma(1-\gamma)} - o(1) = 1-2\delta
>                 \iff \gamma = \frac{1}{2} - \sqrt{\delta(1-\delta)} + o(1) \,.$$ Thus $f(z) \leq 0$ for all $\left\langle z,\mathbf{1} \right\rangle \leq 1-2\delta$.

Finally, what bound do we get? We need to lower bound $a_\varnothing$ and upper bound $f(\mathbf{1})$.

Let $\mathbf{z} \sim \{\pm1\}^n$ be uniformly random. First, we have $\mathbb{E} \left[ (\left\langle z,\mathbf{1} \right\rangle-\lambda) h(z)^2 \right] \geq 0$. Thus, $$a_{\varnothing} = \mathbb{E}[f(\mathbf{z})] \geq (\lambda-\rho) \cdot \mathbb{E}[h(z)^2] = (\lambda - \rho) \sum_{|S| \leq t}  b_S^2 \,.$$ Next, $$f(\mathbf{1}) = (1-\rho) h(\mathbf{1})^2 = (1-\rho) \left(\sum_{|S|\leq t} b_S \right)^2
    \le (1-\rho) \sum_{\ell=0}^t \binom{n}{\ell} \sum_{|S|\leq t} b_S^2 \,.$$ Since $\sum_{\ell=0}^{\gamma n} \binom{n}{\ell} \leq 2^{n \cdot h_2(\gamma)}$, we have our final bound (still in terms of $t= \gamma n$), $$A_2(n,\delta n) \leq \frac{f(\mathbf{1})}{a_{\varnothing}}
    \leq \frac{1-\rho}{\lambda-\rho} \cdot 2^{n \cdot h_2(\gamma)} \,.$$ The $\frac{1-\rho}{\lambda-\rho}$ term is negligible compared to $2^{n \cdot h_2(\gamma)}$ as $n\to \infty$ (as long as $\lambda - \rho$ is not too small). Moreover, we saw that $\gamma = \frac{1}{2}- \sqrt{\delta(1-\delta)} + o(1)$. Thus,

> [!NOTE] MRRW bound
>
> $$R_2(\delta) = \limsup_{n\to \infty} \frac{1}{n} \log_2 A_2(n,\delta n) \leq h_2 \left(\frac{1}{2} - \sqrt{\delta(1-\delta)}\right) \,.$$

## Perron eigenvalue of $A$

Since permutation on $[n]$ preserves $A$, the eigenvector $u$ is constant on each level, i.e., $u_S = v_{|S|}$. Then, the eigenvalue equation $Au = \lambda u$ becomes $$\lambda v_{\ell} = \frac{\ell}{n} v_{\ell-1} + \frac{n-\ell}{n} v_{\ell+1} \,, \quad \forall \ell = 0,\dots, t .$$ Here we assume $v_{-1} = v_{t+1} = 0$. We can write this as

$$Q v = \lambda v, \quad \text{where} \quad
    Q = \frac{1}{n}
    \begin{pmatrix}
        0 & n \\
        1 & 0 & n-1 \\
          & 2 & 0 & n-2 \\
          &  & \ddots & \ddots & \ddots \\
          &  &  & t-1 & 0 & n-t+1 \\
          &  &  &  & t & 0
    \end{pmatrix} \,.$$ Here, $Q$ is a $(t+1) \times (t+1)$ tridiagonal matrix.

Here's a fun fact: $\det(zI - Q)$ is proportional to the centered degree-$(t+1)$ (binary) Krawtchouk polynomial $K_{t+1}(z)$! Thus, $\lambda$ is the largest root of $K_{t+1}(z)$, which one can look up.

Another way to find $\lambda$ is to find a diagonal matrix $D$ such that $J := D Q D^{-1}$ is a *symmetric* tridiagonal matrix. Note that $\det(xI - Q) = \det(xI - J)$, so they have the same eigenvalues. The reason we do this is that it is easier to understand the eigenvalues of a symmetric matrix.

> [!EXERCISE] Exercise
>
> Show that for $D = \operatorname{diag}(1, \binom{n}{1}^{1/2}, \dots, \binom{n}{t}^{1/2})$, $J := DQD^{-1}$ is symmetric.
>
> In fact, $J$ is also tridiagonal, and each off-diagonal entry of $J$ is the geometric mean of the two corresponding entries in $Q$.

The matrix $J$ has entries $J_{\ell, \ell+1} = \frac{1}{n}\sqrt{(\ell+1)(n-\ell)}$ (starting with $\ell = 0$): $$J = \frac{1}{n}
    \begin{pmatrix}
        0 & \sqrt{n} \\
        \sqrt{n} & 0 & \sqrt{2(n-1)} \\
          &  \ddots & \ddots & \ddots \\
          &  & \sqrt{(t-1)(n-t+2)} & 0 & \sqrt{t(n-t+1)} \\
          &  &  & \sqrt{t(n-t+1)} & 0
    \end{pmatrix} \,.$$

We actually only need a lower bound on the largest eigenvalue of $J$. Here's a very simple trick to get a lower bound: $\lambda_{\max}(J)$ is at least the largest eigenvalue of any principal submatrix. Then, observe that the bottom principal submatrix of $J$ all have roughly the same values!

More specifically, let $\gamma = t/n < 1/2$ be a constant as $n \to \infty$. Choose $m = m(n)$ where $m\to \infty$ and $m = o(n)$. Then, consider the bottom $m \times m$ principal submatrix $J_m$ of $J$, and note that the entries are all $\sqrt{\gamma(1-\gamma)} - o(1)$. We have $$\lambda_{\max}(J) \geq \lambda_{\max}(J_m) \geq \frac{1}{m} \mathbf{1}^\top J_m \mathbf{1} = 2\sqrt{\gamma(1-\gamma)} - o(1) \,.$$

> [!EXERCISE] Exercise
>
> This is tight! Show that the largest eigenvalue of $J$ is at most $2\sqrt{\gamma(1-\gamma)} + o(1)$.
