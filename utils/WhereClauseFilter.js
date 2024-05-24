const { Op } = require('sequelize');

const WhereClauseFilter = (req, filters) => {
  let whereClause = {};
  const querys = req.query;

  filters.forEach((element) => {
    if (
      querys[element.key] !== null &&
      querys[element.key] !== undefined &&
      querys[element.key] !== ''
    ) {
      whereClause[element.key] = element.value;
    }
  });

  return whereClause;
};

module.exports = WhereClauseFilter;
