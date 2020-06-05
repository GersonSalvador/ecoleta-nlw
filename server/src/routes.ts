import express from 'express';
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/itemsController';

const routes = express.Router();
const pointsController = new PointsController;
const itemsController = new ItemsController;

routes.get('/', (request, response) => {
  return response.json({
    message: "Hello World" 
  })
})

//padrão controllers: index +> lista todos/vários, show => retorno único, create, update, delete
routes.get('/items', itemsController.index)
routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;