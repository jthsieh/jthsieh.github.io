This note is the second of a 2-post series. In the [previous post](post.html?slug=mrrw-bound), I gave a proof the 1st McEliece-Rodemich-Rumsey-Welch (MRRW) bound. In this note, I will prove the new improved bound that follows from just one different design choice. (I will not discuss the improvement on the 2nd MRRW bound.)

I personally find [OpenAI's proof](https://cdn.openai.com/pdf/ten-proofs-oai.pdf) difficult to read, and it took quite a bit of effort to understand and internalize it. [Alrabiah and Guruswami's proof](https://arxiv.org/abs/2608.09347) is via an amazing connection to quantum channels. I haven't fully understood it, but I believe that there should be a purely classical proof (or as I call it, a quantum zero-knowledge proof).

This is my best effort to find a proof that feels like a sequence of natural logical steps that one could've come up with.

> [!NOTE] TLDR
>
> In the proof that I am presenting, it all comes down to designing a function $g : \{\pm1\}^n \to \mathbb{R}_{\geq 0}$ that has both non-negative *evaluations* and non-negative *Fourier coefficients*.
> 1.  To obtain the MRRW bound, one chooses $g(z) = h(z)^2$, where $h: \{\pm1\}^n \to \mathbb{R}$ has non-negative Fourier coefficients.
> 2.  To obtain the improved bound, one chooses $g(z) = \|H(z)\|_F^2$, where $H: \{\pm1\}^n \to \mathbb{R}^{r \times r}$ has *PSD* Fourier coefficients.
>
> The main technical step is to find $\lambda$ such that $(\langle z, \mathbf{1} \rangle-\lambda) g(z)$ has non-negative Fourier coefficients as well.
> In both cases, $\lambda$ is the Perron eigenvalue of some tridiagonal matrix.

**AI disclosure:** I used GPT-5.6 Sol to understand OpenAI's proof, but the interpretation and writing here are entirely by me.


## Recap of MRRW

Our goal is to design a function $f: \{\pm1\}^n \to \mathbb{R}$.

> [!NOTE] Goal: design a function $f$
>
> Given $\delta \in (0,1/2)$, design a function $f(z) = \sum_{S \subseteq [n]} a_S \chi_S(z)$ over $\{\pm1\}^n$ such that
>
> 1.  $a_S \geq 0$ for all $S \subseteq [n]$, and $a_{\varnothing} > 0$,
>
> 2.  $f(z) \leq 0$ for all $\left\langle z, \mathbf{1} \right\rangle \leq  \rho := 1-2\delta$.
>
> Then, conclude that $$A_2(n,\delta n) \leq \frac{f(\mathbf{1})}{a_{\varnothing}} .$$

Moreover, we used a design choice that automatically ensures the 2nd requirement.

> [!NOTE] Design choice for $f$
>
> Choose $f(z) = (\left\langle z,\mathbf{1} \right\rangle - \rho) g(z)$ such that $f$ and $g$ have non-negative Fourier coefficients, and $g(z) \geq 0$ for all $z$.

To derive the MRRW bound, we next make what is perhaps the most restrictive design choice. Since we require $g(z) \geq 0$ for all $z$, we set $g(z) = h(z)^2$, where $h(z) = \sum_{|S| \leq t} b_S \chi_S(z)$ is some degree-$t$ polynomial with all Fourier coefficients $b_S \geq 0$. Then, the argument follows the roadmap below:

1.  Understand how multiplication by $\left\langle z,\mathbf{1} \right\rangle$ acts on $h(z)$. Express the Fourier coefficients of $\left\langle z,\mathbf{1} \right\rangle \cdot h(z)$ as $A \vec{b}$ for an appropriate matrix $A$.

2.  Find the largest ([Perron-Frobenius](https://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem)) eigenvalue $\lambda = \lambda(t)$ of $A$, and set $(b_S)_{S}$ to be the corresponding eigenvector so that $(\left\langle z,\mathbf{1} \right\rangle - \lambda) \cdot h(z)$ has non-negative Fourier coefficients.

3.  Set $\rho = 1-2\delta = \lambda-o(1)$ and solve for $t$. Calculate $f(\mathbf{1})$ and $a_{\varnothing} = \mathbb{E}_{\mathbf{z}}[f(\mathbf{z})]$ to get the final bound.

The improved bound follows almost the exact same roadmap.

In the previous note, we saw a fact used repeatedly: if $h(z)$ and $h'(z)$ have non-negative Fourier coefficients, then $h(z)\cdot h'(z)$ also has non-negative Fourier coefficients. Let's take a closer look, $$h(z) h'(z) = \sum_{S \subseteq [n]} b_S \chi_S(z) \cdot \sum_{T \subseteq [n]} c_T \chi_T(z)
    = \sum_{S,T \subseteq [n]} b_S c_T \chi_S(z) \chi_T(z)
     = \sum_{U \subseteq [n]} \chi_U(z) \sum_{S\Delta T = U} b_S c_T .$$

Therefore, if $b_S, c_T \geq 0$, then the Fourier coefficients of $h \cdot h'$ are non-negative.

## Better design choice for $f$

There is a more general way to enforce non-negative Fourier coefficients!

> [!EXERCISE] Exercise
>
> If $A,B \in \mathbb{R}^{r \times r}$ are PSD matrices, then $\operatorname{tr}(AB) \geq 0$.

So, what if we replace the scalar coefficients of $h$ by *PSD matrices*?

> [!NOTE] Choose $H$ to have PSD matrix-valued Fourier coefficients.
>
> For each $S \subseteq [n]$, choose a PSD matrix $B_S \in \mathbb{R}^{r \times r}$ for some $r \in \mathbb{N}$. We again cap the degree at $t$ (chosen later), so $B_S = 0$ if $|S| > t$.
>
> Define $H: \{\pm1\}^n \to \mathbb{R}^{r \times r}$ as $$H(z) = \sum_{S \subseteq [n]: |S| \leq t} B_S \chi_S(z) .$$ Then, set $$f(z) = (\left\langle z,\mathbf{1} \right\rangle-\rho) \cdot \left\|H(z)\right\|_F^2 .$$

Again, we naturally have $f(z) \leq 0$ for $\left\langle z,\mathbf{1} \right\rangle \leq \rho$. Moreover, $$\left\|H(z)\right\|_F^2 =  \operatorname{tr}(H(z)^2)
    = \sum_{U \subseteq [n]} \chi_U(z) \sum_{S \Delta T = U} \operatorname{tr}(B_S B_T) .$$ Since $B_S, B_T \succeq 0$, we have $\operatorname{tr}(B_S B_T) \geq 0$, and thus $\|H(z)\|_F^2$ has non-negative Fourier coefficients!

In MRRW, we first look at $\left\langle z,\mathbf{1} \right\rangle \cdot h(z) = \sum_S c_S \chi_S(z)$, where each $c_S$ is a linear combination of $(b_S)_S$. The goal is to pick $b_S$'s such that $c_S \geq \lambda b_S$. This implies that $(\left\langle z,\mathbf{1} \right\rangle - \lambda) h(z)$ has non-negative Fourier coefficients.

Now, these coefficients are matrices, but we can basically do the same thing.

$$\left\langle z,\mathbf{1} \right\rangle \cdot H(z) = \frac{1}{n} \sum_{i\in [n]} z_i \sum_{S\subseteq [n]} B_S \chi_S(z)
    = \frac{1}{n} \sum_{T \subseteq [n]} \chi_T(z) \left(\sum_{i\in [n]} B_{T \Delta \{i\}}\right) .$$

We want every Fourier coefficient of $(\left\langle z,\mathbf{1} \right\rangle - \lambda) \cdot H(z)$ to be PSD. $$C_S := \frac{1}{n} \sum_{i \in [n]} B_{S\Delta \{i\}} \succeq \lambda \cdot B_S , \quad \forall S \subseteq [n] .$$ Note that for the boundary terms (outside the support of $H$), this is automatic because $B_S = 0$ and $C_S \succeq 0$.

**Why does this give an improvement?** We can already get a glimpse of where the improvement comes from. In the end, we will need to compare the two quantities: $\mathbb{E}_{\mathbf{z}} \|H(\mathbf{z})\|_F^2$ where $\mathbf{z}\sim \{\pm1\}^n$, and $\|H(\mathbf{1})\|_F^2$. $$\mathbb{E}_{\mathbf{z}} \|H(\mathbf{z})\|_F^2 = \sum_{|S|\leq t} \|B_S\|_F^2 ,$$ and $$\|H(\mathbf{1})\|_F^2 = \left\|\sum_{|S|\leq t} B_S\right\|_F^2 \leq N \sum_{|S| \leq t} \|B_S\|_F^2 ,$$ where $N = \sum_{\ell=0}^t \binom{n}{\ell}$. Thus, using Cauchy-Schwarz directly, we get a ratio of at most $N$ between the two. If we simply use this, it would be essentially the same as MRRW, as there is no real difference between matrix-valued and scalar-valued coefficients.

However, suppose each $B_S$ is rank $1$, and $\sum_{S} B_S \propto I$ (by symmetry of the construction), then we have $\|B_S\|_F^2 = \operatorname{tr}(B_S)^2$, and $$\mathbb{E}_{\mathbf{z}} \|H(\mathbf{z})\|_F^2 = \sum_{|S|\leq t} \operatorname{tr}(B_S)^2
    \geq N^{-1} \left(\operatorname{tr} \sum_{|S|\leq t} B_S\right)^2
    = \frac{r}{N} \left\|\sum_{|S|\leq t} B_S\right\|_F^2 .$$ This gives a ratio of at most $N/r$, saving an extra factor of $r$!

## Designing $H$

We need to choose the matrix-valued coefficients of $H$.

> [!NOTE] Design choice: Rank-1 coefficients
>
> Choose each $B_S$ to be rank 1, namely $B_S = b_{|S|} \cdot u_S u_S^\top$ for some scalar $b_{|S|} \geq 0$ and vector $u_S \in \mathbb{R}^r$. We cap the degree at $t$, so $b_\ell = 0$ for $\ell > t$.

Technically, we can absorb $b_{|S|}$ into $u_S$, but writing it this way allows us to normalize $u_S$ in a convenient way and solve for $b$ later.

To be honest, I don't know whether setting $B_S$ to have higher rank would improve the bound further. But as we will see, rank-1 coefficients simplify our goal a lot. In particular, it becomes a "vector problem" about $u_S$, and it makes the PSD inequality between $C_S$ and $B_S$ more tractable.

There are two kinds of terms in $C_S$. $$C_S = \frac{b_{|S|-1}}{n} \sum_{i\in S} u_{S \setminus \{i\}} u_{S \setminus \{i\}}^\top + \frac{b_{|S|+1}}{n} \sum_{i\notin S} u_{S \cup \{i\}} u_{S \cup \{i\}}^\top .$$

How do we compare this to $u_S u_S^\top$? We can just use Cauchy-Schwarz:

> [!EXERCISE] Exercise
>
> Let $u_1,\dots,u_m \in \mathbb{R}^r$ be vectors, and let $v = \sum_{i=1}^m u_i$. Then, $$\sum_{i=1}^m u_i u_i^\top \succeq \frac{1}{m} \cdot vv^\top .$$

Given this, there is a natural way to construct the vectors $u_S$. If we set $\{u_S\}_S$ such that $\sum_{i \in S} u_{S\setminus \{i\}}$ and $\sum_{i \notin S} u_{S\cup \{i\}} \propto u_S$, then we can directly use the above to compare $C_S$ with $B_S$. Moreover, we will choose the scaling $b_\ell$ later, so we can even assume that $\sum_{i \in S} u_{S\setminus \{i\}} = u_S$.

> [!NOTE] Design choice for the vectors $u_S$
>
> Choose vectors $\{u_S \in \mathbb{R}^r\}$ such that (except for the boundary terms) $$\begin{aligned} \sum_{i\in S} u_{S \setminus \{i\}} &= u_S , \\ \sum_{i\notin S} u_{S \cup \{i\}} &= \sigma_{|S|} \cdot u_S .  \end{aligned}$$ $\sigma_{|S|} \in \mathbb{R}$ depends only on $|S|$ due to symmetry.

These conditions imply that for $|S| = \ell$, $$C_S \succeq \left(\frac{1}{n \ell} b_{\ell-1} + \frac{\sigma_{\ell}^2}{n (n-\ell)} b_{\ell+1} \right)  u_S u_S^\top .$$ Then, to ensure $C_S \succeq \lambda B_S$, it suffices to solve the following tridiagonal system (again!),

$$\frac{1}{n \ell} b_{\ell-1} + \frac{\sigma_{\ell}^2}{n (n-\ell)} b_{\ell+1} \geq \lambda b_\ell .$$

> [!NOTE] Boundary terms
>
> Jumping ahead, we will set $b_\ell \neq 0$ only for $k \leq \ell \leq t$, where $k,t$ will be chosen later. Equivalently, we will assume $u_S = 0$ for $|S| < k$ and $|S| > t$. Obviously, the relations of $u_S$ won't be satisfied at the boundary, but that doesn't change our analysis much.

## Rotational invariance leads to Johnson eigenspaces

Here's an important observation: if we rotate every $u_S$ by an orthogonal matrix $R \in \mathbb{R}^{r\times r}$, then $B_S$ becomes $R B_S R^\top$. However, $\operatorname{tr}(B_S B_T)$, and therefore $\|H(z)\|_F^2$, do not change!

If we stack the vectors $(u_S)_S$ as rows of a matrix $\Phi \in \mathbb{R}^{N \times r}$, where $N = \sum_{\ell=0}^t \binom{n}{\ell}$, then $\Phi$ and $\Phi R$ are equivalent for us for any rotation matrix $R$. This means that we only care about the *column span* of $\Phi$ in $\mathbb{R}^N$, not the matrix itself! This allows us to think about subspaces instead of specific matrices.

> [!NOTE] Choosing an $r$-dimensional subspace in $\mathbb{R}^N$
>
> It remains to design an $r$-dimensional subspace in $\mathbb{R}^N$ such that, for any $\phi$ in the subspace (indexed by $S \subseteq [n]$), $$\begin{aligned} \sum_{i\in S} \phi(S \setminus \{i\}) &= \phi(S) , \\ \sum_{i\notin S} \phi(S \cup \{i\}) &= \sigma_{|S|} \cdot \phi(S) .  \end{aligned}$$

This is how the *Johnson eigenspaces* and the *up* and *down* operators arise! First, we can naturally decompose $\phi$ as $$\phi = \bigoplus_{\ell=0}^t \phi_\ell ,$$ where $\phi_\ell \in \mathbb{R}^{\binom{n}{\ell}}$ is the part of $\phi$ indexed by sets with $|S| = \ell$.

Then, define the up and down operators: for $|S| = \ell$, $$\begin{aligned}
    (U \phi_{\ell-1})(S) &= \sum_{i\in S} \phi_{\ell-1} (S\setminus \{i\}) \\
    (D\phi_{\ell+1})(S) &= \sum_{i\notin S} \phi_{\ell+1}(S\cup \{i\}) .
\end{aligned}$$ **Notation:** Technically, this is a slight abuse of notation. I will write $U_\ell: \mathbb{R}^{\binom{n}{\ell}} \to \mathbb{R}^{\binom{n}{\ell+1}}$ and $D_\ell : \mathbb{R}^{\binom{n}{\ell}} \to \mathbb{R}^{\binom{n}{\ell-1}}$ when I want to specify that they act on the $\ell$-th level. However, it is much cleaner to just omit the $\ell$ dependence and let $U, D$ act on any $\phi_{\ell}$, so that we can use notations like $U^{\ell-k}$ instead of writing $U_{\ell-1} U_{\ell-2} \cdots U_{k}$. Note also that the normalization doesn't matter. Some people define $U$ and $D$ to be the average instead of the sum.

Now, our requirements for $\phi$ can be rewritten as $$\begin{aligned}
    U\phi_{\ell-1} &= \phi_\ell , \\
    D \phi_{\ell+1} &= \sigma_{\ell} \phi_\ell .
\end{aligned}$$

These give the following.

> [!NOTE] Relations between $\phi_{\ell}$
>
> - $\phi_{\ell} = U \phi_{\ell-1} = U^2 \phi_{\ell-2} = U^3 \phi_{\ell-3} \cdots$.
>
> - $D \phi_{\ell+1} = D U \phi_{\ell} \propto \phi_{\ell} \implies$ $\phi_{\ell}$ is an eigenvector of $DU$ (more specifically, $D_{\ell+1} U_\ell$, the $\binom{n}{\ell} \times \binom{n}{\ell}$ matrix representing the up-down walk from level $\ell$).

If you've seen Johnson schemes before, these relations should look very familiar!

## Johnson schemes

If you haven't seen Johnson schemes (or more generally [association schemes](https://www.math.uwaterloo.ca/~cgodsil/pdfs/assoc2.pdf)) before, this is a good place to meet them! They have a remarkably clean structure, and the relations above arise very naturally from it.

Fix $\ell < n/2$. The Johnson scheme is the set of $\binom{n}{\ell} \times \binom{n}{\ell}$ matrices (indexed by $\ell$-subsets of $[n]$) that are *set symmetric*. That is, $M(S,T)$ depends only on $|S \cap T|$.

> [!EXERCISE] Exercise (This is a magical fact!)
>
> All matrices in the Johnson scheme commute. Thus, they all share the same eigenspaces.

The eigenspaces are very well studied. In particular, they can be characterized using the up and down operators.

> [!EXERCISE] Exercise
>
> Let $E_k = \ker(D_k) \subseteq \mathbb{R}^{\binom{n}{k}}$.
>
> Let $W_{k,\ell} = U^{\ell-k} E_k$ be a subspace in $\mathbb{R}^{\binom{n}{\ell}}$. Then,
>
> 1.  $\dim(W_{k,\ell}) = \dim(E_k) = \binom{n}{k} - \binom{n}{k-1}$ (where $\binom{n}{-1} = 0$).
>
> 2.  $W_{0,\ell}, W_{1,\ell},\dots, W_{\ell,\ell}$ are mutually orthogonal subspaces of $\mathbb{R}^{\binom{n}{\ell}}$.

Recall that we need $\phi_{\ell}$ to be an eigenvector of $DU$ (or more precisely, $D_{\ell+1} U_{\ell}$). The following are some important facts about $DU$ and $UD$.

> [!EXERCISE] Exercise
>
> Restrict to the $\ell$-th level and write $DU = D_{\ell+1} U_{\ell}$ and $UD = U_{\ell-1} D_{\ell}$, both $\binom{n}{\ell} \times \binom{n}{\ell}$ matrices.
>
> 1.  Both $DU$ and $UD$ belong to the Johnson scheme.
>
> 2.  Let $A_{\ell}$ be the adjacency matrix of the Johnson graph, where $A_{\ell}(S, T) = 1$ iff $|S \Delta T| = 2$ (differ by 1 addition and 1 deletion). Then, $$DU = (n-\ell) \cdot I + A_{\ell} , \quad UD = \ell \cdot I + A_{\ell} .$$
>
> 3.  For any $k \leq \ell$ and any vector $w\in W_{k,\ell}$, $$DUw = (\ell-k+1) (n-k-\ell) w .$$ (Write $w = U^{\ell-k} v$ for some $v\in E_k$ where $D v = 0$, and induct on $\ell$.)

## Choosing the subspace via the Johnson eigenspaces

Recall that we want to choose an $r$-dimensional eigenspace in $\mathbb{R}^N$. Moreover, for any vector $\phi = \bigoplus_{\ell=0}^t \phi_{\ell}$, we need $\phi_{\ell} = U \phi_{\ell-1} = U^2 \phi_{\ell-2} \cdots$. We cannot start all the way from $\phi_0$, since $\phi_0$ is just a scalar (i.e., 1-dimensional subspace). This won't give us $r > 1$ dimensions.

How about we start with some $\phi_k$, and assume $\phi_{\ell} = 0$ for $\ell < k$. Of course, $\phi_k \neq U \phi_{k-1}$, but this is a boundary term that we can ignore because it gets multiplied by $b_{k-1}=0$. Moreover, we will assume that $\phi_k \in E_k$, meaning that $D \phi_k = 0$. This way, each $\phi_\ell \in W_{k,\ell}$. (See [the previous section](#johnson-schemes) for a reminder of the Johnson eigenspaces.)

Then, by $D\phi_{\ell+1} = \sigma_{\ell} \phi_{\ell}$, we can calculate $\sigma_\ell$ exactly. Since $\phi_{\ell} \in W_{k,\ell}$, $$D \phi_{\ell+1} = D U \phi_{\ell} = (\ell-k+1)(n-k-\ell) \phi_{\ell} \implies
    \sigma_{\ell} =  (\ell-k+1)(n-k-\ell)  .$$

Recall that $\Phi$ is the matrix obtained by stacking the vectors $(u_S)_S$ as rows. We can think of $\Phi$ as an operator mapping $E_k \to \mathbb{R}^N$. The dimension $$r = \dim(E_k) = \binom{n}{k} - \binom{n}{k-1} = 2^{n \cdot (h_2(k/n) - o(1))} .$$ Moreover, $$\|\phi_{\ell}\|_2^2 = \left\langle U \phi_{\ell-1}, U \phi_{\ell-1} \right\rangle
    = \left\langle \phi_{\ell-1}, DU \phi_{\ell-1} \right\rangle
    = \sigma_{\ell-1} \|\phi_{\ell-1}\|_2^2 .$$

> [!EXERCISE] Exercise
>
> Show that this implies $\sum_{|S| = \ell} u_S u_S^\top \propto I$.

## Tridiagonal system and the Perron eigenvalue

We now have a concrete tridiagonal system on $b_k, \dots, b_t$, where we assume $b_{k-1} = b_{t+1} = 0$.

$$\frac{1}{n \ell} b_{\ell-1} + \frac{\sigma_{\ell}^2}{n (n-\ell)} b_{\ell+1} \geq \lambda b_\ell .$$

We can write this as $$Q \vec{b} \geq \lambda \vec{b}, \quad \text{where} \quad
    Q = \frac{1}{n}
    \begin{pmatrix}
        0 & \frac{\sigma_k^2}{n-k} \\
        \frac{1}{k+1} & 0 & \frac{\sigma_{k+1}^2}{n-k-1} \\
          & \frac{1}{k+2} & 0 & \frac{\sigma_{k+2}^2}{n-k-2} \\
          &  & \ddots & \ddots & \ddots \\
          &  &  & \frac{1}{t-1} & 0 & \frac{\sigma_{t-1}^2}{n-t+1} \\
          &  &  &  & \frac{1}{t} & 0
    \end{pmatrix} \in \mathbb{R}^{(t-k+1) \times (t-k+1)} .$$

> [!NOTE] Choice for $b$
>
> Choose $\vec{b}$ to be the Perron eigenvector of $Q$, which has non-negative entries.

> [!EXERCISE] Exercise
>
> If $k = 0$, then $Q$ is exactly the $(t+1)\times (t+1)$ matrix that shows up in the previous note on the MRRW bound.

To find the Perron eigenvalue of $Q$, we can first turn it into a symmetric matrix by finding a diagonal matrix $D$ such that $J = DQD^{-1}$ is symmetric. Note that since $\det(xI - Q) = \det(xI-J)$, the two matrices have the same eigenvalues.

In our case, each off-diagonal entry of $J$ is the geometric mean of the two corresponding entries in $Q$, that is, $J_{\ell,\ell+1} = J_{\ell+1,\ell} = \frac{\sigma_{\ell}}{n\sqrt{(\ell+1)(n-\ell)}}$. $$J = \frac{1}{n}
    \begin{pmatrix}
        0 & \frac{\sigma_k}{\sqrt{(k+1)(n-k)}} \\
        \frac{\sigma_k}{\sqrt{(k+1)(n-k)}} & 0 & \frac{\sigma_{k+1}}{\sqrt{(k+2)(n-k-1)}} \\

          &  \ddots & \ddots & \ddots \\
          &  & \frac{\sigma_{t-2}}{\sqrt{(t-1)(n-t+2)}} & 0 & \frac{\sigma_{t-1}}{\sqrt{t(n-t+1)}} \\
          &  &  & \frac{\sigma_{t-1}}{\sqrt{t(n-t+1)}} & 0
    \end{pmatrix} .$$

We only need a lower bound on the largest eigenvalue of $J$. We will use the same trick as we did in the previous note: $\lambda_{\max}(J)$ is at least the largest eigenvalue of any principal submatrix. Moreover, the bottom principal submatrix of $J$ all have roughly the same values!

Let $a = t/n$ and $b = k/n$, both constants as $n \to \infty$. Choose $m = m(n)$ where $m\to \infty$ and $m = o(n)$. Then, consider the bottom $m \times m$ principal submatrix $J_m$ of $J$. The entries are all $\frac{(a-b)(1-a-b)}{\sqrt{a(1-a)}}- o(1)$. Define $$\Gamma(a,b) := \frac{2(a-b)(1-a-b)}{\sqrt{a(1-a)}} .$$ We have $$\lambda_{\max}(J) \geq \lambda_{\max}(J_m) \geq \frac{1}{m} \mathbf{1}^\top J_m \mathbf{1} = \Gamma(a,b) - o(1) .$$

## Putting things together

We chose $f(z) = (\left\langle z,\mathbf{1} \right\rangle - \rho) \cdot \|H(z)\|_F^2$, where $H(z) = \sum_{k \leq |S| \leq t} B_S \chi_S(z)$ with rank-1 PSD coefficients $B_S = b_{|S|} u_S u_S^\top \in \mathbb{R}^{r\times r}$. Here, we cap the degrees between $k = bn$ and $t = an$, where $b < a < 1/2$ are constants. The dimension $r = 2^{n (h_2(b) -o(1))}$. Moreover, we know that $\sum_{S} B_S \propto I$.

We can choose $a,b$ such that $\rho = 1-2\delta = \lambda - o(1)$, where $\lambda = \Gamma(a,b)-o(1)$. We have established that for $\left\langle z,\mathbf{1} \right\rangle \cdot H(z) = \sum_{S} C_S \chi_S(z)$, we have $C_S \succeq \lambda B_S$. Thus, $(\left\langle z,\mathbf{1} \right\rangle - \lambda) \cdot H(z)$ and $H(z)$ both have PSD coefficients. Thus, $$f(z) = (\left\langle z,\mathbf{1} \right\rangle - \lambda) \|H(z)\|_F^2 + (\lambda-\rho) \|H(z)\|_F^2$$ has non-negative Fourier coefficients.

Let $\mathbf{z}\sim \{\pm1\}^n$ be uniformly random. We saw [earlier](#better-design-choice-for-f) that the ratio between $\|H(\mathbf{1})\|_F^2$ and $\mathbb{E}\|H(\mathbf{z})\|_F^2$ is at most $N/r$, where $N = \sum_{\ell=k}^t \binom{n}{\ell} = 2^{n (h_2(a) + o(1))}$, and thus $N/r = 2^{n (h_2(a)-h_2(b)+o(1))}$. Let's finish the calculation. $$a_{\varnothing} = \mathbb{E} \left[ (\left\langle \mathbf{z},\mathbf{1} \right\rangle - \lambda) \|H(\mathbf{z})\|_F^2 \right] + (\lambda-\rho) \cdot \mathbb{E} \left[\|H(\mathbf{z})\|_F^2\right]
    \geq  (\lambda-\rho) \cdot \mathbb{E} \left[\|H(\mathbf{z})\|_F^2\right] .$$ Therefore, $$\begin{aligned}
    \frac{f(\mathbf{1})}{a_{\varnothing}}
    &\leq \frac{(1-\rho) \cdot \|H(\mathbf{1})\|_F^2}{(\lambda-\rho) \cdot \mathbb{E} \left[\|H(\mathbf{z})\|_F^2\right] }
    \leq  \frac{1-\rho}{\lambda-\rho} \cdot \frac{N}{r}
    = \frac{1-\rho}{\lambda-\rho} \cdot 2^{n(h_2(a) - h_2(b) + o(1))}  .
\end{aligned}$$

The $\frac{1-\rho}{\lambda-\rho}$ term is negligible compared to the exponential term. Thus, we get the final bound:

> [!NOTE] Improved bound
>
> $$R_2(\delta) = \limsup_{n\to\infty} \frac{1}{n} \log_2 A_2(n,\delta n) \leq \kappa(\delta) ,$$ where $$\kappa(\delta) = \inf_{\substack{0 \leq b < a < 1/2 \\ \Gamma(a,b) > 1-2\delta}} (h_2(a) - h_2(b)) , \quad \Gamma(a,b) =  \frac{2(a-b)(1-a-b)}{\sqrt{a(1-a)}} .$$
