class OperationError extends Error {
  constructor(message) {
    super(message);
    this.name = "MeuErroPersonalizado";
  }
}

module.exports = OperationError;
