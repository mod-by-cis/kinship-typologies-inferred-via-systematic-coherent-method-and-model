/** Tryb liczenia porządków (inkrement od min lub dekrement od max) */
enum ModeOrdering {
  IncrementMin = "IncrementMin",
  DecrementMax = "DecrementMax",
}

/** Tryb liczenia extremów */
enum ModeExtremum {
  Min = "MIN",
  Max = "MAX",
}

enum ModeIndex {
  firstIs_0 = 1,
  firstIs_1 = 0,
}



export {
  ModeOrdering,
  ModeExtremum,
  ModeIndex
};
