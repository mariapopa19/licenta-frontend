import axios from "axios";

const generateURL = (path, queryVars) => {
  let fullEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/${path}`;
  if (queryVars) {
    queryVars.forEach((elem, index) => {
      fullEndpoint += `${index === 0 ? "?" : "&"}${elem.name}=${elem.value}`;
    });
  }
  return fullEndpoint;
};

export const creareUtilizator = async (email, parola, nume) => {
  try {
    const res = await axios.put(generateURL("auth/signup"), {
      email: email,
      parola: parola,
      nume: nume,
    });
    return res.data;
  } catch (err) {
    throw Error(err.response.data.message);
  }
};

export const login = async (email, parola) => {
  try {
    const res = await axios.post(generateURL("auth/login"), {
      email: email,
      parola: parola,
    });
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const schimbaParolaPas1 = async (email) => {
  try {
    const res = await axios.get(generateURL(`auth/new-pass/${email}`));
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const schimbaParolaPas2 = async (token, parola) => {
  try {
    const res = await axios.post(generateURL(`auth/new-pass/${token}`), {
      parola: parola,
    });
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
}

export const produseAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/produse"));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const adaugaProdus = async (
  denumire,
  pret,
  categorie,
  descriere,
  imageURL,
  firma
) => {
  try {
    const res = await axios.post(generateURL("admin/produs"), {
      denumire: denumire,
      pret: pret,
      categorie: categorie,
      descriere: descriere,
      imageURL: imageURL,
      denumireFirma: firma,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const modificaProdus = async (
  id,
  denumire,
  pret,
  descriere,
  imageURL
) => {
  try {
    const res = axios.patch(generateURL(`admin/produs/${id}`), {
      denumire: denumire,
      pret: pret,
      descriere: descriere,
      imageURL: imageURL,
    });
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const deleteProdus = async (produsId) => {
  try {
    const res = await axios.delete(generateURL(`admin/produs/${produsId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const firmeAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/firme"));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const adaugaFirma = async (denumire, data_inceput, data_finalizare) => {
  try {
    const res = await axios.post(generateURL("admin/firma"), {
      denumire: denumire,
      data_inceput: data_inceput,
      data_finalizare: data_finalizare,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const modificaFirma = async (firmaId, denumire, data_finalizare) => {
  try {
    const res = await axios.patch(generateURL(`admin/firma/${firmaId}`), {
      denumire: denumire,
      data_finalizare: data_finalizare,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};
export const deleteFirma = async (firmaId) => {
  try {
    const res = await axios.delete(generateURL(`admin/firma/${firmaId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const comenziAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/comenzi"));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const comandaAdmin = async (comandaId) => {
  try {
    const res = await axios.get(generateURL(`admin/comanda/${comandaId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const modificaComandaAdmin = async (
  comandaId,
  status,
  adresa,
  zi,
  interval
) => {
  try {
    const res = await axios.patch(generateURL(`admin/comanda/${comandaId}`), {
      status: status,
      adresa: adresa,
      ziLivrare: zi,
      interval: interval,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const categoriiAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/categorii"));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const adaugaCategorie = async (denumire) => {
  try {
    const res = await axios.post(generateURL("admin/categorie"), {
      denumire: denumire,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const modificaCategorie = async (categorieId, denumire) => {
  try {
    const res = await axios.patch(
      generateURL(`admin/categorie/${categorieId}`),
      {
        denumire: denumire,
      }
    );
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const deleteCategorie = async (categorieId) => {
  try {
    const res = await axios.delete(
      generateURL(`admin/categorie/${categorieId}`)
    );
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const produseShop = async () => {
  try {
    const res = await axios.get(generateURL("shop/produse"));
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const produsShop = async (produsId) => {
  try {
    const res = await axios.get(generateURL(`shop/produse/${produsId}`));
    return res.data.produs;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};


// * Cos de cumparaturi
export const cosCumparaturi = async (token) => {
  try {
    console.log(token);
    const res = await axios.get(generateURL(`shop/cos-cumparaturi/${token}`));
    return res.data.produseCos;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const adaugaInCos = async (token, produsId) => {
  try {
    const res = await axios.post(generateURL("shop/cos-cumparaturi"), {
      token: token,
      prodId: produsId,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const scoateProdusCos = async (token, produsId) => {
  try {
    const res = await axios.post(generateURL("shop/scoate-produs-cos"), {
      token: token,
      prodId: produsId,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const stergeProdusCos = async (token, produsId) => {
  try {
    const res = await axios.delete(
      generateURL(`shop/sterge-produs-cos-cumparaturi/${token}/${produsId}`)
    );
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

// ! plata cu cardul 
export const cardPayment = async (token, adresa, oras, judet, ziLivrare, oraLivrare) => {
  try{
    const res = await axios.post(generateURL('shop/create-checkout-session'), {
      token: token,
      adresa: adresa,
      oras: oras,
      judet: judet,
      ziLivrare: ziLivrare,
      oraLivrare: oraLivrare
    })
    return res.data;
  }catch (e) {
    throw Error(e.response.data.message);
  }
}


// * Pagina cu detaliile personale 
export const comenziShop = async (token) => {
  try {
    const res = await axios.get(generateURL(`shop/comenzi/${token}`));
    return res.data.comenzi;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const comandaShop = async (token, comandaId) => {
  try {
    const res = await axios.get(
      generateURL(`shop/comenzi/${token}/${comandaId}`)
    );
    return res.data.comanda;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const detaliiUtilizator = async (token) => {
  try {
    const res = await axios.get(generateURL(`auth/user/${token}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const modificaDetaliiUtilizaor = async (token, nume, email) => {
  try {
    const res = await axios.patch(generateURL(`auth/user/${token}`), {
      nume: nume,
      email: email,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const comenziShip = async (token, oras) => {
  try {
    const res = await axios.get(generateURL(`ship/comenzi/${token}/${oras}`));
    return res.data.comenzi;
  } catch (e) {
    throw Error(e.response.data.message);
  }
};

export const comandaShip = async(token, comandaId) => {
  try {
    const res = await axios.get(generateURL(`ship/comanda/${token}/${comandaId}`));
    return res.data.comanda;
  } catch (e) {
    throw Error(e.response.data.message);
  }
}

export const preiaComanda = async (token, comandaId) => {
  try {
    const res = await axios.post(generateURL('ship/comanda'), {
      token: token,
      comandaId: comandaId
    });
    return res.data.comanda;
  } catch (e) {
    throw Error(e.response.data.message);
  }
}

export const comandaFinalizataShipper = async (token, comandaId) => {
  try {
    const res = await axios.post(generateURL('ship/comanda-finalizata'), {
      token: token,
      comandaId: comandaId
    });
    return res.data.comanda;
  } catch (e) {
    throw Error(e.response.data.message);
  }
}

export const judeteRomania = async () => {
  try {
    const res = await axios.get('https://roloca.coldfuse.io/judete');
    return res.data;
  } catch (e) {
    throw Error(e.response.data.message);
  }
}
