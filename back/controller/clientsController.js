const pool = require('../database/index')

const clientsController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query('select * from tb_restaurante')
            res.json({ data: rows})
        } catch (err) {
            console.log(err);
            res.json({
                status: "error"
            })
        }
    },    
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query('select * from tb_restaurante where id = ?', [id])
            res.json({ data: rows})
        } catch (err) {
            console.log(err);
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const { nome, endereco, contato, categoria } = req.body
            const sql = "insert into tb_restaurante (nome, endereco, contato, categoria) values (?, ?, ?, ?)"
            const [rows, fields] = await pool.query(sql, [nome, endereco, contato, categoria])
            res.json({
                data: rows
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: "error"
            })
        }
    },
    update: async (req, res) => {
        try {
            const { nome, endereco, contato, categoria } = req.body
            const { id } = req.params
            const sql = "update tb_restaurante set nome = ?, endereco = ?, contato = ?, categoria = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [nome, endereco, contato, categoria, id])
            res.json({
                data: rows
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query('delete from tb_restaurante where id = ?', [id])
            res.json({
                data: rows
            })
        } catch (err) {
            console.log(err);
            res.json({
                status: "error"
            })
        }
    }    
}

module.exports = clientsController