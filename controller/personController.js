const Person = require('../models/Person');

const getPersons = async(req, res) => {
    try {
        const persons = await Person.find({});
        if(!persons.length)
            return res.sendStatus(204);
        res.status(200).json(persons);
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({message : err.message});
    }
}

const handleNewPerson = async(req, res) => {
    const { name, occupation, dob, birthPlace, about} = req.body;
    if(!name)
        return res.status(400).json({message : 'Cast name is required'});
    let duplicatePerson = await Person.findOne({ name }).exec();
    if(duplicatePerson)
        return res.status(409).json({ message : `The cast name ${name} already exits in database`});
    try {
        const person = await Person.create({
            name,
            image : `http://localhost/person/${req.file.originalname}`,
            occupation,
            dob : new Date(dob),
            birthPlace,
            about
        });
        res.status(201).json({ message : `person ${person.name} is successfully added to database`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message": err.message});
    }
}

const deletePerson = async(req, res) =>{
    const { name } = req.body;
    if(!name)
        return res.status(400).json({ message : 'Person name is required to delete'});
    const person = await Person.findOne({ name });
    if(!person)
        return res.sendStatus(204);
    try {
        const result = await Person.deleteOne({ name });
        if(result.acknowledged)
            return res.status(200).json({message:`Person deleted`});
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({"message":"server error"});
    }
}

const updatePerson = async(req, res) => {
    const { name, occupation, dob, birthPlace, about } = req.body;
    if(!name)
        return res.status(400).json({ message : 'Person is required to update'});
    let person = await Person.findOne({ name });
    if(!person)
        return res.sendStatus(204);
    try {
        if(occupation)
            person.occupation = occupation;
        if(dob)
            person.dob = new Date(dob);
        if(req.file.path){
            person.image = {
                data : req.file.path,
                contentType : 'image/jpg'
            }
        }
        if(birthPlace)
            person.birthPlace = birthPlace;
        if(about)
            person.about = about;
        const result = await person.save();
        res.status(200).json({ message : 'Person details successfully updated'})
    } catch (err) {
        console.log(err.stack);
        res.status(500).json({ message : err.message });
    }
}

const getSinglePerson = async(req, res) => {
    const personName = req.params.name;
    if(!personName)
        return res.status(400).json({ message : 'Name is required to access particular person'});
    const person = await Person.findOne({ name : personName });
    if(!person) return res.sendStatus(204);
    res.status(200).json(person);
}
module.exports = { handleNewPerson, getPersons, deletePerson, updatePerson, getSinglePerson };