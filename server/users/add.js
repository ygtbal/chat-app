import models from '../models/index';


export const addUser = (socketId, name, room) => {
  const body = {socketId, name, room};
  return models.users.create(body);
}



