$$
\begin{align*}
  \\\underset{ \bbox[cornflowerblue,4px]{\mathcal{i}} \in \mathbb{N}^{+} }{\forall}
  \;\underset{ \bbox[mediumpurple,4px]{\mathcal{j}}\in \,\mathbb{N}^{+}  }{\exists!}& 
  \Big(
  \bbox[darkkhaki,6px]{\mathcal{min}} \leq 
  \bbox[mediumpurple,6px]{\mathcal{j}} \leq
  \bbox[darkkhaki,6px]{\mathcal{max}}\quad\land\quad
  \bbox[mediumpurple,6px]{\mathcal{j}} =
  \bbox[yellowgreen,6px]{\mathcal{mix}} -
  \bbox[cornflowerblue,6px]{\mathcal{i}}
  \Big)
  \\\underset{ \bbox[mediumpurple,4px]{\mathcal{j}} \in \mathbb{N}^{+} }{\forall}
  \;\underset{ \bbox[cornflowerblue,4px]{\mathcal{i}}\in \,\mathbb{N}^{+} }{\exists!}& 
  \Big(
  \bbox[darkkhaki,6px]{\mathcal{min}} \leq 
  \bbox[cornflowerblue,6px]{\mathcal{i}} \leq
  \bbox[darkkhaki,6px]{\mathcal{max}}\quad\land\quad
  \bbox[cornflowerblue,6px]{\mathcal{i}} =
  \bbox[yellowgreen,6px]{\mathcal{mix}} -
  \bbox[mediumpurple,6px]{\mathcal{j}}
  \Big)
  \\ 
\end{align*}
$$

$$
\begin{align*}
  \bbox[darkkhaki,8px]{\mathcal{min}}\,&+\,
  \bbox[darkkhaki,8px]{\mathcal{max}}=
  \bbox[yellowgreen,8px]{\mathcal{mix}}\;\quad
  &\bbox[darkkhaki,8px]{\mathcal{min}} =\, 2^{\bbox[silver,4px]{\mathcal{h}}}\; 
  \bbox[darkkhaki,8px]{\mathcal{max}}=\, 2^{(\bbox[silver,4px]{\mathcal{h}}+1)}-1\; 
  \\
  \bbox[cornflowerblue,8px]{\mathcal{i}}\,&+\,
  \bbox[mediumpurple,8px]{\mathcal{j}}=
  \bbox[yellowgreen,8px]{\mathcal{mix}}\;\quad
  &\bbox[silver,8px]{\mathcal{h}}=\,\lfloor\log_2(\bbox[cornflowerblue,4px]{\mathcal{i}}\lor
  \bbox[mediumpurple,3px]{\mathcal{j}})\rfloor
  \\
  
  \end{align*}
  $$

$$

\begin{align*}
&\operatorname{adic}_{2V}(x)\;=\;\max \left\{ \;k \in \mathbb{N} : 2^k \mid x \right\} \\[1ex]

&\bbox[turquoise,8px]{\mathcal{n}} = \operatorname{adic}_{2V}(\bbox[cornflowerblue,4px]{\mathcal{i}}), \quad\quad\quad
\bbox[palevioletred,8px]{\mathcal{v}} = \operatorname{adic}_{2V}(\bbox[mediumpurple,4px]{\mathcal{j}}) \\[1ex]

