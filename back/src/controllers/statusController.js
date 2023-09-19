export const getServerStatus = async (req, res) => {
  try {
    res
      .status(200)
      .send({ message: "Server is running", data: { version: "1.0.0" } });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to retrieve server status" });
  }
};
