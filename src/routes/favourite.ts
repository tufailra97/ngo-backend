import { Router, Response, Request } from 'express';
import { User } from '../model';
import { Session, Validation } from '../services';

const router = Router();

router.get(
  '/get',
  new Session().verifyToken,
  async (request: Request, response: Response) => {
    // user ID
    const user_id: string = request.query.user_id;

    console.log('user ---> ', user_id);

    // get user from db
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return response.status(401).json({
        message: 'Unable to find the user'
      });
    }

    const { favourites } = user;

    response.status(200).json({
      items: favourites
    });
  }
);

router.post(
  '/add',
  new Session().verifyToken,
  async (request: Request, response: Response) => {
    let found = false;
    // user ID
    const user_id = request.body.user_id;
    // item to add
    const item = {
      item_id: parseInt(request.body.id),
      type: request.body.type,
      title: request.body.title,
      poster_path: request.body.poster_path
    };

    const { error } = new Validation().favouriteAddValidation(item);

    if (error) {
      return response.status(400).json({
        message: error.details[0].message
      });
    }

    // get user from db
    const user = await User.findOne({ _id: user_id });

    if (!user) {
      return response.status(401).json({
        message: 'Unable to find the user'
      });
    }

    // check if item already exists in the db
    for (let index = 0; index < user.favourites.length && !found; index++) {
      if (user.favourites[index].id === item.item_id) {
        found = true;
      }
    }

    if (found) {
      return response.status(400).json({
        message: 'Item already exist in the database'
      });
    }

    user!.favourites.push({
      type: 'serie',
      id: item.item_id,
      title: item.title,
      poster_path: item.poster_path
    });

    try {
      await user.save();
      response.status(200).json({
        message: 'Item added succesfully into the database'
      });
    } catch (error) {
      return response.status(500).json({
        message: 'Unexpected error'
      });
    }
  }
);

router.delete(
  '/remove',
  new Session().verifyToken,
  async (request: Request, response: Response) => {
    // user ID
    const user_id: string = request.body.user_id;
    const items_id: Array<number> = request.body.items_id;

    const { error } = new Validation().favouriteRemoveValidation({
      items_id
    });

    if (error) {
      return response.status(400).json({
        message: error.details[0].message
      });
    }

    if (!(Array.isArray(items_id) && items_id.length > 0)) {
      return response.status(400).json({
        message: 'Bad Request'
      });
    }

    try {
      const t = await User.update(
        { _id: user_id },
        {
          $pull: { favourites: { id: { $in: items_id } } }
        }
      );

      return response.json({
        message: 'Items removed successfully'
      });
    } catch (error) {
      return response.status(500).json({ message: 'Unexpected error' });
    }
  }
);

export default router;
