import Company from "./model";

function makeQueryObject(query) {
    let result = {};
    if (query.maxpages && query.minpages) {
        result.pages = {
            $and: [{
                $lte: parseInt(query.maxpages)
            }, {
                $gte: parseInt(query.minpages)
            }]
        };
    }
    if (query.author) {
        result.authors = {
            $elemMatch: {
                $eq: query.author
            }
        }
    }
    if (query.maxprice) {
        result.price = {
            $lte: parseFloat(query.maxprice)
        }
    }
    return result;
};

const companyController = {
 
    get: async (req, res) =>{
        try {
            const companies = await Company.find(makeQueryObject(req.query));
            setTimeout( ()=> res.send(companies), 2000);
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    getById: async (req, res) =>{
        try {
            const comp = await Company.findById(req.params.id);
            if (comp) 
                res.send(comp);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    post: async (req, res) =>{
        try {
            const newComp = new Company(req.body);
            const comp = await newComp.save();            
            res.send(comp);             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    delete: async (req, res) =>{
        try {
            const comp = await Company.findByIdAndDelete(req.params.id);
            if (comp) 
                res.send(comp);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    patch: async (req, res) =>{
        try {
            const comp = await Company.findOneAndUpdate(req.params.id, req.body, {
                returnOriginal: false
            } );
            if (comp) 
                res.send(comp);
            else
                res.status(404).send("Not Found");             
        }
        catch (error){
            console.error(error);
            res.status(500).send(error);
        }
    },
    put: async (req,res)=>{
        try{
            let arr = req.body;
            if (arr && arr.length)
            {
                const comps = await Company.insertMany(arr);
                res.send(comps);
            }
        } catch (e){
            res.status(500).send(e);
        }
    }
}


export default companyController;