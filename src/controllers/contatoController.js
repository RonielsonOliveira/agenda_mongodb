const Contato = require('../models/ContatoModel')
exports.index = (req,res) =>{
    res.render('contato', {
        contato: {}
    });
}

exports.register =  async (req,res) =>{
    try{
    const contato = new Contato(req.body)
    await  contato.register();
    if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(function() { 
            return res.redirect('index')
        });
        return;
    }
    req.flash('success', 'Contato registrado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
    return;
    }catch(e) {
        console.log(e);
        return res.render('403');
    }
   
}
exports.editIndex = async function(req, res){
    if(!req.params.id) return res.render('403');
    const contato = await Contato.buscaPorId(req.params.id);
    if(!contato) return res.render('403');
    res.render('contato',{ contato });
}
exports.edit = async function (req, res) {
    try {
    if(!req.params.id) return res.render('403');
      const contato = new Contato(req.body);
      await contato.edit(req.params.id);
      if(contato.errors.length > 0){
        req.flash('errors', contato.errors);
        req.session.save(function() { 
            return req.session.save(() => res.redirect(`/contato/index/${req.params.id}`));
        });
        return;
    }
    req.flash('success', 'Contato editado com sucesso');
    req.session.save(() => res.redirect(`/contato/index/${contato.contato.id}`));
    return;  

    } catch(e) {
        console.log(e);
        res.render('403');
        }
          
    
}
exports.delete = async function (req, res) {
    if(!req.params.id) return res.render('403');
    const contato = await Contato.delete(req.params.id);
    if(!contato) return res.render('403');
    
    req.flash('success', 'Contato deletado com sucesso');
    req.session.save(() => res.redirect('/'));
    return;  

}