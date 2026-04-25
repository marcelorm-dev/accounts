function expectError(fn, errorClass, expectedMessage) {
  try {
    fn();
    throw new Error("It was expected to throw an error, but it did not.");
  } catch (error) {
    if (!(error instanceof errorClass)) {
      throw new Error(
        `Expected error of type ${errorClass.name}, but got ${error.constructor.name}`,
      );
    }
    if (error.message !== expectedMessage) {
      throw new Error(
        `Expected error message "${expectedMessage}", but got "${error.message}"`,
      );
    }
  }
}

module.exports = { expectError };
