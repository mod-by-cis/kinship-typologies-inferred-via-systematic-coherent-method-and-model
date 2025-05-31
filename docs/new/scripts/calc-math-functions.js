


export function MathValuationAdic2(x) {
  if (!Number.isInteger(x) || x <= 0) {
    // wartość niepoprawna;  poprawna wartość dla x: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  // x & -x to 2^k, więc log2 tego da dokładnie k
  return Math.log2(x & -x);
}

export function MathValuationAdic2_(x) {
  if (!Number.isInteger(x) || x <= 0) {
    // wartość niepoprawna;  poprawna wartość dla x: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  let r = 0;
  let t = true;
  const e = Array.from(x.toString(2));
  let l = e.length;
  while (l > 0 && t) {
    if (e[l - 1] == "0") {
      r++;
    } else {
      t = false;
    }
    l--;
  }
  return r;
}

//--------------------------------------------------------
export function calc_h_from_i_or_j(i_or_j) {
  if (!Number.isInteger(i_or_j) || i_or_j <= 0) {
    // wartość niepoprawna; poprawna wartość dla i_or_j: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return Math.floor(Math.log2(i_or_j));
}

export function calc_min_from_h(h) {
  if (!Number.isInteger(h) || h < 0) {
    // wartość niepoprawna; poprawna wartość dla h: 0,1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return Math.pow(2,h);
}

export function calc_max_from_h(h) {
  if (!Number.isInteger(h) || h < 0) {
    // wartość niepoprawna; poprawna wartość dla h: 0,1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return Math.pow(2,(h+1))-1;
}

export function calc_mix_from_min_and_mix(min,max) {
  if ((!Number.isInteger(min) || min <= 0) || (!Number.isInteger(max) || max <= 0)) {
    // wartość niepoprawna; poprawna wartość dla min: 1,2,3,4,...; poprawna wartość dla max: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return min+max;
}

export function calc_i_from_mix_and_j(mix,j) {
  if ((!Number.isInteger(mix) || mix <= 1) || (!Number.isInteger(j) || j <= 0)) {
    // wartość niepoprawna; poprawna wartość dla mix: 2,3,4,...; poprawna wartość dla j: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return mix - j;
}

export function calc_j_from_mix_and_i(mix,i) {
  if ((!Number.isInteger(mix) || mix <= 1) || (!Number.isInteger(i) || i <= 0)) {
    // wartość niepoprawna; poprawna wartość dla mix: 2,3,4,...; poprawna wartość dla i: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return mix - i;
}

export function calc_mix_from_i_and_j(i_or_j,j_or_i) {
  if ((!Number.isInteger(j_or_i) || j_or_i <= 0) || (!Number.isInteger(i_or_j) || i_or_j <= 0)) {
    // wartość niepoprawna; poprawna wartość dla i_or_j: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return i_or_j+j_or_i;
}

export function calc_n_from_i(i) {
  if (!Number.isInteger(i) || i <= 0){
    // wartość niepoprawna; poprawna wartość dla i: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return MathValuationAdic2(i);
}
export function calc_v_from_j(j) {
  if (!Number.isInteger(j) || j <= 0){
    // wartość niepoprawna; poprawna wartość dla i: 1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return MathValuationAdic2(j);
}

export function calc_m_from_n_and_i(n,i) {
  if ((!Number.isInteger(i) || i <= 0) || (!Number.isInteger(n) || n < 0)){
    // wartość niepoprawna; poprawna wartość dla i: 1,2,3,4,...; poprawna wartość dla n: 0,1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return (i/(Math.pow(2,n)))+1;
}

export function calc_w_from_v_and_j(v,j) {
  if ((!Number.isInteger(j) || j <= 0) || (!Number.isInteger(v) || v < 0)){
    // wartość niepoprawna; poprawna wartość dla j: 1,2,3,4,...; poprawna wartość dla v: 0,1,2,3,4,...;
    // throw new Error("");
    return;
  }
  return (j/(Math.pow(2,v)))+2;
}
