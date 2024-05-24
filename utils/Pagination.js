const catchAsync = require('./catchAsync');

class Pagination {
  page = 1;
  pageSize = 10;
  offset() {
    return (this.page - 1) * this.pageSize;
  }
  totalPages(count) {
    return Math.ceil(count / this.pageSize);
  }

  constructor(page, pageSize) {
    this.page = page;
    this.pageSize = pageSize;
  }
}

getPaginatedResults = async (req, model, whereClause, Options) => {
  try {
    const PaginationInstance = new Pagination(
      parseInt(req.query.pageIndex) || 1,
      parseInt(req.query.pageSize) || 10
    );

    const count = await model.count({ where: whereClause });
    const List = await model.findAll({
      order: [['updatedAt', 'DESC']],
      offset: PaginationInstance.offset(),
      limit: PaginationInstance.pageSize,
      where: whereClause,
      ...Options,
    });

    const pagination = {
      ...PaginationInstance,
      totalPages: PaginationInstance.totalPages(count),
      totalCount: count,
    };
    return { List, pagination };
  } catch (error) {
    throw error;
  }
};

module.exports = { Pagination, getPaginatedResults };
// module.exports = Pagination;
