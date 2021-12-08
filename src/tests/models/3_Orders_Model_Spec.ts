import { OrdersStore } from '../../models/orders';

const store = new OrdersStore()

describe("Orders Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('should have an index method -> /orders/products/', () => {
    expect(store.indexsProducts).toBeDefined();
  });

  it('should have a show method -> /orders/products/ ', () => {
    expect(store.showProduct).toBeDefined();
  });

  it('create method should add a Orders -> /orders/', async () => {
    const result = await store.create({ user_id: 1, status_order: false });

    console.log("-> result 1 orders");
    console.log(result);



    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status_order: false
    });
  });

  it('index method should return a list of Orders', async () => {
    const result = await store.index();

    console.log("-> result 2 orders");
    console.log(result);

    expect(result).toEqual([
      {
        id: 1,
        user_id: 1,
        status_order: false
      }
    ]);
  });

  it('show method should return the correct Orders', async () => {
    const result = await store.show("1");

    console.log("-> result 3 orders");
    console.log(result);

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status_order: false
    });
  });

});