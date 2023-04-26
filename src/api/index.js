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
    throw Error(err.message);
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
    throw Error(e.message);
  }
};

export const schimbaParolaPas1 = async (email) => {
  try {
    const res = await axios.get(generateURL("auth/new-pass"), {
      email: email,
    });
    return res.data;
  } catch (e) {
    throw Error(e.message);
  }
};

export const produseAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/produse"));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
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
    throw Error(e.message);
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
    throw Error(e.message);
  }
};

export const deleteProdus = async (produsId) => {
  try {
    const res = await axios.delete(generateURL(`admin/produs/${produsId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const firmeAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/firme"));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
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
    throw Error(e.message);
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
    throw Error(e.message);
  }
};
export const deleteFirma = async (firmaId) => {
  try {
    const res = await axios.delete(generateURL(`admin/firma/${firmaId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const comenziAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/comenzi"));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const comandaAdmin = async (comandaId) => {
  try {
    const res = await axios.get(generateURL(`admin/comanda/${comandaId}`));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
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
    throw Error(e.message);
  }
};

export const categoriiAdmin = async () => {
  try {
    const res = await axios.get(generateURL("admin/categorii"));
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const adaugaCategorie = async (denumire) => {
  try {
    const res = await axios.post(generateURL("admin/categorie"), {
      denumire: denumire,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
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
    throw Error(e.message);
  }
};

export const deleteCategorie = async (categorieId) => {
  try {
    const res = await axios.delete(
      generateURL(`admin/categorie/${categorieId}`)
    );
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const produseShop = async () => {
  try {
    const res = await axios.get(generateURL("shop/produse"));
    return res.data;
  } catch (e) {
    throw Error(e.message);
  }
};

export const cosCumparaturi = async (userId) => {
  try {
    const res = await axios.get(generateURL("shop/cos-cumparaturi"), {
      userId: userId,
    });
    return res.data.produseCos;
  } catch (e) {
    throw Error(e.message);
  }
};

export const adaugaInCos = async (userId, produsId) => {
  try {
    const res = await axios.post(generateURL("shop/cos-cumparaturi"), {
      userId: userId,
      prodId: produsId,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const scoateProdusCos = async (userId, produsId) => {
  try {
    const res = await axios.post(generateURL("shop/scoate-produs-cos"), {
      userId: userId,
      prodId: produsId,
    });
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};

export const stergeProdusCos = async (userId, produsId) => {
  try {
    const res = await axios.delete(
      generateURL(`shop/sterge-produs-cos-cumparaturi/${userId}/${produsId}`)
    );
    return res.data.result;
  } catch (e) {
    throw Error(e.message);
  }
};
