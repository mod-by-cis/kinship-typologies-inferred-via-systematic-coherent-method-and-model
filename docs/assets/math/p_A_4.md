# p A.4            

$$
            \begin{aligned}
            {\color{firebrick}{ih({\color{mediumblue}{i}})}}
            = & \lfloor \log_2({\color{mediumblue}{i}}) \rfloor
            \quad & \forall\, {\color{mediumblue}{i}}\,\in \{ {\color{mediumblue}{iLR}},\, {\color{mediumblue}{iRL}} \} \subset \mathbb{N}_{+}
            \\ \\
            \color{darkorchid}{\text{MAX}(\color{firebrick}{ih(\color{mediumblue}{i})})} = &
            \color{darkorchid}{\text{total}(\color{firebrick}{ih(\color{mediumblue}{i})})} = \\
            & \quad = 2^{({\color{firebrick}{ih}}+1)} - 1
            \quad & \forall \, {\color{firebrick}{ih}} \in \mathbb{N}_{0}
            \\ \\
            \color{darkorchid}{\text{MIN}(\color{firebrick}{ih(\color{mediumblue}{i})})} = &
            \color{darkorchid}{\text{count}(\color{firebrick}{ih(\color{mediumblue}{i})})} = \\
            & \quad = 2^{\color{firebrick}{ih}}
            \quad & \forall \, {\color{firebrick}{ih}} \in \mathbb{N}_{0}
            \\ \\
            \color{darkorchid}{\text{MIX}(\color{firebrick}{ih(\color{mediumblue}{i})})} = &
            \color{darkorchid}{\text{MIN}(\color{firebrick}{ih(\color{mediumblue}{i})})} +
            \color{darkorchid}{\text{MAX}(\color{firebrick}{ih(\color{mediumblue}{i})})} = \\
            = & \, (\color{mediumblue}{iLR} + \color{mediumblue}{iRL}) = \\
            & \quad = 3 \cdot 2^{\color{firebrick}{ih}} - 1
            \quad & \forall \, {\color{firebrick}{ih}} \in \mathbb{N}_{0}
            \end{aligned}
$$