const db = require('../config/mysql');

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    const [result] = await db.execute(
      'INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)',
      [name, price, category || null, inStock ?? true]
    );

    const [rows] = await db.execute(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      status: 'success',
      data: rows[0]
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products');

    res.status(200).json({
      status: 'success',
      results: rows.length,
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getOneProduct = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    const [result] = await db.execute(
      'UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?',
      [name, price, category || null, inStock, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    const [rows] = await db.execute(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    res.status(200).json({
      status: 'success',
      data: rows[0]
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM products WHERE id = ?',
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};