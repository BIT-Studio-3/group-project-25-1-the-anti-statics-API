import prisma from "../prisma/client.js";

class AlertRepository {
  async create(data) {
    return await prisma.alert.create({ data });
  }

  async findAll() {
    return await prisma.alert.findMany();
  }

  async findById(id) {
    return await prisma.alert.findUnique({
      where: { id },
    });
  }

  async update(id, data) {
    return await prisma.alert.update({
      where: { id },
      data,
    });
  }

  async delete(id) {
    return await prisma.alert.delete({
      where: { id },
    });
  }
}

export default new AlertRepository();
