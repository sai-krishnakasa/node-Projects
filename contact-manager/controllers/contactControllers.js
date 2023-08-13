
const Contact = require('../models/Contacts')

module.exports.get_contacts = async (req, res) => {
    const user = req.user;
    console.log("user")
    console.log(user)
    const contacts = await Contact.find({ userId: user.id });
    res.json({ "contacts": contacts })
}

module.exports.create_contact = async (req, res) => {
    console.log(req.body);
    const { mobile, name } = req.body;
    if (!mobile || !name) {
        throw new Error("Fill Required data")
    }
    const new_contact = await Contact.create({ mobile, name, userId: req.user.id })
    res.status(201).json(new_contact);
}

module.exports.get_contact = async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await Contact.findById(id)
        if (!contact) {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        res.status(200).json(contact)
    }
    catch (err) {
        res.status(400).json(err);
    }
}

module.exports.update_contact = async (req, res) => {
    const id = req.params.id;
    const contact = await Contact.findById(id)
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({ "message": "Updated", "object": updatedContact })
}

module.exports.delete_contact = async (req, res) => {
    const id = req.params.id;
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            res.status(404);
            throw new Error("Contact Not Found");
        }
        // Delete the contact
        await Contact.deleteOne({ '_id': id });
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};
