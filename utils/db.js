import fs from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'database.json');

export const getUsers = () => {
    if (!fs.existsSync(dbFilePath)) {
        fs.writeFileSync(dbFilePath, JSON.stringify([]));
    }
    const fileData = fs.readFileSync(dbFilePath);
    return JSON.parse(fileData);
};

export const addUser = (user) => {
    const users = getUsers();
    users.push(user);
    fs.writeFileSync(dbFilePath, JSON.stringify(users));
};

export const userExists = (email) => {
    const users = getUsers();
    return users.some(user => user.email === email);
};

export const getUserByEmail = (email) => {
    const users = getUsers();
    return users.find(user => user.email === email);
};
