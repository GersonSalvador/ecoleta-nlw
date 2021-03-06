import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {

  async index(request: Request,response: Response){
    const {city, uf, items} = request.query;

    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items','points.id', '=', 'point_items.point_id')
      .whereIn('point_items.items_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*')
      //.toSQL().toNative()

    return (!!points) 
      ? response.json(points)
      : response.status(400).json({message: 'Point not found.'})
  }

  async show(request: Request,response: Response){
    const {id} = request.params;

    const point = await knex('points').where('id', id).first();

    const items = await knex('items')
      .join('point_items','items.id', '=', 'point_items.items_id')
      .where('point_items.point_id', id)
      .select('items.title')
      //.toSQL().toNative()

    return (!!point) 
      ? response.json({point, items})
      : response.status(400).json({message: 'Point not found.'})
    
  }

  async create(request: Request,response: Response) {

    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;
  
    //transaction desfaz todas as inserções se alguma der erro
    const trx = await knex.transaction();
    const point = {
      image: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    };
  
    const insertedIds = await trx('points').insert(point)
    const point_id = insertedIds[0];
  
    const pointItems = items.map((items_id: number) => {
      return {
        items_id,
        point_id: point_id
      }
    })
  
    await trx('point_items').insert(pointItems);
    await trx.commit();
    return response.json({
      id: point_id,
      ...point,
      isertedItems: pointItems
    });
  
  }
}

export default PointsController;