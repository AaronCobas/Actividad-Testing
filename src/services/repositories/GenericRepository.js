export default class GenericRepositoy {
    constructor(dao,model){
        this.dao = dao;
        this.model = model;
    }

    getAll = params => this.dao.get(params,this.model);
    getBy = params => this.dao.getBy(params,this.model)
    save = doc => this.dao.save(doc,this.model);
    update = (opt,doc) => this.dao.update(opt,doc,this.model)
}