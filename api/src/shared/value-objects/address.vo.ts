export interface AddressContructorProps {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export class Address {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;

  constructor({
    cep,
    logradouro,
    complemento,
    unidade,
    bairro,
    localidade,
    uf,
    estado,
    regiao,
    ibge,
    gia,
    ddd,
    siafi,
  }: AddressContructorProps) {
    this.cep = cep;
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.unidade = unidade;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.estado = estado;
    this.regiao = regiao;
    this.ibge = ibge;
    this.gia = gia;
    this.ddd = ddd;
    this.siafi = siafi;
  }

  static crete(props: AddressContructorProps) {
    return new Address(props);
  }

  toString() {
    return {
      cep: this.cep,
      logradouro: this.logradouro,
      complemento: this.complemento,
      unidade: this.unidade,
      bairro: this.bairro,
      localidade: this.localidade,
      uf: this.uf,
      estado: this.estado,
      regiao: this.regiao,
      ibge: this.ibge,
      gia: this.gia,
      ddd: this.ddd,
      siafi: this.siafi,
    };
  }
}
