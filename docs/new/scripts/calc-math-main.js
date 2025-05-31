import * as f from './calc-math-functions.js';

function data_from_i(i) {
  const h = f.calc_h_from_i_or_j(i);
  const min = f.calc_min_from_h(h);
  const max = f.calc_max_from_h(h);
  const mix = f.calc_mix_from_min_and_mix(min,max);
  const j = f.calc_j_from_mix_and_i(mix,i);
  const n = f.calc_n_from_i(i);
  const v = f.calc_v_from_j(j);
  const m = f.calc_m_from_n_and_i(n,i);
  const w = f.calc_w_from_v_and_j(v,j);
  return {m,n,w,v,i,j,h,mix,min,max};
}

function data_from_j(j) {
  const h = f.calc_h_from_i_or_j(j);
  const min = f.calc_min_from_h(h);
  const max = f.calc_max_from_h(h);
  const mix = f.calc_mix_from_min_and_mix(min,max);
  const i = f.calc_i_from_mix_and_j(mix,j);
  const n = f.calc_n_from_i(i);
  const v = f.calc_v_from_j(j);
  const m = f.calc_m_from_n_and_i(n,i);
  const w = f.calc_w_from_v_and_j(v,j);
  return {m,n,w,v,i,j,h,mix,min,max};  
}

function data_from_m_and_n(m,n) {
  
}


function data_from_w_and_v(m,n) {
  
}
