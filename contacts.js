const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

//получаем полный путь к файлу
const contactsPath = path.join(__dirname, "/db", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const contact = data.filter(({ id }) => id === contactId);
    return contact;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContactsArray = data.filter(({ id }) => id !== contactId);
    const convertToString = JSON.stringify(newContactsArray);
    await fs.writeFile(contactsPath, convertToString, "utf-8");
    return newContactsArray;
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const data = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const addNewContact = [...data, newContact];

    console.log("🚀  newContact:", newContact);
    const convertToString = JSON.stringify(addNewContact);
    await fs.writeFile(contactsPath, convertToString, "utf-8");
  } catch (error) {
    console.log("🚀  error:", error);
  }
};

listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
