exports.profile = async (req, res) => {
    res.json({
        usuario :req.usuario,
    })
}