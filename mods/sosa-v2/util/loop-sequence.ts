// ./util/loop-sequence.ts

/** ➿ Pętla */
function loopSequence(range:[number,number] | [number], callback: (i: number) => void):void {
  range =  range.length == 1 ? [range[0], range[0]] : range as [number,number];
  for (let i = range[0]; i <= range[1]; i++) {
    callback(i);
  }
}

export { loopSequence };