&\bbox[powderblue,8px]{\mathcal{m}} = \left( \frac{\bbox[cornflowerblue,4px]{\mathcal{i}}}{2^{\bbox[turquoise,4px]{\mathcal{n}}}} \right) + 1, \quad
\bbox[plum,8px]{\mathcal{w}} = \left( \frac{\bbox[mediumpurple,4px]{\mathcal{j}}}{2^{\bbox[palevioletred,4px]{\mathcal{v}}}} \right) + 2
\end{align*}
$$

  $$
  \\
  \begin{array}{r|c|c|c|c|c|c|c|c|c|c|c|c} 
  
  {\bbox[powderblue,8px]{m}}_{\bbox[turquoise,4px]{n}} & 
  {\bbox[powderblue,8px]{2}}_{\bbox[turquoise,4px]{0}} && 
  {\bbox[powderblue,8px]{2}}_{\bbox[turquoise,4px]{1}} & 
  {\bbox[powderblue,8px]{4}}_{\bbox[turquoise,4px]{0}} && 
  {\bbox[powderblue,8px]{2}}_{\bbox[turquoise,4px]{2}} & 
  {\bbox[powderblue,8px]{6}}_{\bbox[turquoise,4px]{0}} & 
  {\bbox[powderblue,8px]{4}}_{\bbox[turquoise,4px]{1}} & 
  {\bbox[powderblue,8px]{8}}_{\bbox[turquoise,4px]{0}} && 
  {\bbox[powderblue,8px]{2}}_{\bbox[turquoise,4px]{3}} & 
  {\bbox[powderblue,8px]{\dotsc}}_{\bbox[turquoise,4px]{\dotsc}} \\ \hline
  
  
  {\bbox[plum,8px]{w}}_{\bbox[palevioletred,4px]{v}} &
  {\bbox[plum,8px]{3}}_{\bbox[palevioletred,4px]{0}}  &&
  {\bbox[plum,8px]{5}}_{\bbox[palevioletred,4px]{0}} &
  {\bbox[plum,8px]{3}}_{\bbox[palevioletred,4px]{1}} &&
  {\bbox[plum,8px]{9}}_{\bbox[palevioletred,4px]{0}} &
  {\bbox[plum,8px]{5}}_{\bbox[palevioletred,4px]{1}} &
  {\bbox[plum,8px]{7}}_{\bbox[palevioletred,4px]{0}} &
  {\bbox[plum,8px]{3}}_{\bbox[palevioletred,4px]{2}} &&
  {\bbox[plum,8px]{17}}_{\bbox[palevioletred,4px]{0}} &
  {\bbox[plum,8px]{\dotsc}}_{\bbox[palevioletred,4px]{\dotsc}} \\ \hline

  {\bbox[cornflowerblue,8px]{i}}_{\bbox[silver,4px]{h}} &
  {\bbox[cornflowerblue,8px]{1}}_{\bbox[silver,4px]{0}} &&
  {\bbox[cornflowerblue,8px]{2}}_{\bbox[silver,4px]{1}} &
  {\bbox[cornflowerblue,8px]{3}}_{\bbox[silver,4px]{1}} &&
  {\bbox[cornflowerblue,8px]{4}}_{\bbox[silver,4px]{2}} &
  {\bbox[cornflowerblue,8px]{5}}_{\bbox[silver,4px]{2}} &
  {\bbox[cornflowerblue,8px]{6}}_{\bbox[silver,4px]{2}} &
  {\bbox[cornflowerblue,8px]{7}}_{\bbox[silver,4px]{2}} &&
  {\bbox[cornflowerblue,8px]{8}}_{\bbox[silver,4px]{3}} &
  {\bbox[cornflowerblue,8px]{\dotsc}}_{\bbox[silver,4px]{\dotsc}} \\ \hline
  
  
  {\bbox[mediumpurple,8px]{j}}_{\bbox[silver,4px]{h}} &
  {\bbox[mediumpurple,8px]{1}}_{\bbox[silver,4px]{0}} &&
  {\bbox[mediumpurple,8px]{3}}_{\bbox[silver,4px]{1}} &
  {\bbox[mediumpurple,8px]{2}}_{\bbox[silver,4px]{1}} &&
  {\bbox[mediumpurple,8px]{7}}_{\bbox[silver,4px]{2}} &
  {\bbox[mediumpurple,8px]{6}}_{\bbox[silver,4px]{2}} &
  {\bbox[mediumpurple,8px]{5}}_{\bbox[silver,4px]{2}} &
  {\bbox[mediumpurple,8px]{4}}_{\bbox[silver,4px]{2}} &&
  {\bbox[mediumpurple,8px]{15}}_{\bbox[silver,4px]{3}} &
  {\bbox[mediumpurple,8px]{\dotsc}}_{\bbox[silver,4px]{\dotsc}} \\ \hline
  
  \bbox[yellowgreen,8px]{mix} & 
  \bbox[yellowgreen,8px]{2} && 
  \bbox[yellowgreen,8px]{5} & 
  \bbox[yellowgreen,8px]{5} && 
  \bbox[yellowgreen,8px]{11} & 
  \bbox[yellowgreen,8px]{11} & 
  \bbox[yellowgreen,8px]{11} & 
  \bbox[yellowgreen,8px]{11} && 
  \bbox[yellowgreen,8px]{23} & 
  \bbox[yellowgreen,8px]{\dotsc} \\ \hline  
  
  \bbox[darkkhaki,8px]{min} & 
  \bbox[darkkhaki,8px]{1} && 
  \bbox[darkkhaki,8px]{2} & 
  \bbox[darkkhaki,8px]{2} && 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} && 
  \bbox[darkkhaki,8px]{8} & 
  \bbox[darkkhaki,8px]{\dotsc} \\ \hline
  
  \bbox[darkkhaki,8px]{max} & 
  \bbox[darkkhaki,8px]{1} && 
  \bbox[darkkhaki,8px]{3} & 
  \bbox[darkkhaki,8px]{3} && 
  \bbox[darkkhaki,8px]{7} & 
  \bbox[darkkhaki,8px]{7} & 
  \bbox[darkkhaki,8px]{7} & 
  \bbox[darkkhaki,8px]{7} && 
  \bbox[darkkhaki,8px]{15} & 
  \bbox[darkkhaki,8px]{\dotsc} \\
  
  \end{array}
  \\
  
