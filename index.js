const contacts = require("./db/contacts");

const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "chose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      return console.table(listContacts);
    case "get":
      const contact = await contacts.getContactByid(id);
      return console.log(contact);
    case "remove":
      const newContact = await contacts.removeContact(id);
      return console.log(newContact);
    case "add":
      const deletedСontact = await contacts.addContact(name, email, phone);
      return console.log(deletedСontact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
