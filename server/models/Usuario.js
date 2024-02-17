const mongoose = require ('mongoose')
const bcrypt = require ('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,"Ingrese por favor 6 caracteres o más"]
    },
    email:{
        type:String,
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    image:{
        type:String,
        required:true,
        default:'/blank_user.png'
    },
    modCode:{
        type:String,
        unique:true,
        sparse:true
    },
    friends:{
        type:Array,
        default:[]
    }
})

userSchema.pre('save',async function(next){
    console.log("entro al pre")
    if(this.skipPreSave) {
        return next()
    }
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log("salgo del pre", this.password)
    next()
})

userSchema.post('save',function(doc, next){
    console.log("USER:", doc)
    next()
})

// ACTUALIZAR EL ROL DEL USUARIO A MOD
userSchema.methods.verifyAndSetRole = async function (code) {
    if (this.modCode === code) {
        this.role = 'mod'
        await this.save()
        return true //Cambio de rol exitoso
    }else {
        return false //Codigo de confirmacion incorrecto
    }
}

const Usuario = mongoose.model('Usuario',userSchema)

module.exports = Usuario