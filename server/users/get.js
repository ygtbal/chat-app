import models from '../models/index';

export const get = (id) => {
    return models.users.findOne({socketId: id});
}


  export const getUserWithRoom = () => {
    return models.users.findOne({room: req.params.str});
  }

