import { randomUUID } from 'crypto';

export type Usr = {
  id: string;
  name: string;
  surname: string;
  age: number;
  car: string;
};

interface Data {
  users: Usr[];
  addUser: (usr: Usr) => void;
  removeUser: (id: string) => boolean;
}

export const data: Data = {
  users: [
    { id: '1', name: 'Marti', surname: 'McFly', age: 18, car: 'DeLorean' },
    { id: '2', name: 'Bruce', surname: 'Wayne', age: 30, car: 'BatMobile' },
    { id: '3', name: 'Rico', surname: 'Pinguin', age: 10, car: 'remote car' }
  ],
  addUser(newUser: Usr) {
    newUser.id = randomUUID();
    this.users.push(newUser);
  },
  removeUser(id: string) {
    const usrIdx = this.users.findIndex((usr) => usr.id === id);
    if (usrIdx === -1) return false;
    this.users.splice(usrIdx, 1);
    return true;
  }
};
