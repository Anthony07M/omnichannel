export interface AddressContructorProps {
  id?: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
}

export class Address {
  id: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;

  constructor({
    id,
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    estado,
    regiao,
  }: AddressContructorProps) {
    this.id = id || '';
    this.cep = cep;
    this.logradouro = logradouro;
    this.complemento = complemento;
    this.bairro = bairro;
    this.localidade = localidade;
    this.uf = uf;
    this.estado = estado;
    this.regiao = regiao;
  }

  static create(props: AddressContructorProps) {
    return new Address(props);
  }

  toString() {
    return {
      cep: this.cep,
      logradouro: this.logradouro,
      complemento: this.complemento,
      bairro: this.bairro,
      localidade: this.localidade,
      uf: this.uf,
      estado: this.estado,
      regiao: this.regiao,
    };
  }
}