$$

$$
\begin{equation}
 \left.\begin{aligned}
        childL\;\bbox[cornflowerblue,8px]{i} = 2  \cdot \bbox[cornflowerblue,8px]{i}&\\
        childR\;\bbox[cornflowerblue,8px]{i} = 2  \cdot \bbox[cornflowerblue,8px]{i}+1&
       \end{aligned}
 \right\}
 \quad\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j}\geq1\quad 
\left\{\begin{aligned}
        &2 \cdot \bbox[mediumpurple,8px]{j}=childL\;\bbox[mediumpurple,8px]{j} \\
        &2 \cdot \bbox[mediumpurple,8px]{j}+1=childR\;\bbox[mediumpurple,8px]{j}\\
       \end{aligned}
 \right.
\end{equation}
$$

$$
\begin{equation}
 \left.\begin{aligned}
        parent\;\bbox[cornflowerblue,8px]{i} = \left\lfloor \dfrac{{\bbox[cornflowerblue,8px]{i}}}{2}\right\rfloor&
       \end{aligned}
 \right\}
 \quad\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j}\geq2\quad 
\left\{\begin{aligned}
        &\left\lfloor \dfrac{{\bbox[mediumpurple,8px]{j}}}{2}\right\rfloor=parent\;\bbox[mediumpurple,8px]{j}\\
       \end{aligned}
 \right.
\end{equation}
$$


$$
\begin{equation}
 \left.\begin{aligned}
        silbing\;\bbox[cornflowerblue,8px]{i} = \bbox[cornflowerblue,8px]{i}+1&
       \end{aligned}
 \right\}
 \quad\underset{(\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j})\,mod\,2\,=\,0}{\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j}\geq2}\quad 
\left\{\begin{aligned}
        &\bbox[mediumpurple,8px]{j}-1=silbing\;\bbox[mediumpurple,8px]{j}\\
       \end{aligned}
 \right.
\end{equation}
$$

$$
\begin{equation}
 \left.\begin{aligned}
        silbing\;\bbox[cornflowerblue,8px]{i} = \bbox[cornflowerblue,8px]{i}-1&
       \end{aligned}
 \right\}
 \quad\underset{(\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j})\,mod\,2\,=\,1}{\bbox[cornflowerblue,8px]{i},\,\bbox[mediumpurple,8px]{j}\geq2}\quad 
\left\{\begin{aligned}
        &\bbox[mediumpurple,8px]{j}+1=silbing\;\bbox[mediumpurple,8px]{j}\\
       \end{aligned}
 \right.
\end{equation}
$$




