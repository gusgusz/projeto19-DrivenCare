import userServices from "../services/userServices.js";

export async function signUp(req,res,next){
    const {name, email, password, isDoctor, specialty} = req.body;

    try{
        if(isDoctor && specialty){
            userServices.signUpDoctor({name, email, password, isDoctor, specialty})
        }
        userServices.signUp({name, email, password, isDoctor});
        return res.sendStatus(201);
    }
    catch(err){
        next(err);
    }
}

export async function signIn(req,res,next){
    const {email, password} = req.body;

    try{
        const token = userServices.signIn({email,password});

        return res.status(200).send(token);
        
    }
    catch(err){
        next(err);
    }
}