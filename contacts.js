const path = require("path");
const fs = require("fs").promises;

class Contacts {
  constructor() {
    this.contactsPath = path.resolve(__dirname, "db", "contacts.json");
  }

  listContacts = async () => {
    const contactsData = await fs.readFile(this.contactsPath, {
      encoding: "utf-8",
    });
    // console.log(JSON.parse(contactsData));
    return JSON.parse(contactsData);
  };

  getContactById = async (contactId) => {
    const contactsData = await this.listContacts();
    const result = contactsData.find((contact) => contact.id === contactId);
    console.log(result);
  };

  removeContact = async (contactId) => {
    const contactsData = await this.listContacts();
    const result = contactsData.filter((contact) => contact.id !== contactId);
    fs.writeFile(this.contactsPath, JSON.stringify(result));
    console.log(result);
  };

  addContact = async (name, email, phone) => {
    const contactsData = await this.listContacts();
    const id = contactsData.length ? [...contactsData].pop().id + 1 : 1;
    const newContact = {
      id,
      name,
      email,
      phone,
    };
    contactsData.push(newContact);
    const contactsDataAsJson = JSON.stringify(contactsData);
    fs.writeFile(this.contactsPath, contactsDataAsJson);
    console.log(newContact);
  };
}

module.exports = new Contacts();
