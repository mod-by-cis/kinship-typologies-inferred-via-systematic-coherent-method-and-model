function rangeTo(h: number): number[] {
  return Array.from({ length: h + 1 }, (_, i) => i);
}
function tab(space: number): string {
  return " ".repeat(space);
}
function rangeOf(h: number): number[] {
  const length = 2 ** (h + 1) - 1;
  return Array.from({ length }, (_, i) => i);
}

function flatArrayOfArrayWithMirror(Arr: string[][]): {
  LR: string[];
  RL: string[];
  H: number[];
} {
  
  const LR:string[] = [];
  const RL:string[] = [];
  const H: number[] = Arr.flatMap((row,h)=>row.map((_cell)=>h));
  Arr.forEach(row=>{
    for (let iLR = 0, iRL=row.length-1; iLR < row.length; iLR++, iRL--) {
      LR.push(row[iLR]);
      RL.push(row[iRL]);
      //console.log(iLR, iRL);
    }
  });
  return {LR,RL,H};
}


function dotBLOKI_nodes(
  h: number,
  nodesNAME: [string, string, string],
): string[][] {
  return rangeTo(h).map((xH) =>
    xH == 0
      ? ((xH0) => {
        return [xH0];
      })(`${nodesNAME[0]}1`)
      : (() => {
        const aA = 2 ** xH - 1;
        const bA = 2 ** xH - xH;
        let aN = aA - 1;
        let bN = bA - 1;
        return rangeOf(xH).map((o) => {
          if (o % 2 == 0) aN++;
          if (o % 2 == 1) bN++;
          return o % 2 == 0 ? `${nodesNAME[1]}${aN}` : `${nodesNAME[2]}${bN}`;
        });
      })()
  );
}

function dotBLOKI_subgraphs(nodeBLOK: string[][], s: number) {
  return nodeBLOK.map((v, n) => {
    const subgraph = ((s, n, v) => {
      return `
    subgraph h${n} {
    ${tab(s)}label = "h=${n}";
    ${tab(s)}rank = same; ${v.map((w) => `${w};`).join(" ")}
    }`;
    })(s, n, v);
    return subgraph;
  }).join("").trimEnd();
}
function dotBLOKI_styleByLabel(label: "S" | "L" | "R" | "C"| "iLR+"| "iRL+"):string{
  switch (label) {
    case "L": return `color="#F89FBB", fontcolor="#B5627D", penwidth=4,decorate=true`;
    case "R": return `color="#C0B0FF", fontcolor="#8373BC", penwidth=4,decorate=true`;
    case "C": return `color="#BEBEBE", fontcolor="#808080", penwidth=4,decorate=true`;
    case "S": return `color="#111010", fontcolor="#605F5F", penwidth=4,decorate=true`;
    case "iLR+": return `color="#E0B767", fontcolor="#A07923", penwidth=2`;
    case "iRL+": return `color="#A3CD82", fontcolor="#678E45", penwidth=2`;
  }
}

function dotBLOKI_children(
  nodeBLOK: string[][],
  nodesNAME: [string, string, string],
  s: number,
) {
  return nodeBLOK.map((v, n, an) => {
    let counter = 0;

    const edges = v.map((w) => {
      return rangeTo(
        ((w[0] == nodesNAME[0] || w[0] == nodesNAME[1]) ? 3 : 1) - 1,
      );
    });

    //console.log("==".repeat(10));
    //console.log(edgeTYP);
    const iTARGET = edges.map((group) => group.map(() => counter++));
    const edgeTYP = edges.flatMap(x=>x);
    return v.map((_w, m) =>
      ((n < an.length - 1 ? iTARGET[m].map((e) => e) : []).map((e) =>
        `${tab(s)}${an[n][m]} -> ${an[n + 1][e]} [${
          ((_idx, typ1,typ2)=>{
            const label: "S" | "L" | "R" | "C" = typ1==1 ? 'S' : typ2==0 ? 'L' : typ2==2 ? 'R' : 'C';

            return `label="${label}", ${dotBLOKI_styleByLabel(label)}`;
          })(e, iTARGET[m].length,edgeTYP[e])
        }]`
      )).join("\n")
    ).join("\n\n");
  }).join("\n\n\n\n").trimEnd();
}
function EDGE_IDS(ARR: string[], LABEL: "S" | "L" | "R" | "C" | "iLR+" | "iRL+",H: number[],t:string) {
  const EDGE_LR: string[] = [];
  for (let iLR = 0; iLR < ARR.length -1; iLR++) {
    EDGE_LR.push(
      `${t}${ARR[iLR]} -> ${ARR[iLR+1]} [label="${LABEL}", ${dotBLOKI_styleByLabel(LABEL)}${H[iLR] != H[iLR+1] ? ', constraint=false' :'' }]`
    );    
  }
  return EDGE_LR.join("\n");
}
function dotBLOKI_indexOfALL(
  nodeBLOK: string[][],
  s: number
) {
  const {LR,RL,H} = flatArrayOfArrayWithMirror(nodeBLOK);
  
  const eLR = EDGE_IDS(LR,"iLR+",H,tab(s));
  const eRL = EDGE_IDS(RL,"iRL+",H,tab(s));

  return [eLR, eRL].join("\n\n\n\n")
}

function dotBLOKI(
  h: number,
  graphNAME: string,
  nodesNAME: [string, string, string],
  s: number,
): string {
  const nodeBLOK = dotBLOKI_nodes(h, nodesNAME);
  const subgraphs = dotBLOKI_subgraphs(nodeBLOK, s);
  const edgesChild = dotBLOKI_children(nodeBLOK, nodesNAME, s);
  const edgesINDEX = dotBLOKI_indexOfALL(nodeBLOK, s);

  console.log("=#=".repeat(10));
  //console.log(nodeBLOK);
  console.log("=#=".repeat(10));
  //console.log(edgesChild);
  console.log("=#=".repeat(10));

  return `
digraph ${graphNAME} {
${subgraphs}

${edgesChild}







${edgesINDEX}

}
`;
}

const DIGRAPH_DOT = dotBLOKI(5, "BLOKI", ["c", "a", "b"], 3);
console.log(DIGRAPH_DOT);
