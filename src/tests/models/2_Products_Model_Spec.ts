import { ProductsStore } from '../../models/products';

const store = new ProductsStore()

describe("Products Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create({
      name: "Books 1",
      price: 250
    });

    expect(result).toEqual({ id: 1, name: 'Books 1', price: 250 });
  });

  it('index method should return a list of books', async () => {
    const result = await store.index();

    expect(result).toEqual([{ id: 1, name: 'Books 1', price: 250 }]);
  });

  it('show method should return the correct book', async () => {
    const result = await store.show("1");

    expect(result).toEqual({ id: 1, name: 'Books 1', price: 250 });
  });

});