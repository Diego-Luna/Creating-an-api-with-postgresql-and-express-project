import { UserStore } from '../../models/users';

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });
  it('should have a authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('create method should add a book', async () => {
    const result = await store.create({
      firstname: "name-2",
      lastname: "last-2",
      password: "password123"
    });

    expect(result).toBeDefined();
  });

});