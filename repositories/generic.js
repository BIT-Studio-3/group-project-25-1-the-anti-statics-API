import prisma from "../prisma/client.js";

class Repository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return await prisma[this.model].create({ data });
  }

  async findAll() {
    return await prisma[this.model].findMany();
  }

  async findById(id) {
    return await prisma[this.model].findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma[this.model].update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma[this.model].delete({
      where: { id },
    });
  }
}

export default Repository;
