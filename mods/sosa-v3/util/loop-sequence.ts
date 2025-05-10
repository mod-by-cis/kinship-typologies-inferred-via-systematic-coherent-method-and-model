// ./util/loop-sequence.ts

/** ➿ Pętla */
function loopSequence(range:[number,number], callback: (i: number) => void):void {
  for (let i = range[0]; i <= range[1]; i++) {
    callback(i);
  }
}

export { loopSequence };
