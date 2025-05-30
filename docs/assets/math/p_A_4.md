$$


\begin{align*}
  \\
  \underset{
    \bbox[cornflowerblue,4px]{\mathcal{i}} \in \mathbb{N}^{+}
  }{\forall}
  \;\underset{
    \bbox[mediumpurple,4px]{\mathcal{j}}\in \,\mathbb{N}^{+} 
  }{\exists!}& 
  \Big(\bbox[darkkhaki,6px]{\mathcal{min}} 
  \leq \bbox[mediumpurple,6px]{\mathcal{j}} \leq
  \bbox[darkkhaki,6px]{\mathcal{max}} \land
  \bbox[mediumpurple,6px]{\mathcal{j}} =
  \bbox[palevioletred,6px]{\mathcal{mix}} -
  \bbox[cornflowerblue,6px]{\mathcal{i}}
  \Big)
  \\
  \underset{
    \bbox[mediumpurple,4px]{\mathcal{j}} \in \mathbb{N}^{+}
  }{\forall}
  \;\underset{
    \bbox[cornflowerblue,4px]{\mathcal{i}}\in \,\mathbb{N}^{+}
  }{\exists!}& 
  \Big(\bbox[darkkhaki,6px]{\mathcal{min}} 
  \leq \bbox[cornflowerblue,6px]{\mathcal{i}} \leq
  \bbox[darkkhaki,6px]{\mathcal{max}} \land
  \bbox[cornflowerblue,6px]{\mathcal{i}} =
  \bbox[palevioletred,6px]{\mathcal{mix}} -
  \bbox[mediumpurple,6px]{\mathcal{j}}
  \Big)
  \\
  \\
  \bbox[darkkhaki,8px]{\mathcal{min}}\,+\,\bbox[darkkhaki,8px]{\mathcal{max}}&=\bbox[palevioletred,8px]{\mathcal{mix}}\;\quad
  \bbox[darkkhaki,8px]{\mathcal{min}} =\, 2^{\bbox[yellowgreen,4px]{\mathcal{h}}}\; 
  \bbox[darkkhaki,8px]{\mathcal{max}}=\, 2^{(\bbox[yellowgreen,4px]{\mathcal{h}}+1)}-1\; 
  \\
    \bbox[cornflowerblue,8px]{\mathcal{i}}\,+\,\bbox[mediumpurple,8px]{\mathcal{j}}&=\bbox[palevioletred,8px]{\mathcal{mix}}\;\quad\bbox[yellowgreen,8px]{\mathcal{h}}=\,\lfloor\log_2(\bbox[cornflowerblue,4px]{\mathcal{i}}\lor
  \bbox[mediumpurple,3px]{\mathcal{j}})\rfloor
  \\
  
  \end{align*}
  $$

  $$
  \\
  \begin{array}{r|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c|c} 
  
  \bbox[cornflowerblue,8px]{i} & 
  \bbox[cornflowerblue,8px]{1} && 
  \bbox[cornflowerblue,8px]{2} & 
  \bbox[cornflowerblue,8px]{3} && 
  \bbox[cornflowerblue,8px]{4} & 
  \bbox[cornflowerblue,8px]{5} & 
  \bbox[cornflowerblue,8px]{6} & 
  \bbox[cornflowerblue,8px]{7} && 
  \bbox[cornflowerblue,8px]{8} & 
  \bbox[cornflowerblue,8px]{9} & 
  \bbox[cornflowerblue,8px]{10}&  
  \bbox[cornflowerblue,8px]{\dotsc} \\ \hline
  
  
  \bbox[mediumpurple,8px]{j} &
  \bbox[mediumpurple,8px]{1} &&
  \bbox[mediumpurple,8px]{3} &
  \bbox[mediumpurple,8px]{2} &&
  \bbox[mediumpurple,8px]{7} &
  \bbox[mediumpurple,8px]{6} &
  \bbox[mediumpurple,8px]{5} &
  \bbox[mediumpurple,8px]{4} &&
  \bbox[mediumpurple,8px]{15} &
  \bbox[mediumpurple,8px]{14} &
  \bbox[mediumpurple,8px]{13} & 
  \bbox[mediumpurple,8px]{\dotsc} \\ \hline
  
  \bbox[palevioletred,8px]{mix} & 
  \bbox[palevioletred,8px]{2} && 
  \bbox[palevioletred,8px]{5} & 
  \bbox[palevioletred,8px]{5} && 
  \bbox[palevioletred,8px]{11} & 
  \bbox[palevioletred,8px]{11} & 
  \bbox[palevioletred,8px]{11} & 
  \bbox[palevioletred,8px]{11} && 
  \bbox[palevioletred,8px]{23} & 
  \bbox[palevioletred,8px]{23} & 
  \bbox[palevioletred,8px]{23} & 
  \bbox[palevioletred,8px]{\dotsc} \\ \hline  
  
  \bbox[darkkhaki,8px]{min} & 
  \bbox[darkkhaki,8px]{1} && 
  \bbox[darkkhaki,8px]{2} & 
  \bbox[darkkhaki,8px]{2} && 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} & 
  \bbox[darkkhaki,8px]{4} && 
  \bbox[darkkhaki,8px]{8} & 
  \bbox[darkkhaki,8px]{8} & 
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
  \bbox[darkkhaki,8px]{15} & 
  \bbox[darkkhaki,8px]{15} & 
  \bbox[darkkhaki,8px]{\dotsc} \\ \hline
  
  \bbox[yellowgreen,8px]{h} & 
  \bbox[yellowgreen,8px]{0} && 
  \bbox[yellowgreen,8px]{1} & 
  \bbox[yellowgreen,8px]{1} && 
  \bbox[yellowgreen,8px]{2} & 
  \bbox[yellowgreen,8px]{2} & 
  \bbox[yellowgreen,8px]{2} & 
  \bbox[yellowgreen,8px]{2} && 
  \bbox[yellowgreen,8px]{3} & 
  \bbox[yellowgreen,8px]{3} & 
  \bbox[yellowgreen,8px]{3} & 
  \bbox[yellowgreen,8px]{\dotsc} \\ 
  
  \end{array}
  \\
  
$$
