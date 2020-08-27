import models from '../models/index';

export const deleteUser = () => {
  models.users.findOneAndUpdate(query, {isRemoved: true}, {upsert: true}, (err) => {
    if (err) {
      return {
        type: false
      }
    }
    return {
      type: true,
      message: 'ok'
    }
  })
}


