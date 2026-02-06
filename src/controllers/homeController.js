const Contato = require("../models/ContatoModel");
exports.index = async (req, res) => {
  try {
    const contatos = await Contato.buscaContatos();
    res.render("index", { contatos });
  } catch (err) {
    console.error("ERRO NA HOME:", err);
    res.status(500).send("Erro ao carregar a página");
  }
};
