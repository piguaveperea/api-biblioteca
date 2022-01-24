const bcryptjs =  require('bcryptjs')

exports.encrypt =(password)=>{
    return bcryptjs.hashSync(password, 10)
}

exports.compare = (password, password_hash)=>{
    return bcryptjs.compareSync(password, password_hash)
}