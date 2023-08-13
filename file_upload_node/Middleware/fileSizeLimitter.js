const MB=5;
const FILE_SIZE_LIMIT=MB*1024*1024;

const fileSizeLimiter=(req,res,next)=>{
    const files=req.files
    const filesOverLimit=[]
    // to find which files are over the limit
    Object.keys(files).forEach(key=>{
        if(files['key'].size > FILE_SIZE_LIMIT){
            filesOverLimit.push(files[key].name);
        }
    })
    
    if(filesOverLimit.length){
        const properVerb= filesOverLimit.length>1?'are':'is';
        const sentence=`Upload Failed!..${filesOverLimit.toString()} 
        ${properVerb} over the files size Limit of ${MB} MB.`.replaceAll(',',', ');

        const message = filesOverLimit.length < 3 
        ? sentence.replace(","," and ")
        : sentence.replace(/ ,(?=[^,]*$)/, " and ");

        return res.status(413).json({status:"error",message});
    }

    next();
}
