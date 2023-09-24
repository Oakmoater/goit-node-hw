import * as contactService from "./contacts.js";
import yargs from "yargs";

async function invokeAction ({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            const contacts = await contactService.listContacts();
            return console.table(contacts);

        case 'get':
            const contact = await contactService.getContactById(id);
            return console.table(contact);

        case 'add':
            const newContacts = await contactService.addContact({ name, email, phone });
            return console.table(newContacts);

        case 'remove':
            const deletedContacts = await contactService.removeContact(id);
            return console.table(deletedContacts);

        default:
        console.warn('\x1B[31m Unknown action type!');
    }
};

const { argv } = yargs(process.argv.slice(2));

invokeAction(argv);