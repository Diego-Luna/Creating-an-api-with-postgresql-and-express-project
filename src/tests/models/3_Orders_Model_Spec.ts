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

  it('create method should add a book', async () => {
    const result = await store.addProduct(
      [1],
      '1',
      [1],
      false
    );

    expect(result).toEqual({
      id: 1,
      id_product: [1],
      user_id: '1',
      quantity: [1],
      status_order: false
    });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();

    expect(result).toEqual([
      {
        id: 1,
        id_product: [1],
        user_id: '1',
        quantity: [1],
        status_order: false
      }
    ]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show("1");

    expect(result).toEqual({
      id: 1,
      id_product: [1],
      user_id: '1',
      quantity: [1],
      status_order: false
    });
  });

});