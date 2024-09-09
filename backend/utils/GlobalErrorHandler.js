export function GlobalErrorHandler(err, req, res, next) {
  if (process.env.ENVIORMENT === "development") {
    console.log(
      "boi this is the error handler middleware for now 😢😢😢😢😢😢😢😢😢😢😢😢😢",
      { err }
    );
    if (err.isOpertational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        isoperational: err.isOpertational,
      });
    }
    if (err.name === "ValidationError") {
      res.status(500).json({
        status: "fail",
        message: err.message,
      });
    }
    if (err?.code === 11000) {
      res.status(500).json({
        status: "fail",
        message: err.message || "this is the mongoserver error",
      });
    }
  }
}
