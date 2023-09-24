import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export async function getContactById(id) {
    const allContacts = await listContacts();
    const result = allContacts.find(item => item.id === id);
    return result || null;
}

export async function removeContact(id) {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null
    }
    const [result] = allContacts.splice(index, 1);
    await updateContacts(allContacts);
    return result;
}

export async function addContact({ name, email, phone }) {
    const allContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    allContacts.push(newContact);
    await updateContacts(allContacts);
    return newContact;
}