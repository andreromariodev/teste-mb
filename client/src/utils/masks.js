
export function maskCPF(value) {
  let v = value.replace(/\D/g, '').slice(0, 11)
  return v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
}

export function maskCNPJ(value) {
  let v = value.replace(/\D/g, '').slice(0, 14)
  return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
}

export function maskPhone(value) {
  let v = value.replace(/\D/g, '').slice(0, 11)

  if (v.length <= 10) {
    return v.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3')
  } else {
    return v.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3')
  }
}
