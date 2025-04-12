const router = require('express').Router()
const Person = require('../models/Person')

// Rota para criar uma pessoa
router.post('/', async (req, res) => {
    const { name, salary, approved } = req.body

    if (!name) {
        res.status(422).json({ error: 'O nome é obrigatório!' })
    }

    const person = { name, salary, approved }

    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
    } catch (error) {
        res.status(500).json({ error })
    }
})


// Read - Ler pessoas
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()
        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    // extrair o dado da requisição
    const id = req.params.id

    try{
        const person = await Person.findOne({ _id: id })

        if(!person){
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }

        res.status(200).json(person)
    }catch (error){
        res.status(500).json({ error })
    }

})

// Update - Atualizar pessoa
router.patch('/:id', async (req, res) => {
    const id = req.params.id

    const person = { name, salary, approved} = req.body
    
    try {

        const updatePerson = await Person.updateOne({ _id: id }, person)
        if(updatePerson.matchedCount === 0) {
            res.status(422).json({ message: 'Usuário não encontrado!' })
            return
        }
         
        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error })
    }
})

// Delete - Deletar pessoa
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id:id})

    if(!person) {
        res.status(422).json({message: 'Usuário não encontrado!'})
        return
    }
    try{
        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'Usuário removido com sucesso!' })

    }catch (error){
        res.status(500).json({error})
    }
})

module.exports = router