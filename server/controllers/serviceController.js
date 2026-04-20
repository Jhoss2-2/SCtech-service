const { Op } = require('sequelize');
const Service = require('../models/Service');

const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    const where = search
      ? { name: { [Op.like]: `%${search}%` } }
      : {};
    const services = await Service.findAll({ where });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicios', detail: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener servicio', detail: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { name, description, price, category, available } = req.body;

    const existing = await Service.findOne({ where: { name } });
    if (existing) {
      return res.status(400).json({ error: 'Ya existe un servicio con ese nombre' });
    }

    const service = await Service.create({ name, description, price, category, available });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear servicio', detail: err.message });
  }
};

const update = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    await service.update(req.body);
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar servicio', detail: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

    await service.destroy();
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar servicio', detail: err.message });
  }
};

module.exports = { getAll, getOne, create, update, remove };